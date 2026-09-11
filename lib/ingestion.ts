import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { AskTitoMetadata, AskTitoSourceType, IngestionSummary } from "../types/ask-tito";
import { chunkMarkdown } from "./chunking";
import { getSupabaseAdmin } from "./supabase-admin";
import { EMBEDDING_MODEL, generateEmbeddings } from "./embeddings";

interface IngestionRecord {
  readonly id: string;
  readonly document: string;
  readonly metadata: AskTitoMetadata;
  readonly sourcePath: string;
}

async function findMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return findMarkdownFiles(target);
    return entry.isFile() && entry.name.endsWith(".md") ? [target] : [];
  }));
  return nested.flat().sort();
}

function titleFrom(markdown: string, fallback: string): string {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

function sourceFor(relativePath: string): { source: AskTitoSourceType; category: string } {
  if (relativePath.startsWith("projects/")) return { source: "Case Study", category: "Project" };
  if (relativePath === "resume.md") return { source: "Resume", category: "Experience" };
  if (relativePath === "linkedin.md") return { source: "LinkedIn", category: "Career" };
  return { source: "Bio", category: "Profile" };
}

function recordId(relativePath: string, index: number, content: string, metadata: AskTitoMetadata): string {
  return createHash("sha256")
    .update(`${relativePath}\0${index}\0${content}\0${JSON.stringify(metadata)}`)
    .digest("hex");
}

export async function loadIngestionRecords(
  dataDirectory = path.join(process.cwd(), "data"),
): Promise<IngestionRecord[]> {
  const files = await findMarkdownFiles(dataDirectory);

  const records = await Promise.all(
    files.map(async (file) => {
      const markdown = await readFile(file, "utf8");
      const relativePath = path
        .relative(dataDirectory, file)
        .split(path.sep)
        .join("/");

      const title = titleFrom(markdown, path.basename(file, ".md"));
      const classification = sourceFor(relativePath);

      return chunkMarkdown(markdown).map((chunk) => {
        const metadata: AskTitoMetadata = {
          ...classification,
          title,
          chunkIndex: chunk.index,
        };

        return {
          id: recordId(relativePath, chunk.index, chunk.content, metadata),
          document: chunk.content,
          metadata,
          sourcePath: relativePath,
        };
      });
    }),
  );

  return records.flat();
}

async function removeStaleChunks(
  records: readonly IngestionRecord[],
): Promise<number> {
  const supabase = getSupabaseAdmin();
  const idsByPath = new Map<string, Set<string>>();

  for (const record of records) {
    const ids = idsByPath.get(record.sourcePath) ?? new Set<string>();
    ids.add(record.id);
    idsByPath.set(record.sourcePath, ids);
  }

  let removed = 0;
  const pageSize = 100;

  for (const [sourcePath, currentIds] of idsByPath) {
    const staleIds: string[] = [];

    // Primero lee todas las páginas; después elimina.
    for (let offset = 0; ; offset += pageSize) {
      const { data, error } = await supabase
        .from("documents")
        .select("chunk_id")
        .eq("source_path", sourcePath)
        .eq("embedding_model", EMBEDDING_MODEL)
        .not("chunk_id", "is", null)
        .order("chunk_id", { ascending: true })
        .range(offset, offset + pageSize - 1);

      if (error) {
        throw new Error(
          `Error revisando chunks de ${sourcePath}: ${error.message}`,
        );
      }

      const rows = data ?? [];

      for (const row of rows) {
        if (
          typeof row.chunk_id !== "string" ||
          row.chunk_id.length === 0
        ) {
          throw new Error(`chunk_id inválido en ${sourcePath}`);
        }

        if (!currentIds.has(row.chunk_id)) {
          staleIds.push(row.chunk_id);
        }
      }

      if (rows.length < pageSize) break;
    }

    for (let offset = 0; offset < staleIds.length; offset += pageSize) {
      const batch = staleIds.slice(offset, offset + pageSize);

      const { data, error } = await supabase
        .from("documents")
        .delete()
        .eq("source_path", sourcePath)
        .eq("embedding_model", EMBEDDING_MODEL)
        .in("chunk_id", batch)
        .select("chunk_id");

      if (error) {
        throw new Error(
          `Error eliminando chunks de ${sourcePath}: ${error.message}`,
        );
      }

      removed += data?.length ?? 0;
    }
  }

  return removed;
}

export async function ingestKnowledgeBase(): Promise<IngestionSummary> {
  const records = await loadIngestionRecords();

  if (records.length === 0) {
    throw new Error("No se encontraron chunks Markdown en /data.");
  }

  const supabase = getSupabaseAdmin();
  const batchSize = 16;
  let embedded = 0;
  let reused = 0;

  for (let offset = 0; offset < records.length; offset += batchSize) {
    const batch = records.slice(offset, offset + batchSize);

    const { data: existing, error: readError } = await supabase
      .from("documents")
      .select("chunk_id")
      .in("chunk_id", batch.map((record) => record.id))
      .eq("embedding_model", EMBEDDING_MODEL)
      .not("embedding", "is", null);

    if (readError) {
      throw new Error(`Error leyendo documentos: ${readError.message}`);
    }

    const existingIds = new Set(
      (existing ?? []).map((row) => row.chunk_id),
    );

    const missing = batch.filter(
      (record) => !existingIds.has(record.id),
    );

    reused += batch.length - missing.length;

    if (missing.length === 0) continue;

    const embeddings = await generateEmbeddings(
      missing.map((record) => record.document),
    );

    const rows = missing.map((record, index) => {
      const embedding = embeddings[index];

      if (
        !embedding ||
        embedding.length !== 768 ||
        !embedding.every(Number.isFinite)
      ) {
        throw new Error(`Embedding inválido: ${record.sourcePath}`);
      }

      return {
        chunk_id: record.id,
        content: record.document,
        source: record.metadata.source,
        title: record.metadata.title,
        source_path: record.sourcePath,
        category: record.metadata.category,
        chunk_index: record.metadata.chunkIndex,
        embedding_model: EMBEDDING_MODEL,
        embedding,
      };
    });

    const { error: writeError } = await supabase
      .from("documents")
      .upsert(rows, { onConflict: "chunk_id" });

    if (writeError) {
      throw new Error(`Error guardando documentos: ${writeError.message}`);
    }

    embedded += rows.length;
  }

  const removed = await removeStaleChunks(records);

  return {
    files: new Set(records.map((record) => record.sourcePath)).size,
    chunks: records.length,
    embedded,
    reused,
    removed,
    collection: "documents",
  };
}
