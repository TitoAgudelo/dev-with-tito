"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import type { AskTitoMessage, AskTitoSource, AskTitoStreamEvent } from "../../../types/ask-tito";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";

const MAX_LENGTH = 500;

function createId(): string {
  return crypto.randomUUID();
}

async function publicError(response: Response): Promise<string> {
  try {
    const body = await response.json() as { error?: unknown };
    if (typeof body.error === "string") return body.error;
  } catch {
    // The public fallback below intentionally hides malformed provider responses.
  }
  return "Ask Tito AI is temporarily unavailable. Please try again.";
}

export default function AskTitoChat() {
  const [messages, setMessages] = useState<readonly AskTitoMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const latestRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (messages.length === 0) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    latestRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "end" });
  }, [messages]);

  const ask = useCallback(async (rawQuestion: string) => {
    const submitted = rawQuestion.trim();
    if (!submitted || busy) return;

    const userId = createId();
    const assistantId = createId();
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;
    setQuestion("");
    setError(null);
    setBusy(true);
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", content: submitted },
      { id: assistantId, role: "assistant", content: "", sources: [], status: "streaming" },
    ]);

    let pendingText = "";
    let nextSources: readonly AskTitoSource[] = [];
    let animationFrame: number | undefined;
    const flush = () => {
      animationFrame = undefined;
      const text = pendingText;
      pendingText = "";
      setMessages((current) => current.map((message) => message.id === assistantId
        ? { ...message, content: message.content + text, sources: nextSources }
        : message));
    };
    const scheduleFlush = () => { animationFrame ??= window.requestAnimationFrame(flush); };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: submitted }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(await publicError(response));
      if (!response.body) throw new Error("The AI service returned an empty response.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as AskTitoStreamEvent;
          if (event.type === "sources") nextSources = event.sources;
          if (event.type === "delta") pendingText += event.text;
          if (event.type === "error") throw new Error(event.message);
          scheduleFlush();
        }
        if (done) break;
      }
      if (buffer.trim()) {
        const event = JSON.parse(buffer) as AskTitoStreamEvent;
        if (event.type === "delta") pendingText += event.text;
      }
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
      flush();
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, status: "complete" } : message));
    } catch (cause: unknown) {
      if (controller.signal.aborted) return;
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
      const message = cause instanceof Error ? cause.message : "Ask Tito AI is temporarily unavailable.";
      setError(message);
      setMessages((current) => current.map((item) => item.id === assistantId
        ? { ...item, content: item.content || message, status: "error" }
        : item));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setBusy(false);
    }
  }, [busy]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(question);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void ask(question);
    }
  }

  return (
    <section className="ask-console" aria-label="Ask Tito AI conversation">
      {messages.length === 0 ? <SuggestedQuestions onSelect={(value) => void ask(value)} disabled={busy} /> : null}
      {messages.length > 0 ? (
        <div className="ask-transcript" role="log" aria-live="polite" aria-relevant="additions text">
          {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
          <div ref={latestRef} aria-hidden="true" />
        </div>
      ) : null}

      <form className="ask-composer" onSubmit={handleSubmit} aria-busy={busy}>
        <label htmlFor="ask-tito-question">Ask a question about Tito</label>
        <div className="ask-composer__field">
          <span aria-hidden="true">›</span>
          <textarea
            id="ask-tito-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value.slice(0, MAX_LENGTH))}
            onKeyDown={handleKeyDown}
            placeholder="Ask about architecture, leadership, projects…"
            rows={2}
            maxLength={MAX_LENGTH}
            disabled={busy}
            aria-describedby="ask-tito-help ask-tito-error"
          />
          <button type="submit" disabled={busy || !question.trim()}>
            <span>{busy ? "Thinking" : "Ask Tito"}</span><i aria-hidden="true">↵</i>
          </button>
        </div>
        <div className="ask-composer__help" id="ask-tito-help">
          <span>Enter to send · Shift + Enter for a new line</span><span>{question.length}/{MAX_LENGTH}</span>
        </div>
        <p id="ask-tito-error" className="ask-error" role={error ? "alert" : undefined}>{error}</p>
      </form>
    </section>
  );
}
