import React from "react";
import ServicesGrid from "./ServicesGrid";
import EngagementModel from "./EngagementModel";
import CalendlyPlaceholder from "./CalendlyPlaceholder";
import ContactPanel from "./ContactPanel";

export interface BusinessSectionProps {
  className?: string;
}

export function BusinessSection({ className = "" }: BusinessSectionProps) {
  return (
    <section
      id="business"
      aria-label="Layer 5: Business Services & Direct Engagement"
      className={`relative min-h-screen w-full bg-[#0B0C0C] text-[#F0EFED] blueprint-grid px-4 sm:px-6 lg:px-12 py-16 sm:py-24 flex flex-col justify-between overflow-hidden border-b border-[rgba(201,147,46,0.15)] ${className}`}
    >
      {/* Decorative Blueprint Technical Coordinate Markers */}
      <div
        className="absolute top-4 left-4 sm:left-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        SYS_GRID // 05.00.00 // BUSINESS_VALUE
      </div>
      <div
        className="absolute top-4 right-4 sm:right-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        LAYER_05 // ASSEMBLED_COMPLETE
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20 lg:space-y-24 relative z-10 pt-4 sm:pt-8">
        {/* Layer 5 Header Block */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="w-5 h-[1px] bg-[#C9932E]"
              aria-hidden="true"
            />
            <p className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
              SYS_LAYER_05 // BUSINESS_VALUE // CONSULTING & TECHNICAL LEADERSHIP
            </p>
          </div>

          <h2 className="font-display font-light text-[#F0EFED] text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08]">
            Engineering partnership built for measurable business impact.
          </h2>

          <p className="font-sans text-[#8A8A85] text-lg sm:text-xl leading-relaxed max-w-3xl font-normal">
            Whether you need deep React Native performance reviews, 0-to-1 mobile product architecture, AI system implementation, or fractional technical leadership, discover how we can collaborate.
          </p>
        </header>

        {/* 1. Services Catalog Grid */}
        <ServicesGrid />

        {/* 2. Engagement & Collaboration Model */}
        <EngagementModel />

        {/* 3. Conversion Hub: Direct Calendly Scheduler & Contact Panel */}
        <div className="space-y-8">
          <CalendlyPlaceholder />
          <ContactPanel />
        </div>
      </div>

      {/* Blueprint System Assembly Final Anchor Line */}
      <div
        className="w-full max-w-7xl mx-auto pt-8 mt-16 border-t border-[rgba(201,147,46,0.18)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8A8A85]"
        aria-hidden="true"
      >
        <span className="text-[#C9932E]">SYSTEM_ASSEMBLY: ALL 5 LAYERS COMPLETE</span>
        <span>TITO AGUDELO // STAFF SOFTWARE ENGINEER & MOBILE ARCHITECT</span>
      </div>
    </section>
  );
}

export default BusinessSection;
