
import { createHash } from "node:crypto";
import { GoogleGenAI } from "@google/genai";

export const EMBEDDING_MODEL = "gemini-embedding-001";

const EMBEDDING_DIMENSIONS = 768;
const MAX_CACHE_ENTRIES = 512;

type CacheEntry = {
  vector: number[];
};

const embeddingCache = new Map<string, CacheEntry>();

let client: GoogleGenAI | undefined;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Falta GEMINI_API_KEY en las variables de entorno.");
  }

  client ??= new GoogleGenAI({ apiKey });

  return client;
}

function cacheKey(text: string): string {
  return createHash("sha256")
    .update(`${EMBEDDING_MODEL}\0${EMBEDDING_DIMENSIONS}\0${text}`)
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

  const output: number[][] = [];

  // Procesamiento secuencial para limitar concurrencia y picos de uso.
  for (const input of inputs) {
    if (!input.trim()) {
      throw new Error("No se puede generar un embedding de texto vacío.");
    }

    const key = cacheKey(input);
    const cached = embeddingCache.get(key);

    if (cached) {
      output.push([...cached.vector]);
      continue;
    }

    const response = await getClient().models.embedContent({
      model: EMBEDDING_MODEL,
      contents: input,
      config: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
        taskType: "SEMANTIC_SIMILARITY",
      },
    });

    const vector: unknown = response.embeddings?.[0]?.values;

    if (!isValidEmbedding(vector)) {
      throw new Error(
        `Gemini no devolvió un vector válido de ${EMBEDDING_DIMENSIONS} dimensiones.`,
      );
    }

    if (embeddingCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = embeddingCache.keys().next().value;
      if (oldestKey !== undefined) embeddingCache.delete(oldestKey);
    }

    embeddingCache.set(key, { vector: [...vector] });
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
