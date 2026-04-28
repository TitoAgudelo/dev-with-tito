"use client";

import { useCallback, useRef, useState } from "react";
import type { RAGErrorResponse, RAGResponse } from "../types/rag";

export interface UseRAGState {
  data: RAGResponse | null;
  loading: boolean;
  error: string | null;
}

export interface UseRAGResult extends UseRAGState {
  ask: (query: string) => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE: UseRAGState = {
  data: null,
  loading: false,
  error: null,
};

function isErrorResponse(value: unknown): value is RAGErrorResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { error?: unknown }).error === "string"
  );
}

function isRAGResponse(value: unknown): value is RAGResponse {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<RAGResponse>;
  return (
    typeof candidate.query === "string" &&
    typeof candidate.answer === "string" &&
    Array.isArray(candidate.sources)
  );
}

export function useRAG(): UseRAGResult {
  const [state, setState] = useState<UseRAGState>(INITIAL_STATE);
  // Keep an AbortController so a stale request never resolves over a fresh one.
  const inflight = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    inflight.current?.abort();
    inflight.current = null;
    setState(INITIAL_STATE);
  }, []);

  const ask = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      setState({ data: null, loading: false, error: "Please enter a question." });
      return;
    }

    inflight.current?.abort();
    const controller = new AbortController();
    inflight.current = controller;

    setState({ data: null, loading: true, error: null });

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
        signal: controller.signal,
      });

      const json: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        const message = isErrorResponse(json)
          ? json.error
          : `Request failed (${res.status}).`;
        setState({ data: null, loading: false, error: message });
        return;
      }

      if (!isRAGResponse(json)) {
        setState({
          data: null,
          loading: false,
          error: "Received an unexpected response.",
        });
        return;
      }

      setState({ data: json, loading: false, error: null });
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        // Superseded by a newer request — leave the newer one in charge.
        return;
      }
      setState({
        data: null,
        loading: false,
        error: "Network error. Please try again.",
      });
    } finally {
      if (inflight.current === controller) {
        inflight.current = null;
      }
    }
  }, []);

  return { ...state, ask, reset };
}
