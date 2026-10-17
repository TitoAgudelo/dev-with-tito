import React from "react";

export interface SkillCategory {
  id: string;
  name: string;
  categoryCode: string;
  skills: string[];
}

const TECH_CATEGORIES: SkillCategory[] = [
  {
    id: "mobile",
    name: "Mobile Engineering",
    categoryCode: "STACK_MOD // 01",
    skills: [
      "React Native",
      "Expo",
      "Deep Linking",
      "Push Notifications",
      "Mobile Architecture",
      "Performance Optimization",
    ],
  },
  {
    id: "frontend",
    name: "Frontend Systems",
    categoryCode: "STACK_MOD // 02",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    categoryCode: "STACK_MOD // 03",
    skills: [
      "Node.js",
      "Python",
      "FastAPI",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    id: "data-cloud",
    name: "Data & Cloud Infrastructure",
    categoryCode: "STACK_MOD // 04",
    skills: [
      "PostgreSQL",
      "Redis",
      "OpenSearch",
      "AWS",
      "CI/CD",
      "Serverless Architectures",
    ],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    categoryCode: "STACK_MOD // 05",
    skills: [
      "RAG Systems",
      "AI Agents",
      "OpenAI",
      "Anthropic",
      "Vector Databases",
      "Workflow Automation",
    ],
  },
  {
    id: "leadership",
    name: "Technical Leadership",
    categoryCode: "STACK_MOD // 06",
    skills: [
      "Technical Strategy",
      "System Design",
      "Architecture Reviews",
      "Product Engineering",
      "Team Mentoring",
    ],
  },
];

export interface TechnologyMapProps {
  className?: string;
}

export function TechnologyMap({ className = "" }: TechnologyMapProps) {
  return (
    <div
      aria-label="Core Technology Competency Map"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3 className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
            Core Technology Stack // Knowledge Matrix
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          SRC: knowledge/skills.md
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="p-5 sm:p-6 rounded border border-[rgba(201,147,46,0.18)] bg-[#141514]/70 space-y-4 hover:border-[rgba(201,147,46,0.4)] transition-colors"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#C9932E] tracking-wider uppercase font-medium">
                {category.categoryCode}
              </span>
              <h4 className="font-display font-light text-xl text-[#F0EFED] tracking-tight">
                {category.name}
              </h4>
            </div>

            <ul
              className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(240,239,237,0.06)]"
              aria-label={`Skills for ${category.name}`}
            >
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-[#0B0C0C] text-[#F0EFED] border border-[rgba(201,147,46,0.25)] hover:border-[#C9932E] transition-colors"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyMap;
