"use client";

import { memo } from "react";

import { ASK_TITO_COPY, SUGGESTED_QUESTIONS } from "../../../content/ask-tito";
import type { Locale } from "../../../lib/i18n";

function SuggestedQuestionsComponent({ locale, onSelect, disabled }: {
  readonly locale: Locale;
  readonly onSelect: (question: string) => void;
  readonly disabled: boolean;
}) {
  return (
    <div className="ask-suggestions">
      <p>{ASK_TITO_COPY[locale].suggested}</p>
      <ul>
        {SUGGESTED_QUESTIONS[locale].map((question, index) => (
          <li key={question}>
            <button type="button" onClick={() => onSelect(question)} disabled={disabled}>
              <span>0{index + 1}</span>{question}<i aria-hidden="true">↗</i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SuggestedQuestionsComponent);
