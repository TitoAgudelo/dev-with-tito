/**
 * Public type contracts for the /rag feature.
 * Runtime stays in `lib/rag/*` — this file exports types only.
 */

export interface RAGDocument {
  id: string;
  title: string;
  content: string;
  tags?: readonly string[];
}

/** A retrieved document together with the score it earned during retrieval. */
export interface RAGSource extends RAGDocument {
  /** Raw overlap score from the retriever. Higher is better. */
  score: number;
  /** 1-based rank in the result set, useful for UI display. */
  rank: number;
}

export interface RAGRequest {
  query: string;
}

export interface RAGResponse {
  query: string;
  answer: string;
  sources: readonly RAGSource[];
}

/** Shape returned by the API on a non-2xx response. */
export interface RAGErrorResponse {
  error: string;
}
