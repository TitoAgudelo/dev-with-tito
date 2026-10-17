import { loadEnvConfig } from "@next/env";
import { loadIngestionRecords } from "../lib/ingestion";
import { getSupabaseAdmin } from "../lib/supabase-admin";
import { generateGeminiEmbedding } from "../lib/gemini-embeddings";

loadEnvConfig(process.cwd());

async function main(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const records = await loadIngestionRecords();

  if (records.length === 0) {
    throw new Error("No se encontraron documentos Markdown.");
  }

  let migrated = 0;
  let skipped = 0;

  for (const record of records) {
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

    if (!existing) {
      throw new Error(
        `No existe el documento ${record.id} en Supabase. ` +
        "Se detuvo la migración para evitar insertar registros.",
      );
    }

    if (existing.embedding_gemini != null) {
      skipped++;
      continue;
    }

    const embedding = await generateGeminiEmbedding(record.document);

    const { data: updated, error: updateError } = await supabase
      .from("documents")
      .update({ embedding_gemini: embedding })
      .eq("chunk_id", record.id)
      .is("embedding_gemini", null)
      .select("chunk_id");

    if (updateError) {
      throw new Error(
        `Error guardando ${record.sourcePath}: ${updateError.message}`,
      );
    }

    if (!updated?.length) {
      throw new Error(
        `No se actualizó el documento ${record.id}.`,
      );
    }

    migrated++;

    process.stdout.write(
      `Migrados: ${migrated}; omitidos: ${skipped}; ` +
      `total: ${records.length}\n`,
    );
  }

  process.stdout.write(
    `${JSON.stringify(
      { total: records.length, migrated, skipped },
      null,
      2,
    )}\n`,
  );
}

main().catch((error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Unknown migration failure";

  process.stderr.write(`Gemini migration failed: ${message}\n`);
  process.exitCode = 1;
});
