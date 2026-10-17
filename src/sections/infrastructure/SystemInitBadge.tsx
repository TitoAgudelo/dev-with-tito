import React from "react";

export interface SystemInitBadgeProps {
  status?: string;
  layer?: string;
  runtime?: string;
  className?: string;
}

export function SystemInitBadge({
  status = "ONLINE",
  layer = "LAYER_01: INFRASTRUCTURE",
  runtime = "15+ YRS EXPERIENCE",
  className = "",
}: SystemInitBadgeProps) {
  return (
    <div
      role="status"
      aria-label={`System Status: ${status}, Layer: ${layer}, Runtime: ${runtime}`}
      className={`inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 rounded border border-[rgba(201,147,46,0.25)] bg-[#141514]/90 backdrop-blur-sm text-xs font-mono text-[#8A8A85] tracking-wider uppercase ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 text-[#F0EFED] font-medium">
        <span
          className="inline-block w-2 h-2 rounded-full bg-[#C9932E]"
          aria-hidden="true"
        />
        <span>{status}</span>
      </span>

      <span className="text-[#8A8A85]/50 select-none" aria-hidden="true">
        /
      </span>

      <span className="text-[#C9932E] font-medium">{layer}</span>

      <span className="hidden sm:inline text-[#8A8A85]/50 select-none" aria-hidden="true">
        /
      </span>

      <span className="hidden sm:inline text-[#8A8A85]">{runtime}</span>
    </div>
  );
}

export default SystemInitBadge;
