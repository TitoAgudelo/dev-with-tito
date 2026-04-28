import type { RAGDocument, RAGSource } from "../../types/rag";

/**
 * In-memory knowledge base. Small on purpose: this is a portfolio demo
 * where the retrieval layer is the point, not the corpus size.
 */
const KNOWLEDGE_BASE: readonly RAGDocument[] = [
  {
    id: "experience",
    title: "Experience overview",
    content:
      "Tito Agudelo is a Senior Software Engineer with 13+ years of professional experience building web and mobile applications. He has delivered projects for both early-stage startups and large enterprises, leading work across frontend, backend, and infrastructure.",
    tags: ["experience", "career", "senior", "engineer"],
  },
  {
    id: "remote-work",
    title: "Remote and distributed teams",
    content:
      "Tito has worked fully remote since 2016, collaborating with distributed teams across the United States, Latin America, and Europe. He is comfortable owning work end-to-end, communicating asynchronously, and partnering with product, design, and engineering peers across time zones.",
    tags: ["remote", "distributed", "async", "team"],
  },
  {
    id: "react",
    title: "React and frontend craft",
    content:
      "React is the core of Tito's frontend work. He builds component systems with strong typing, predictable state, and accessibility built in. He cares about render performance, keeping bundles lean, and choosing the right state-management boundary instead of reaching for global state by default.",
    tags: ["react", "frontend", "ui", "components", "performance"],
  },
  {
    id: "nextjs",
    title: "Next.js and full-stack delivery",
    content:
      "Tito uses Next.js (App Router) to ship full-stack products: server components for data fetching, route handlers for typed APIs, and edge-friendly rendering where it pays off. He treats Next.js as a delivery platform — not just a React framework — pairing it with Vercel, serverless functions, and CI checks.",
    tags: ["nextjs", "fullstack", "ssr", "app-router", "vercel"],
  },
  {
    id: "rag",
    title: "RAG and AI systems",
    content:
      "Recently Tito has focused on integrating AI into real production systems. That includes Retrieval-Augmented Generation (RAG) pipelines that ground LLM answers in trusted documents, embedding stores, and prompt orchestration. He treats RAG as a data problem first: clean ingestion, deterministic retrieval, and observable generation.",
    tags: ["rag", "ai", "llm", "retrieval", "embeddings"],
  },
  {
    id: "automation",
    title: "AI automation and workflows",
    content:
      "Beyond RAG, Tito builds automation workflows that combine LLMs with deterministic code: data extraction, classification, internal copilots, and agentic flows that take action against APIs. He focuses on reliability — fallbacks, structured outputs, and tests around the parts of the pipeline that are not deterministic.",
    tags: ["automation", "agents", "llm", "workflow", "reliability"],
  },
  {
    id: "architecture",
    title: "Engineering approach and architecture",
    content:
      "Tito favors clean architecture: clear boundaries between domain logic, infrastructure, and UI; small files with high cohesion; and types that document intent. He optimizes for systems that are easy to change six months later, with strong observability and tests where they pay off.",
    tags: ["architecture", "clean-code", "patterns", "systems"],
  },
  {
    id: "ux",
    title: "Product thinking and UX",
    content:
      "Tito treats engineering and UX as one discipline. He partners closely with designers, pushes back when an interaction will hurt accessibility or performance, and prototypes quickly to validate ideas. The goal is always reliable software that feels effortless to use.",
    tags: ["ux", "product", "accessibility", "design"],
  },
  {
    id: "javascript",
    title: "JavaScript and TypeScript ecosystem",
    content:
      "TypeScript-first by default. Tito uses strict mode, prefers explicit types on public APIs, and leans on schema validation (Zod) at system boundaries. He stays current with the JavaScript ecosystem — modern build tooling, modern runtimes — without chasing every trend.",
    tags: ["typescript", "javascript", "tooling", "strict"],
  },
  {
    id: "data",
    title: "Real-time and data-driven products",
    content:
      "Tito has shipped real-time features (WebSockets, server-sent events, presence) and data-heavy dashboards where latency and correctness both matter. He thinks carefully about caching, pagination, and optimistic updates — and about the failure modes those choices create.",
    tags: ["realtime", "websocket", "data", "dashboards"],
  },
];

/** Stop words filtered out before scoring — short list, intentionally readable. */
const STOP_WORDS: ReadonlySet<string> = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "do", "does", "for", "from",
  "has", "have", "he", "her", "him", "his", "how", "i", "in", "is", "it", "its",
  "me", "my", "of", "on", "or", "she", "that", "the", "their", "them", "they",
  "this", "to", "us", "was", "we", "were", "what", "when", "where", "which",
  "who", "why", "will", "with", "you", "your", "about", "tell", "can",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreDocument(queryTokens: readonly string[], doc: RAGDocument): number {
  if (queryTokens.length === 0) return 0;

  const docTokens = new Set(tokenize(`${doc.title} ${doc.content}`));
  const tagTokens = new Set((doc.tags ?? []).map((tag) => tag.toLowerCase()));

  let score = 0;
  for (const token of queryTokens) {
    if (docTokens.has(token)) score += 1;
    // Tag matches are stronger signal — they were chosen by hand.
    if (tagTokens.has(token)) score += 1.5;
  }

  // Normalize by query length so longer queries don't dominate trivially.
  return score / queryTokens.length;
}

/**
 * Retrieve the top-K documents whose tokens best overlap the query.
 * Pure function — no I/O, no side effects.
 */
export function retrieveDocuments(query: string, k: number = 3): RAGSource[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = KNOWLEDGE_BASE.map((doc) => ({
    doc,
    score: scoreDocument(queryTokens, doc),
  }));

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, k))
    .map((entry, index) => ({
      ...entry.doc,
      score: Number(entry.score.toFixed(3)),
      rank: index + 1,
    }));
}
