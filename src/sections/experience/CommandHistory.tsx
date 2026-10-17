import React, { useRef, useEffect } from "react";
import ResponseRenderer, { HistoryEntry } from "./ResponseRenderer";

export interface CommandHistoryProps {
  history: HistoryEntry[];
  onCommandClick?: (cmd: string) => void;
  className?: string;
}

export function CommandHistory({
  history,
  onCommandClick,
  className = "",
}: CommandHistoryProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-atomic="false"
      className={`space-y-4 p-4 sm:p-6 overflow-y-auto max-h-[480px] sm:max-h-[560px] ${className}`}
    >
      {history.map((entry) => (
        <div key={entry.id} className="space-y-2">
          <ResponseRenderer entry={entry} onCommandClick={onCommandClick} />
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default CommandHistory;
