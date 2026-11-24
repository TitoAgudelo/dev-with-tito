"use client";

import type { ReactNode } from "react";

import { ASK_TITO_OPEN_EVENT, type AskTitoOpenDetail } from "../../../content/ask-tito";

interface AskTitoTriggerProps {
  readonly question?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/** Opens the floating chat, optionally asking `question` right away. */
export default function AskTitoTrigger({ question, className, children }: AskTitoTriggerProps) {
  function handleClick() {
    const detail: AskTitoOpenDetail = { question };
    window.dispatchEvent(new CustomEvent(ASK_TITO_OPEN_EVENT, { detail }));
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
