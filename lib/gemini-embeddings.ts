import { GoogleGenAI } from "@google/genai";

export const GEMINI_EMBEDDING_MODEL = "gemini-embedding-001";

const EMBEDDING_DIMENSIONS = 768;

let client: GoogleGenAI | undefined;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Falta GEMINI_API_KEY en las variables de entorno.");
  }

  client ??= new GoogleGenAI({ apiKey });

  return client;
}

function normalizeEmbedding(values: readonly number[]): number[] {
  if (
    values.length !== EMBEDDING_DIMENSIONS ||
    !values.every(Number.isFinite)
  ) {
    throw new Error(
      `Gemini debe devolver ${EMBEDDING_DIMENSIONS} dimensiones válidas.`,
    );
  }

  const norm = Math.sqrt(
    values.reduce((sum, value) => sum + value * value, 0),
  );

  if (!Number.isFinite(norm) || norm === 0) {
    throw new Error("El embedding no se puede normalizar.");
  }

  return values.map((value) => value / norm);
}

export async function generateGeminiEmbedding(
  input: string,
): Promise<number[]> {
  if (!input.trim()) {
    throw new Error("No se puede generar un embedding de texto vacío.");
  }

  const response = await getClient().models.embedContent({
    model: GEMINI_EMBEDDING_MODEL,
    contents: input,
    config: {
      outputDimensionality: EMBEDDING_DIMENSIONS,
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });

  const values = response.embeddings?.[0]?.values;

  if (!values) {
    throw new Error("Gemini no devolvió ningún embedding.");
  }

  return normalizeEmbedding(values);
}
