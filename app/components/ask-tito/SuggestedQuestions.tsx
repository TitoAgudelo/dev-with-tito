"use client";

import { memo } from "react";

export const SUGGESTED_QUESTIONS = [
  "What is Tito's largest scale system?",
  "What AI projects has Tito built?",
  "How many users has Tito supported?",
  "What leadership experience does Tito have?",
  "What cloud technologies has Tito used?",
  "Why hire Tito as a Staff Engineer?",
] as const;

function SuggestedQuestionsComponent({ onSelect, disabled }: {
  readonly onSelect: (question: string) => void;
  readonly disabled: boolean;
}) {
  return (
    <div className="ask-suggestions">
      <p>Suggested questions</p>
      <ul>
        {SUGGESTED_QUESTIONS.map((question, index) => (
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
