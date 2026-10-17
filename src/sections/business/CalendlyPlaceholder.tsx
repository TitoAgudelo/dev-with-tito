import React from "react";

export interface CalendlyPlaceholderProps {
  calendlyUrl?: string;
  className?: string;
}

export function CalendlyPlaceholder({
  calendlyUrl = "https://calendly.com/titoagudelo",
  className = "",
}: CalendlyPlaceholderProps) {
  return (
    <div
      role="region"
      aria-label="Direct Technical Discovery Call Scheduling"
      className={`relative p-6 sm:p-8 lg:p-10 rounded border border-[rgba(201,147,46,0.3)] bg-[#141514]/90 space-y-6 ${className}`}
    >
      {/* Top Coordinate Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(201,147,46,0.18)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <span className="font-mono text-xs text-[#C9932E] tracking-wider uppercase font-medium">
            SCHEDULER // 30-MIN TECHNICAL DISCOVERY
          </span>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          TIMEZONE: AUTO-DETECTED
        </span>
      </div>

      {/* Title & Context */}
      <div className="space-y-3 max-w-2xl">
        <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F0EFED] tracking-tight">
          Book a 30-Minute Architecture Discovery Call
        </h3>
        <p className="font-sans text-sm sm:text-base text-[#8A8A85] leading-relaxed">
          Direct, 1-on-1 technical conversation with Tito Agudelo. Discuss your mobile platform roadmap, React Native performance bottlenecks, or AI system requirements.
        </p>
      </div>

      {/* Discovery Call Inclusions Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded bg-[#0B0C0C] border border-[rgba(240,239,237,0.08)] space-y-1">
          <span className="font-mono text-[10px] text-[#C9932E] uppercase tracking-wider block">
            01 // SCOPE REVIEW
          </span>
          <p className="font-sans text-xs text-[#F0EFED]">
            System requirements & constraints review
          </p>
        </div>
        <div className="p-4 rounded bg-[#0B0C0C] border border-[rgba(240,239,237,0.08)] space-y-1">
          <span className="font-mono text-[10px] text-[#C9932E] uppercase tracking-wider block">
            02 // ARCHITECTURE AUDIT
          </span>
          <p className="font-sans text-xs text-[#F0EFED]">
            Preliminary bottleneck identification
          </p>
        </div>
        <div className="p-4 rounded bg-[#0B0C0C] border border-[rgba(240,239,237,0.08)] space-y-1">
          <span className="font-mono text-[10px] text-[#C9932E] uppercase tracking-wider block">
            03 // ROADMAP FIT
          </span>
          <p className="font-sans text-xs text-[#F0EFED]">
            Execution timeline & collaboration plan
          </p>
        </div>
      </div>

      {/* Action Area */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded border border-[#C9932E] bg-[#C9932E] text-[#0B0C0C] font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-transparent hover:text-[#F0EFED] focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2"
        >
          <span>Open Discovery Scheduler (Calendly)</span>
          <span aria-hidden="true">↗</span>
        </a>

        <span className="font-mono text-xs text-[#8A8A85]">
          No obligation • 100% confidential
        </span>
      </div>
    </div>
  );
}

export default CalendlyPlaceholder;
