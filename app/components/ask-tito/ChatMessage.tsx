"use client";

import Link from "next/link";
import { memo } from "react";

import { ASK_TITO_COPY, isFallbackAnswer } from "../../../content/ask-tito";
import type { Locale } from "../../../lib/i18n";
import type { AskTitoMessage, AskTitoSource } from "../../../types/ask-tito";

function uniqueSources(sources: readonly AskTitoSource[]): readonly AskTitoSource[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    const key = `${source.source}:${source.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

interface ChatMessageProps {
  readonly message: AskTitoMessage;
  readonly locale: Locale;
  readonly onNavigate?: () => void;
}

function ChatMessageComponent({ message, locale, onNavigate }: ChatMessageProps) {
  const copy = ASK_TITO_COPY[locale];
  const isFallback = message.role === "assistant"
    && message.status === "complete"
    && isFallbackAnswer(message.content);
  const sources = isFallback ? [] : uniqueSources(message.sources ?? []);
  return (
    <article className={`ask-message ask-message--${message.role}`} aria-label={message.role === "user" ? copy.youSaid : copy.assistantSaid}>
      <div className="ask-message__meta">
        <span>{message.role === "user" ? copy.you : copy.assistant}</span>
        <span aria-hidden="true">{message.role === "user" ? "Q" : "A"}</span>
      </div>
      <div className="ask-message__body">
        {message.content ? <p>{message.content}</p> : null}
        {message.status === "streaming" && !message.content ? (
          <span className="ask-typing" role="status" aria-label={copy.composing}>
            <i /><i /><i />
          </span>
        ) : null}
      </div>
      {isFallback ? (
        <p className="ask-fallback-hint">
          {copy.fallbackHint}{" "}
          <Link href="/#contact" onClick={onNavigate}>{copy.fallbackLink}</Link>
        </p>
      ) : null}
      {sources.length > 0 ? (
        <div className="ask-sources" aria-label={copy.sources}>
          <span>{copy.sources}</span>
          <ul>
            {sources.map((source) => (
              <li key={`${source.source}:${source.title}`} title={source.title}>
                <strong>{source.source}</strong><span>{source.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default memo(ChatMessageComponent);
