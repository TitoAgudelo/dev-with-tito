import type { RAGResponse } from "../../types/rag";
import { retrieveDocuments } from "./retriever";
import { generateAnswer } from "./generator";

const MAX_QUERY_LENGTH = 500;

/**
 * Typed error for input validation failures. The API route narrows on this
 * to return a 400 instead of a 500.
 */
export class RAGValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RAGValidationError";
  }
}

function validateQuery(raw: unknown): string {
  if (typeof raw !== "string") {
    throw new RAGValidationError("Query must be a string.");
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    throw new RAGValidationError("Query cannot be empty.");
  }
  if (trimmed.length > MAX_QUERY_LENGTH) {
    throw new RAGValidationError(
      `Query is too long (max ${MAX_QUERY_LENGTH} characters).`,
    );
  }
  return trimmed;
}

/**
 * Orchestrates retrieve → generate. Returns an immutable RAGResponse.
 * Throws RAGValidationError for invalid input.
 */
export function runRAG(query: unknown): RAGResponse {
  const validated = validateQuery(query);
  const sources = retrieveDocuments(validated, 3);
  const answer = generateAnswer(validated, sources);

  return {
    query: validated,
    answer,
    sources,
  };
}
