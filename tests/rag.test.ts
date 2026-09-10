import assert from "node:assert/strict";
import test from "node:test";

import { RAGValidationError, runRAG } from "../lib/rag/pipeline";

test("runRAG normalizes input and ranks relevant sources", () => {
  const result = runRAG("  Next.js App Router  ");

  assert.equal(result.query, "Next.js App Router");
  assert.equal(result.sources[0]?.id, "nextjs");
  assert.equal(result.sources[0]?.rank, 1);
  assert.ok(result.answer.includes("Next.js"));
});

test("runRAG returns the documented fallback for an unknown topic", () => {
  const result = runRAG("quantum horticulture");

  assert.deepEqual(result.sources, []);
  assert.match(result.answer, /don't have information/i);
});

test("runRAG rejects empty, non-string, and oversized input", () => {
  for (const input of ["   ", null, "x".repeat(501)]) {
    assert.throws(() => runRAG(input), RAGValidationError);
  }
});
