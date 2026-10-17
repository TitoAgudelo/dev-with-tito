import React from "react";
import ProblemSolutionFramework, { ProblemSolutionData } from "./ProblemSolutionFramework";

export interface CaseStudyData {
  id: string;
  company: string;
  domain: string;
  role: string;
  headline: string;
  overview: string;
  coreAreas: string[];
  framework: ProblemSolutionData;
  sourceDoc: string;
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudyData;
  className?: string;
}

export function CaseStudyCard({
  caseStudy,
  className = "",
}: CaseStudyCardProps) {
  return (
    <article
      id={`case-study-${caseStudy.id}`}
      aria-labelledby={`heading-${caseStudy.id}`}
      className={`relative p-6 sm:p-8 lg:p-10 rounded border border-[rgba(201,147,46,0.22)] bg-[#141514]/85 space-y-6 hover:border-[rgba(201,147,46,0.45)] transition-colors ${className}`}
    >
      {/* Top Blueprint Coordinates & Source */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(201,147,46,0.18)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <span className="font-mono text-xs text-[#C9932E] tracking-wider uppercase font-medium">
            CASE_STUDY // {caseStudy.company}
          </span>
          <span className="text-[#8A8A85]/50 select-none" aria-hidden="true">
            •
          </span>
          <span className="font-mono text-[11px] text-[#8A8A85]">
            {caseStudy.domain}
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#8A8A85]">
          SRC: {caseStudy.sourceDoc}
        </span>
      </div>

      {/* Header and Strategic Statement */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3
            id={`heading-${caseStudy.id}`}
            className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-[#F0EFED] tracking-tight"
          >
            {caseStudy.headline}
          </h3>
        </div>

        <p className="font-mono text-xs sm:text-sm text-[#C9932E]/95 font-medium">
          Role: {caseStudy.role}
        </p>

        <p className="font-sans text-sm sm:text-base text-[#8A8A85] leading-relaxed max-w-4xl font-normal">
          {caseStudy.overview}
        </p>
      </div>

      {/* Focus Areas Pills */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] text-[#8A8A85] uppercase tracking-wider">
          Architectural Focus Areas:
        </span>
        <ul
          className="flex flex-wrap gap-2"
          aria-label={`Focus areas for ${caseStudy.company}`}
        >
          {caseStudy.coreAreas.map((area) => (
            <li
              key={area}
              className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#0B0C0C] text-[#F0EFED] border border-[rgba(201,147,46,0.22)]"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>

      {/* 5-Step Problem Solution Framework */}
      <ProblemSolutionFramework data={caseStudy.framework} />
    </article>
  );
}

export default CaseStudyCard;
