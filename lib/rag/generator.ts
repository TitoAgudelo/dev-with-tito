import type { RAGSource } from "../../types/rag";

/**
 * Pull the most query-relevant sentence out of a document.
 * Falls back to the first sentence when no overlap is found, so the answer
 * always cites something concrete from the source.
 */
function pickSentence(query: string, content: string): string {
  const sentences = content
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return content.trim();

  const queryTokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);

  if (queryTokens.length === 0) return sentences[0];

  let best = sentences[0];
  let bestScore = -1;

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    const score = queryTokens.reduce(
      (acc, token) => (lower.includes(token) ? acc + 1 : acc),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      best = sentence;
    }
  }

  return best;
}

function joinNaturally(parts: readonly string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} ${parts[1]}`;
  return parts.join(" ");
}

const NO_MATCH_ANSWER =
  "I don't have information about that yet. Try asking about Tito's experience, his work with React or Next.js, RAG and AI systems, remote collaboration, or his engineering approach.";

/**
 * Synthesize an answer from the query and retrieved sources.
 * Pure function. No external APIs.
 */
export function generateAnswer(query: string, docs: readonly RAGSource[]): string {
  if (docs.length === 0) return NO_MATCH_ANSWER;

  const top = docs[0];
  const lead = pickSentence(query, top.content);

  // Pull supporting sentences from up to two follow-up sources, deduplicated.
  const seen = new Set<string>([lead]);
  const support: string[] = [];
  for (const doc of docs.slice(1, 3)) {
    const sentence = pickSentence(query, doc.content);
    if (!seen.has(sentence)) {
      support.push(sentence);
      seen.add(sentence);
    }
  }

  return joinNaturally([lead, ...support]);
}
