import { createHash } from "node:crypto";
import { InferenceClient } from "@huggingface/inference";

export const EMBEDDING_MODEL = "BAAI/bge-base-en-v1.5";

const EMBEDDING_DIMENSIONS = 768;
const MAX_CACHE_ENTRIES = 512;
const embeddingCache = new Map<string, number[]>();

function cacheKey(text: string): string {
  return createHash("sha256")
    .update(`${EMBEDDING_MODEL}\0${text}`)
    .digest("hex");
}

function isValidEmbedding(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === EMBEDDING_DIMENSIONS &&
    value.every(
      (item) => typeof item === "number" && Number.isFinite(item),
    )
  );
}

export async function generateEmbeddings(
  inputs: readonly string[],
): Promise<number[][]> {
  if (inputs.length === 0) return [];

  const token = process.env.HF_TOKEN;
  if (!token) throw new Error("Falta HF_TOKEN en .env.local.");

  const client = new InferenceClient(token);
  const output: number[][] = [];

  // Procesamiento secuencial para limitar solicitudes simultáneas.
  for (const input of inputs) {
    if (!input.trim()) {
      throw new Error("No se puede generar un embedding de texto vacío.");
    }

    const key = cacheKey(input);
    const cached = embeddingCache.get(key);

    if (cached) {
      output.push([...cached]);
      continue;
    }

    const result = await client.featureExtraction({
      provider: "hf-inference",
      model: EMBEDDING_MODEL,
      inputs: input,
    });

    const vector: unknown =
      Array.isArray(result) &&
      result.length === 1 &&
      Array.isArray(result[0])
        ? result[0]
        : result;

    if (!isValidEmbedding(vector)) {
      throw new Error(
        "Hugging Face no devolvió un vector válido de 768 dimensiones.",
      );
    }

    if (embeddingCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = embeddingCache.keys().next().value;
      if (oldestKey !== undefined) embeddingCache.delete(oldestKey);
    }

    embeddingCache.set(key, [...vector]);
    output.push([...vector]);
  }

  return output;
}

export async function generateEmbedding(input: string): Promise<number[]> {
  const [embedding] = await generateEmbeddings([input]);

  if (!embedding) {
    throw new Error("No se generó ningún embedding.");
  }

  return embedding;
}

export function clearEmbeddingCache(): void {
  embeddingCache.clear();
}
