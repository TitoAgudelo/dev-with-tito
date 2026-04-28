"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  Lightbulb,
  FileText,
} from "lucide-react";
import { useRAG } from "../../../hooks/useRAG";
import type { RAGSource } from "../../../types/rag";

const EXAMPLES: readonly string[] = [
  "What's your experience with React and Next.js?",
  "How do you build RAG and AI systems?",
  "Tell me about your remote work experience.",
];

const MAX_LENGTH = 500;

export default function RAGDemo() {
  const [query, setQuery] = useState<string>("");
  const { ask, data, loading, error, reset } = useRAG();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    void ask(query);
  };

  const handleExample = (example: string) => {
    setQuery(example);
    void ask(example);
  };

  const handleClear = () => {
    setQuery("");
    reset();
  };

  const charsLeft = MAX_LENGTH - query.length;
  const submitDisabled = loading || query.trim().length === 0;

  return (
    <section ref={ref} id="demo" className="py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <span className="section-label mb-4">
          <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          Try it
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Ask the <span className="gradient-text">knowledge base</span>
        </h2>
        <p className="mt-4 text-secondary max-w-xl">
          The pipeline retrieves the most relevant documents and synthesizes a
          grounded answer. No external model — pure TypeScript, end to end.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-10 gradient-border rounded-2xl"
      >
        <div className="p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label
              htmlFor="rag-query"
              className="text-xs font-mono uppercase tracking-wider text-muted"
            >
              Your question
            </label>
            <textarea
              id="rag-query"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, MAX_LENGTH))}
              placeholder="Ask me about my experience, React, RAG…"
              rows={3}
              className="input-field resize-none leading-relaxed"
              maxLength={MAX_LENGTH}
              aria-describedby="rag-helper"
            />
            <div
              id="rag-helper"
              className="flex items-center justify-between text-[11px] font-mono text-muted"
            >
              <span>
                Pure in-memory retrieval · no external APIs
              </span>
              <span className={charsLeft < 60 ? "text-accent" : ""}>
                {charsLeft} chars left
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
              <button
                type="submit"
                disabled={submitDisabled}
                className="btn-glow flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Thinking…
                  </>
                ) : (
                  <>
                    Ask
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
              {(data || error) && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-outline flex-1 sm:flex-none !py-2.5 !text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      {/* Empty state — example queries */}
      {!data && !error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-3">
            <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
            Try one of these
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleExample(example)}
                className="text-left text-sm text-secondary hover:text-primary hover:border-accent/40 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] transition-colors duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Error state */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/[0.04]"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-primary">Something went off the rails</p>
              <p className="text-sm text-secondary mt-1">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {data && (
          <motion.div
            key={data.query}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col gap-6"
          >
            <Answer answer={data.answer} />
            <Sources sources={data.sources} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Answer({ answer }: { answer: string }) {
  return (
    <div className="glass rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
        </span>
        <span className="text-xs font-mono uppercase tracking-wider text-muted">
          Answer
        </span>
      </div>
      <p className="text-primary text-base sm:text-lg leading-relaxed">
        {answer}
      </p>
    </div>
  );
}

function Sources({ sources }: { sources: readonly RAGSource[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <FileText className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted">
          Sources ({sources.length})
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-3">
        {sources.map((source) => (
          <li
            key={source.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono text-muted shrink-0">
                  #{source.rank}
                </span>
                <h4 className="text-sm font-semibold text-primary truncate">
                  {source.title}
                </h4>
              </div>
              <span
                className="text-[11px] font-mono text-accent shrink-0"
                title="Relevance score"
              >
                {source.score.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-secondary leading-relaxed">
              {truncate(source.content, 220)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}
