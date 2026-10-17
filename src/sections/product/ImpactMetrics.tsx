import React from "react";

export interface ImpactMetricItem {
  id: string;
  metric: string;
  title: string;
  description: string;
  tag: string;
}

const IMPACT_ITEMS: ImpactMetricItem[] = [
  {
    id: "runtime-maturity",
    metric: "15+ Years",
    title: "Continuous Production Delivery",
    description:
      "Proven track record building and scaling mobile applications, ecommerce platforms, marketplaces, enterprise systems, and AI products.",
    tag: "SYS_MATURITY",
  },
  {
    id: "scale-activation",
    metric: "High Scale",
    title: "Marketplace & Commerce Platforms",
    description:
      "Engineered mission-critical customer journeys, last-minute ticket checkout, sports merchandising, and on-demand dispatch systems.",
    tag: "SCALE_REACH",
  },
  {
    id: "release-integrity",
    metric: "Zero-Downtime",
    title: "Architecture Modernization & DX",
    description:
      "Spearheaded large-scale TypeScript migrations, automated end-to-end testing with Jest and Detox, and eliminated developer friction.",
    tag: "QUALITY_DX",
  },
  {
    id: "versatility",
    metric: "Global Impact",
    title: "Startups, Scale-Ups & Enterprise",
    description:
      "Delivered high-leverage architectural solutions across Gametime, Fanatics, TaskRabbit, Google Fiber, ConsumerAffairs, Huge, and Toptal.",
    tag: "ENTERPRISE_BREADTH",
  },
];

export interface ImpactMetricsProps {
  className?: string;
}

export function ImpactMetrics({ className = "" }: ImpactMetricsProps) {
  return (
    <section
      aria-label="High-Level Engineering & Business Impact Summary"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3 className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
            System Impact Telemetry // Cumulative Track Record
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          SRC: knowledge/experience.md
        </span>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {IMPACT_ITEMS.map((item) => (
          <div
            key={item.id}
            className="relative p-5 sm:p-6 rounded border border-[rgba(201,147,46,0.18)] bg-[#141514]/75 flex flex-col justify-between space-y-4 hover:border-[rgba(201,147,46,0.4)] transition-colors"
          >
            {/* Blueprint Corner Crosshair */}
            <span
              className="absolute top-2 right-2 font-mono text-[10px] text-[#C9932E]/40 select-none"
              aria-hidden="true"
            >
              +
            </span>

            <div className="space-y-1.5">
              <dt className="font-mono text-[10px] sm:text-[11px] text-[#C9932E] tracking-wider uppercase font-medium">
                {item.tag}
              </dt>
              <dd className="space-y-1">
                <span className="block font-display font-light text-2xl sm:text-3xl text-[#F0EFED] tracking-tight">
                  {item.metric}
                </span>
                <span className="block font-sans text-xs sm:text-sm font-medium text-[#F0EFED]">
                  {item.title}
                </span>
              </dd>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#8A8A85] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default ImpactMetrics;
