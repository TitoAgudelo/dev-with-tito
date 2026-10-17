import React, { useState, useRef, KeyboardEvent } from "react";

export interface CommandInputProps {
  currentPath: string;
  onSubmitCommand: (command: string) => void;
  commandList?: string[];
  recentHistory?: string[];
  className?: string;
}

export function CommandInput({
  currentPath,
  onSubmitCommand,
  commandList = [],
  recentHistory = [],
  className = "",
}: CommandInputProps) {
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    onSubmitCommand(inputVal);
    setInputVal("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up: Previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (recentHistory.length === 0) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex < recentHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(recentHistory[recentHistory.length - 1 - nextIndex]);
      }
    }

    // Arrow Down: Next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(recentHistory[recentHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }

    // Tab: Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      const match = commandList.find((cmd) => cmd.startsWith(trimmed));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 px-4 py-3 bg-[#0B0C0C] border-t border-[rgba(201,147,46,0.2)] font-mono text-xs sm:text-sm ${className}`}
      aria-label="CLI Command Input"
    >
      <label htmlFor="cli-input" className="sr-only">
        Enter terminal command
      </label>

      {/* Prompt Prefix */}
      <span className="text-[#C9932E] font-medium select-none flex items-center gap-1">
        <span className="hidden sm:inline text-[#8A8A85]">tito@system:</span>
        <span>{currentPath}</span>
        <span className="text-[#C9932E] font-bold">$</span>
      </span>

      {/* Text Input */}
      <input
        ref={inputRef}
        id="cli-input"
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="Type 'help' or 'ls'..."
        className="flex-1 bg-transparent text-[#F0EFED] placeholder-[#8A8A85]/50 border-none outline-none font-mono text-xs sm:text-sm focus:ring-0 selection:bg-[#C9932E]/30"
      />

      {/* Submit Button (Accessible for Touch) */}
      <button
        type="submit"
        disabled={!inputVal.trim()}
        className="px-2.5 py-1 rounded bg-[#C9932E]/10 border border-[rgba(201,147,46,0.3)] text-xs text-[#C9932E] hover:bg-[#C9932E] hover:text-[#0B0C0C] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Execute command"
      >
        Run ↵
      </button>
    </form>
  );
}

export default CommandInput;
