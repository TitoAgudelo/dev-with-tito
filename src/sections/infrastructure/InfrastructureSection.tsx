import React from "react";
import SystemInitBadge from "./SystemInitBadge";
import IntroHero from "./IntroHero";
import TelemetryGrid from "./TelemetryGrid";

export interface InfrastructureSectionProps {
  className?: string;
}

export function InfrastructureSection({
  className = "",
}: InfrastructureSectionProps) {
  return (
    <section
      id="infrastructure"
      aria-label="Layer 1: Infrastructure & Foundation"
      className={`relative min-h-screen w-full bg-[#0B0C0C] text-[#F0EFED] blueprint-grid px-4 sm:px-6 lg:px-12 py-12 sm:py-20 flex flex-col justify-between overflow-hidden border-b border-[rgba(201,147,46,0.15)] ${className}`}
    >
      {/* Decorative Blueprint Technical Coordinate Markers */}
      <div
        className="absolute top-4 left-4 sm:left-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        SYS_GRID // 01.00.00 // INFRASTRUCTURE
      </div>
      <div
        className="absolute top-4 right-4 sm:right-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        LAYER_01 // ASSEMBLED
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-12 sm:space-y-16 lg:space-y-20 relative z-10 pt-4 sm:pt-8">
        {/* System Init Telemetry Badge */}
        <div>
          <SystemInitBadge />
        </div>

        {/* Intro & Architectural Core Statement */}
        <IntroHero />

        {/* Technical Foundation Telemetry Grid */}
        <TelemetryGrid />
      </div>

      {/* Blueprint Base Anchor Line */}
      <div
        className="w-full max-w-7xl mx-auto pt-8 mt-8 border-t border-[rgba(201,147,46,0.12)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8A8A85]"
        aria-hidden="true"
      >
        <span>STATUS: FOUNDATION_READY</span>
        <span>NEXT_LAYER: SYSTEM_TOPOLOGY [02/05]</span>
      </div>
    </section>
  );
}

export default InfrastructureSection;
