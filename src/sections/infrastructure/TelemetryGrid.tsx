import React from "react";

export interface TelemetryItem {
  id: string;
  metric: string;
  label: string;
  detail: string;
  category: string;
  highlights: string[];
}

const TELEMETRY_NODES: TelemetryItem[] = [
  {
    id: "runtime-core",
    category: "SYS_NODE // 01",
    metric: "15+ Years",
    label: "Staff Engineering Experience",
    detail:
      "Designing scalable systems, improving developer velocity, and building resilient platforms across mobile, web, cloud, and AI systems.",
    highlights: ["React Native", "Expo", "Full-Stack", "AI Systems"],
  },
  {
    id: "mobile-scale",
    category: "SYS_NODE // 02",
    metric: "Production Scale",
    label: "Mobile & Marketplace Systems",
    detail:
      "Architected customer-facing applications and high-traffic flows for marketplaces, ticketing platforms, and ecommerce.",
    highlights: ["Gametime", "Fanatics", "TaskRabbit", "Toptal"],
  },
  {
    id: "arch-leadership",
    category: "SYS_NODE // 03",
    metric: "Architecture Reviews",
    label: "Technical Leadership & Strategy",
    detail:
      "Leading technical planning, architecture evaluations, TypeScript migrations, and cross-functional engineering teams.",
    highlights: ["System Design", "Mentoring", "Performance", "Clean Architecture"],
  },
  {
    id: "modern-stack",
    category: "SYS_NODE // 04",
    metric: "End-to-End",
    label: "Full-Stack & Cloud Infrastructure",
    detail:
      "Modern application delivery leveraging Node.js, Python, Next.js, PostgreSQL, vector search, and cloud automation.",
    highlights: ["TypeScript", "Python", "Next.js", "Cloud Services"],
  },
];

export interface TelemetryGridProps {
  items?: TelemetryItem[];
  className?: string;
}

export function TelemetryGrid({
  items = TELEMETRY_NODES,
  className = "",
}: TelemetryGridProps) {
  return (
    <section
      id="telemetry"
      aria-labelledby="telemetry-heading"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <h2
          id="telemetry-heading"
          className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium flex items-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 bg-[#C9932E]" aria-hidden="true" />
          Foundation Telemetry & System Specs
        </h2>
        <span className="font-mono text-xs text-[#8A8A85]">
          SRC: knowledge/experience.md
        </span>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative p-5 sm:p-6 rounded border border-[rgba(201,147,46,0.18)] bg-[#141514]/70 flex flex-col justify-between space-y-4 hover:border-[rgba(201,147,46,0.4)] transition-colors"
          >
            {/* Blueprint Corner Accent */}
            <span
              className="absolute top-2 right-2 font-mono text-[10px] text-[#C9932E]/40 select-none"
              aria-hidden="true"
            >
              +
            </span>

            <div className="space-y-2">
              <dt className="font-mono text-[11px] text-[#C9932E] tracking-wider uppercase">
                {item.category}
              </dt>
              <dd className="space-y-1">
                <span className="block font-display font-light text-2xl sm:text-3xl text-[#F0EFED] tracking-tight">
                  {item.metric}
                </span>
                <span className="block font-sans text-xs sm:text-sm font-medium text-[#F0EFED]">
                  {item.label}
                </span>
              </dd>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#8A8A85] leading-relaxed">
              {item.detail}
            </p>

            <ul
              className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(240,239,237,0.06)]"
              aria-label={`Technologies for ${item.label}`}
            >
              {item.highlights.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-[#0B0C0C] text-[#8A8A85] border border-[rgba(240,239,237,0.08)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default TelemetryGrid;
