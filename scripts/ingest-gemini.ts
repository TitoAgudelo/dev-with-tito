
import { loadEnvConfig } from "@next/env";
import { loadIngestionRecords } from "../lib/ingestion";
import {
  GEMINI_EMBEDDING_MODEL,
  generateGeminiEmbedding,
} from "../lib/gemini-embeddings";
import { getSupabaseAdmin } from "../lib/supabase-admin";

loadEnvConfig(process.cwd());

const MAX_RETRIES = 6;
const BASE_DELAY_MS = 2_000;
const MAX_DELAY_MS = 120_000;
const REQUEST_DELAY_MS = 750;
const PAGE_SIZE = 100;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isRetryableError(error: unknown): boolean {
  const message = getErrorMessage(error);

  return (
    /\b429\b/.test(message) ||
    /RESOURCE_EXHAUSTED/i.test(message) ||
    /RATE_LIMIT_EXCEEDED/i.test(message) ||
    /\b5\d\d\b/.test(message) ||
    /temporarily unavailable/i.test(message) ||
    /fetch failed/i.test(message) ||
    /ECONNRESET|ETIMEDOUT|EAI_AGAIN/i.test(message)
  );
}

function getRetryDelayMs(error: unknown, retryNumber: number): number {
  const message = getErrorMessage(error);

  // Supports Google's "Please retry in 38s" message.
  const retryInMatch = message.match(/retry in\s+([\d.]+)\s*s/i);

  // Supports Google's JSON RetryInfo, e.g. "retryDelay":"38s".
  const retryDelayMatch = message.match(/"retryDelay"\s*:\s*"([\d.]+)s"/i);

  const retrySeconds = retryInMatch?.[1] ?? retryDelayMatch?.[1];

  const googleDelay = retrySeconds
    ? Math.ceil(Number(retrySeconds) * 1_000)
    : 0;

  const exponentialDelay = Math.min(
    BASE_DELAY_MS * 2 ** (retryNumber - 1),
    MAX_DELAY_MS,
  );

  // Honor Google's suggested delay, with a small safety margin.
  return Math.min(
    Math.max(googleDelay + 1_000, exponentialDelay),
    MAX_DELAY_MS,
  );
}

async function generateEmbeddingWithRetry(
  document: string,
  sourcePath: string,
): Promise<number[]> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await generateGeminiEmbedding(document);
    } catch (error: unknown) {
      if (!isRetryableError(error) || attempt >= MAX_RETRIES) {
        throw error;
      }

      const retryNumber = attempt + 1;
      const delay = getRetryDelayMs(error, retryNumber);

      process.stdout.write(
        `\nGemini temporalmente no disponible para ${sourcePath}. ` +
        `Reintento ${retryNumber}/${MAX_RETRIES} en ${Math.ceil(
          delay / 1_000,
        )} segundos.\n`,
      );

      await sleep(delay);
    }
  }
}

async function main(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const records = await loadIngestionRecords();

  if (records.length === 0) {
    throw new Error("No se encontraron documentos Markdown en /data.");
  }

  const idsByPath = new Map<string, Set<string>>();

  for (const record of records) {
    const ids = idsByPath.get(record.sourcePath) ?? new Set<string>();
    ids.add(record.id);
    idsByPath.set(record.sourcePath, ids);
  }

  let embedded = 0;
  let reused = 0;

  // Generate or reuse every embedding before performing any cleanup.
  for (let index = 0; index < records.length; index++) {
    const record = records[index];

    const { data: existing, error: readError } = await supabase
      .from("documents")
      .select("chunk_id, embedding_gemini")
      .eq("chunk_id", record.id)
      .maybeSingle();

    if (readError) {
      throw new Error(
        `Error leyendo ${record.sourcePath}: ${readError.message}`,
      );
    }

    if (existing?.embedding_gemini != null) {
      reused++;
      process.stdout.write(
        `\rChunks: ${index + 1}/${records.length}; ` +
        `embeddings nuevos: ${embedded}; reutilizados: ${reused}`,
      );
      continue;
    }

    const embedding = await generateEmbeddingWithRetry(
      record.document,
      record.sourcePath,
    );

    const payload = {
      content: record.document,
      source: record.metadata.source,
      title: record.metadata.title,
      source_path: record.sourcePath,
      category: record.metadata.category,
      chunk_index: record.metadata.chunkIndex,
      embedding_model: GEMINI_EMBEDDING_MODEL,
      embedding_gemini: embedding,
    };

    // Update existing rows without overwriting their original embedding.
    // Insert only when this chunk does not yet exist.
    const { error: writeError } = existing
      ? await supabase
        .from("documents")
        .update(payload)
        .eq("chunk_id", record.id)
      : await supabase.from("documents").insert({
        ...payload,
        chunk_id: record.id,
      });

    if (writeError) {
      throw new Error(
        `Error guardando ${record.sourcePath}: ${writeError.message}`,
      );
    }

    embedded++;

    process.stdout.write(
      `\rChunks: ${index + 1}/${records.length}; ` +
      `embeddings nuevos: ${embedded}; reutilizados: ${reused}`,
    );

    // Stay below the free-tier request-per-minute limit when possible.
    if (index < records.length - 1) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  process.stdout.write("\nTodos los embeddings están guardados.\n");

  // Cleanup happens only after every current embedding has been saved.
  // Only remove stale rows explicitly tagged with this embedding model.
  let removed = 0;

  for (const [sourcePath, currentIds] of idsByPath) {
    const staleIds: string[] = [];

    for (let offset = 0; ; offset += PAGE_SIZE) {
      const { data, error } = await supabase
        .from("documents")
        .select("chunk_id")
        .eq("source_path", sourcePath)
        .eq("embedding_model", GEMINI_EMBEDDING_MODEL)
        .not("chunk_id", "is", null)
        .order("chunk_id", { ascending: true })
        .range(offset, offset + PAGE_SIZE - 1);

      if (error) {
        throw new Error(
          `Error revisando chunks de ${sourcePath}: ${error.message}`,
        );
      }

      const rows = data ?? [];

      for (const row of rows) {
        if (typeof row.chunk_id !== "string") {
          throw new Error(`chunk_id inválido en ${sourcePath}`);
        }

        if (!currentIds.has(row.chunk_id)) {
          staleIds.push(row.chunk_id);
        }
      }

      if (rows.length < PAGE_SIZE) break;
    }

    for (let offset = 0; offset < staleIds.length; offset += PAGE_SIZE) {
      const batch = staleIds.slice(offset, offset + PAGE_SIZE);

      const { data, error } = await supabase
        .from("documents")
        .delete()
        .eq("source_path", sourcePath)
        .eq("embedding_model", GEMINI_EMBEDDING_MODEL)
        .in("chunk_id", batch)
        .select("chunk_id");

      if (error) {
        throw new Error(
          `Error eliminando chunks obsoletos de ${sourcePath}: ${error.message}`,
        );
      }

      removed += data?.length ?? 0;
    }
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        files: idsByPath.size,
        chunks: records.length,
        embedded,
        reused,
        removed,
        embeddingModel: GEMINI_EMBEDDING_MODEL,
      },
      null,
      2,
    )}\n`,
  );
}

main().catch((error: unknown) => {
  const message = getErrorMessage(error);
  process.stderr.write(`Gemini ingestion failed: ${message}\n`);
  process.exitCode = 1;
});
