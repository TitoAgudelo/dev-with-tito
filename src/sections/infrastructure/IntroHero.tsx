import React from "react";

export interface IntroHeroProps {
  headline?: string;
  roleTitle?: string;
  description?: string;
  className?: string;
}

export function IntroHero({
  headline = "Engineering software systems from foundation to scale.",
  roleTitle = "Tito Agudelo // Staff Software Engineer & Mobile Architect",
  description = "Staff-level engineer with more than 15 years of experience architecting mobile, web, cloud, and AI-powered products. Specialized in React Native, resilient product architecture, full-stack systems, and technical leadership.",
  className = "",
}: IntroHeroProps) {
  return (
    <header className={`space-y-6 max-w-4xl ${className}`}>
      {/* Role / Meta Identifier */}
      <div className="flex items-center gap-3">
        <span
          className="w-5 h-[1px] bg-[#C9932E]"
          aria-hidden="true"
        />
        <p className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
          {roleTitle}
        </p>
      </div>

      {/* Main Headline (Fraunces Display) */}
      <h1 className="font-display font-light text-[#F0EFED] text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.06]">
        {headline}
      </h1>

      {/* Core Summary (Inter) */}
      <p className="font-sans text-[#8A8A85] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl font-normal">
        {description}
      </p>

      {/* Layer 1 Contextual CTA */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        <a
          href="#telemetry"
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded border border-[#C9932E] bg-transparent text-[#F0EFED] font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-[#C9932E] hover:text-[#0B0C0C] focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2"
        >
          <span>Inspect Foundation Telemetry</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  );
}

export default IntroHero;
