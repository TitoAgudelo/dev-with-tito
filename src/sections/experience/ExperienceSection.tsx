import React from "react";
import EngineeringConsole from "./EngineeringConsole";

export interface ExperienceSectionProps {
  className?: string;
}

export function ExperienceSection({ className = "" }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-label="Layer 4: Interactive Engineering Console"
      className={`relative min-h-screen w-full bg-[#0B0C0C] text-[#F0EFED] blueprint-grid px-4 sm:px-6 lg:px-12 py-16 sm:py-24 flex flex-col justify-between overflow-hidden border-b border-[rgba(201,147,46,0.15)] ${className}`}
    >
      {/* Decorative Blueprint Technical Coordinate Markers */}
      <div
        className="absolute top-4 left-4 sm:left-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        SYS_GRID // 04.00.00 // INTERACTIVE_RUNTIME
      </div>
      <div
        className="absolute top-4 right-4 sm:right-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        LAYER_04 // CONSOLE_ACTIVE
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-12 sm:space-y-16 lg:space-y-20 relative z-10 pt-4 sm:pt-8">
        {/* Layer 4 Header Block */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="w-5 h-[1px] bg-[#C9932E]"
              aria-hidden="true"
            />
            <p className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
              SYS_LAYER_04 // INTERACTIVE_RUNTIME // ENGINEERING_CLI
            </p>
          </div>

          <h2 className="font-display font-light text-[#F0EFED] text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08]">
            Direct system access: Explore the architecture in real time.
          </h2>

          <p className="font-sans text-[#8A8A85] text-lg sm:text-xl leading-relaxed max-w-3xl font-normal">
            Interact directly with Tito&apos;s technical documentation, system specifications, and production case studies through a functional terminal console.
          </p>
        </header>

        {/* The Interactive Engineering Console */}
        <div className="max-w-5xl">
          <EngineeringConsole />
        </div>

        {/* Contextual CTA to next layer */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href="#business"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded border border-[#C9932E] bg-transparent text-[#F0EFED] font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-[#C9932E] hover:text-[#0B0C0C] focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2"
          >
            <span>Review Consulting Services & Partnership</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Blueprint Base Anchor Line */}
      <div
        className="w-full max-w-7xl mx-auto pt-8 mt-12 border-t border-[rgba(201,147,46,0.12)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8A8A85]"
        aria-hidden="true"
      >
        <span>STATUS: CONSOLE_ONLINE</span>
        <span>NEXT_LAYER: BUSINESS_PARTNERSHIP [05/05]</span>
      </div>
    </section>
  );
}

export default ExperienceSection;
