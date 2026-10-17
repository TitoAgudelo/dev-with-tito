import React from "react";

export interface NarrativePillar {
  id: string;
  pillarNumber: string;
  title: string;
  focusArea: string;
  description: string;
  highlights: string[];
}

const NARRATIVE_PILLARS: NarrativePillar[] = [
  {
    id: "mobile-runtime-resilience",
    pillarNumber: "01",
    title: "Mobile Platform Engineering & Deep Linking",
    focusArea: "User Activation & Lifecycle Management",
    description:
      "Architecting reliable deep linking systems, Android and iOS permission flows, and push notification onboarding pipelines that maximize user activation while gracefully handling edge-case lifecycles.",
    highlights: [
      "Deep Linking Infrastructure",
      "Push Notification Onboarding",
      "Lifecycle State Management",
      "Android/iOS Permission Flows",
    ],
  },
  {
    id: "experimentation-velocity",
    pillarNumber: "02",
    title: "Experimentation Platforms & Growth Architecture",
    focusArea: "Product Delivery & Feature Rollout",
    description:
      "Designing A/B testing infrastructure and feature-flag systems that empower product and design teams to safely validate hypotheses at high velocity without compromising production runtime stability.",
    highlights: [
      "Feature Flag Rollouts",
      "Experimentation Systems",
      "Growth Funnel Optimization",
      "Cross-Functional Delivery",
    ],
  },
  {
    id: "type-safety-quality",
    pillarNumber: "03",
    title: "Codebase Modernization & Quality Engineering",
    focusArea: "Maintainability & Developer Velocity",
    description:
      "Leading large-scale migrations from legacy JavaScript to strict TypeScript, establishing robust unit and end-to-end testing pipelines (Jest, Detox), and conducting architecture reviews to eliminate bottlenecks.",
    highlights: [
      "TypeScript Migrations",
      "Automated Testing (Jest/Detox)",
      "Architecture Reviews",
      "Developer Experience (DX)",
    ],
  },
];

export interface ArchitectureNarrativeProps {
  className?: string;
}

export function ArchitectureNarrative({
  className = "",
}: ArchitectureNarrativeProps) {
  return (
    <div
      aria-label="Architectural Narrative and Engineering Philosophy"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3 className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
            Architectural Philosophy // How Systems Are Built
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          SRC: knowledge/experience.md
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {NARRATIVE_PILLARS.map((pillar) => (
          <article
            key={pillar.id}
            className="p-6 rounded border border-[rgba(201,147,46,0.18)] bg-[#141514]/70 flex flex-col justify-between space-y-4 hover:border-[rgba(201,147,46,0.4)] transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C9932E] font-medium tracking-wider">
                  PILLAR // {pillar.pillarNumber}
                </span>
                <span className="font-mono text-[11px] text-[#8A8A85]">
                  {pillar.focusArea}
                </span>
              </div>

              <h4 className="font-display font-light text-xl sm:text-2xl text-[#F0EFED] tracking-tight leading-snug">
                {pillar.title}
              </h4>

              <p className="font-sans text-sm text-[#8A8A85] leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <ul
              className="space-y-1.5 pt-3 border-t border-[rgba(240,239,237,0.06)]"
              aria-label={`Key practices for ${pillar.title}`}
            >
              {pillar.highlights.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-[#F0EFED]/90 flex items-center gap-2"
                >
                  <span className="text-[#C9932E] select-none" aria-hidden="true">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ArchitectureNarrative;
