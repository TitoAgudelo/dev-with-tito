import React from "react";

export interface ProblemSolutionData {
  problem: string;
  challenge: string;
  investigation: string;
  solution: string;
  impact: string;
}

export interface ProblemSolutionFrameworkProps {
  data: ProblemSolutionData;
  className?: string;
}

export function ProblemSolutionFramework({
  data,
  className = "",
}: ProblemSolutionFrameworkProps) {
  const steps = [
    {
      stepNumber: "01",
      label: "Problem",
      content: data.problem,
      accentColor: "text-[#C9932E]",
      borderColor: "border-[rgba(201,147,46,0.25)]",
    },
    {
      stepNumber: "02",
      label: "Challenge",
      content: data.challenge,
      accentColor: "text-[#C9932E]",
      borderColor: "border-[rgba(201,147,46,0.25)]",
    },
    {
      stepNumber: "03",
      label: "Investigation",
      content: data.investigation,
      accentColor: "text-[#C9932E]",
      borderColor: "border-[rgba(201,147,46,0.25)]",
    },
    {
      stepNumber: "04",
      label: "Solution",
      content: data.solution,
      accentColor: "text-[#C9932E]",
      borderColor: "border-[rgba(201,147,46,0.25)]",
    },
    {
      stepNumber: "05",
      label: "Impact",
      content: data.impact,
      accentColor: "text-[#F0EFED]",
      borderColor: "border-[#C9932E]",
      isHighlight: true,
    },
  ];

  return (
    <div
      className={`space-y-4 pt-4 border-t border-[rgba(240,239,237,0.08)] ${className}`}
      aria-label="Problem, Challenge, Investigation, Solution, and Impact Breakdown"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.slice(0, 3).map((step) => (
          <div
            key={step.label}
            className={`p-4 sm:p-5 rounded border ${step.borderColor} bg-[#0B0C0C]/80 flex flex-col justify-between space-y-2.5`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-mono text-xs font-medium uppercase tracking-wider ${step.accentColor}`}>
                PHASE // {step.stepNumber}
              </span>
              <span className="font-mono text-[11px] text-[#8A8A85] uppercase">
                {step.label}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#8A8A85] leading-relaxed">
              {step.content}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.slice(3).map((step) => (
          <div
            key={step.label}
            className={`p-5 sm:p-6 rounded border ${step.borderColor} ${
              step.isHighlight
                ? "bg-[#141514] border-[rgba(201,147,46,0.45)]"
                : "bg-[#0B0C0C]/80 border-[rgba(201,147,46,0.25)]"
            } flex flex-col justify-between space-y-3`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-xs font-medium uppercase tracking-wider ${
                  step.isHighlight ? "text-[#C9932E]" : "text-[#C9932E]"
                }`}
              >
                PHASE // {step.stepNumber}
              </span>
              <span
                className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                  step.isHighlight ? "text-[#F0EFED]" : "text-[#8A8A85]"
                }`}
              >
                {step.label}
              </span>
            </div>
            <p
              className={`font-sans text-sm leading-relaxed ${
                step.isHighlight ? "text-[#F0EFED] font-medium" : "text-[#8A8A85]"
              }`}
            >
              {step.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemSolutionFramework;
