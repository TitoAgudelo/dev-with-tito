import React from "react";

export interface ConsoleHeaderProps {
  currentPath: string;
  onClear: () => void;
  className?: string;
}

export function ConsoleHeader({
  currentPath,
  onClear,
  className = "",
}: ConsoleHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 bg-[#0B0C0C] border-b border-[rgba(201,147,46,0.2)] font-mono text-xs text-[#8A8A85] select-none ${className}`}
    >
      {/* Left: Window Controls & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9932E]/80 border border-[#C9932E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A8A85]/40 border border-[#8A8A85]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A8A85]/20 border border-[#8A8A85]/40" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#C9932E] font-medium hidden sm:inline">
            TITO_CLI // v1.0
          </span>
          <span className="text-[#8A8A85]/40 hidden sm:inline">•</span>
          <span className="text-[#F0EFED]">
            PATH: <code className="text-[#C9932E]">{currentPath}</code>
          </span>
        </div>
      </div>

      {/* Right: Status and Clear Button */}
      <div className="flex items-center gap-3">
        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#8A8A85]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9932E]" aria-hidden="true" />
          INTERACTIVE_SHELL
        </span>

        <button
          type="button"
          onClick={onClear}
          className="px-2 py-0.5 rounded border border-[rgba(240,239,237,0.1)] bg-[#141514] text-[11px] text-[#8A8A85] hover:text-[#F0EFED] hover:border-[#C9932E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9932E]"
          aria-label="Clear terminal output history"
        >
          clear
        </button>
      </div>
    </div>
  );
}

export default ConsoleHeader;
