"use client";

import { memo } from "react";

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

function ChatMessageComponent({ message }: { readonly message: AskTitoMessage }) {
  const sources = uniqueSources(message.sources ?? []);
  return (
    <article className={`ask-message ask-message--${message.role}`} aria-label={`${message.role === "user" ? "You" : "Tito AI"} said`}>
      <div className="ask-message__meta">
        <span>{message.role === "user" ? "Recruiter" : "Tito / AI"}</span>
        <span aria-hidden="true">{message.role === "user" ? "Q" : "A"}</span>
      </div>
      <div className="ask-message__body">
        {message.content ? <p>{message.content}</p> : null}
        {message.status === "streaming" && !message.content ? (
          <span className="ask-typing" role="status" aria-label="Tito AI is composing an answer">
            <i /><i /><i />
          </span>
        ) : null}
      </div>
      {sources.length > 0 ? (
        <div className="ask-sources" aria-label="Answer sources">
          <span>Sources</span>
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
