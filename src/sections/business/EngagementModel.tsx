import React from "react";

export interface EngagementTier {
  id: string;
  step: string;
  title: string;
  timeline: string;
  summary: string;
  details: string[];
}

const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    id: "audit-discovery",
    step: "PHASE_01 // DISCOVERY",
    title: "Architecture Evaluation & Technical Audit",
    timeline: "1 – 2 Weeks",
    summary:
      "Deep-dive technical assessment of your application, codebase health, dependency trees, and scaling bottlenecks.",
    details: [
      "Codebase and architecture health audit",
      "Performance & memory profiling report",
      "Identification of critical bottlenecks",
      "Prioritized engineering execution roadmap",
    ],
  },
  {
    id: "sprint-execution",
    step: "PHASE_02 // EXECUTION",
    title: "Sprint-Based Engineering & Delivery",
    timeline: "2 – 8+ Weeks (Flexible)",
    summary:
      "Hands-on execution embedding directly into your workflows to build core features, execute migrations, and eliminate bottlenecks.",
    details: [
      "Direct implementation of core architecture",
      "Expo migrations and deep linking setups",
      "TypeScript modernization and test suites",
      "Active collaboration with product & engineering",
    ],
  },
  {
    id: "fractional-advisory",
    step: "PHASE_03 // ADVISORY",
    title: "Fractional Leadership & Strategic Retainer",
    timeline: "Monthly Retainer (Ongoing)",
    summary:
      "Ongoing staff-level technical direction, system design reviews, team mentorship, and strategic roadmap support.",
    details: [
      "Weekly architecture and PR reviews",
      "Technical roadmap & hiring guidance",
      "Mentorship for senior & lead engineers",
      "High-bandwidth async architectural guidance",
    ],
  },
];

export interface EngagementModelProps {
  className?: string;
}

export function EngagementModel({ className = "" }: EngagementModelProps) {
  return (
    <section
      id="engagement-model"
      aria-labelledby="engagement-model-heading"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3
            id="engagement-model-heading"
            className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium"
          >
            How Engagement Works // Transparent Collaboration Model
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          PARTNERSHIP_WORKFLOW
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {ENGAGEMENT_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="p-6 sm:p-7 rounded border border-[rgba(201,147,46,0.2)] bg-[#141514]/80 flex flex-col justify-between space-y-4 hover:border-[rgba(201,147,46,0.45)] transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C9932E] font-medium tracking-wider uppercase">
                  {tier.step}
                </span>
                <span className="font-mono text-xs text-[#8A8A85]">
                  {tier.timeline}
                </span>
              </div>

              <h4 className="font-display font-light text-2xl text-[#F0EFED] tracking-tight leading-snug">
                {tier.title}
              </h4>

              <p className="font-sans text-sm text-[#8A8A85] leading-relaxed">
                {tier.summary}
              </p>
            </div>

            <ul
              className="space-y-2 pt-3 border-t border-[rgba(240,239,237,0.06)]"
              aria-label={`Inclusions for ${tier.title}`}
            >
              {tier.details.map((detail) => (
                <li
                  key={detail}
                  className="font-sans text-xs sm:text-sm text-[#F0EFED]/90 flex items-start gap-2.5"
                >
                  <span className="text-[#C9932E] select-none font-mono text-xs mt-0.5" aria-hidden="true">
                    ✔
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust & Operational Principles Banner */}
      <div className="p-5 rounded border border-[rgba(240,239,237,0.08)] bg-[#0B0C0C] grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-[#8A8A85]">
        <div className="flex items-center gap-2">
          <span className="text-[#C9932E]">DIRECT_EXECUTION:</span>
          <span>Zero junior handoffs — staff-level delivery only</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#C9932E]">COMMUNICATION:</span>
          <span>Async-first + high-bandwidth strategic syncs</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#C9932E]">GOVERNANCE:</span>
          <span>Full IP ownership, strict NDA & clean documentation</span>
        </div>
      </div>
    </section>
  );
}

export default EngagementModel;
