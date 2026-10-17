import React from "react";
import CaseStudyGallery from "./CaseStudyGallery";
import ImpactMetrics from "./ImpactMetrics";

export interface ProductSectionProps {
  className?: string;
}

export function ProductSection({ className = "" }: ProductSectionProps) {
  return (
    <section
      id="product"
      aria-label="Layer 3: Production Products & Case Studies"
      className={`relative min-h-screen w-full bg-[#0B0C0C] text-[#F0EFED] blueprint-grid px-4 sm:px-6 lg:px-12 py-16 sm:py-24 flex flex-col justify-between overflow-hidden border-b border-[rgba(201,147,46,0.15)] ${className}`}
    >
      {/* Decorative Blueprint Technical Coordinate Markers */}
      <div
        className="absolute top-4 left-4 sm:left-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        SYS_GRID // 03.00.00 // PRODUCTION_PRODUCTS
      </div>
      <div
        className="absolute top-4 right-4 sm:right-6 font-mono text-[10px] text-[#8A8A85]/40 select-none pointer-events-none"
        aria-hidden="true"
      >
        LAYER_03 // PRODUCTS_ASSEMBLED
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20 lg:space-y-24 relative z-10 pt-4 sm:pt-8">
        {/* Layer 3 Header Block */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="w-5 h-[1px] bg-[#C9932E]"
              aria-hidden="true"
            />
            <p className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
              SYS_LAYER_03 // PRODUCTION_DEPLOYMENTS // HIGH_SCALE_PRODUCTS
            </p>
          </div>

          <h2 className="font-display font-light text-[#F0EFED] text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08]">
            Engineering products that solve complex problems at scale.
          </h2>

          <p className="font-sans text-[#8A8A85] text-lg sm:text-xl leading-relaxed max-w-3xl font-normal">
            Great software engineering is not measured in abstract code, but in how technical architecture eliminates user friction, stabilizes high-concurrency platforms, and drives measurable business outcomes.
          </p>
        </header>

        {/* 1. Macro Impact Telemetry */}
        <ImpactMetrics />

        {/* 2. Deep-Dive Case Studies Gallery with 5-Phase Problem Solution Framework */}
        <CaseStudyGallery />

        {/* Contextual CTA to next layer */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href="#experience"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded border border-[#C9932E] bg-transparent text-[#F0EFED] font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-[#C9932E] hover:text-[#0B0C0C] focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2"
          >
            <span>Access Interactive Terminal Runtime</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Blueprint Base Anchor Line */}
      <div
        className="w-full max-w-7xl mx-auto pt-8 mt-12 border-t border-[rgba(201,147,46,0.12)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8A8A85]"
        aria-hidden="true"
      >
        <span>STATUS: PRODUCTION_VERIFIED</span>
        <span>NEXT_LAYER: INTERACTIVE_EXPERIENCE [04/05]</span>
      </div>
    </section>
  );
}

export default ProductSection;
