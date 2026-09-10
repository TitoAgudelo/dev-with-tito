export interface MetricData {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly qualification?: string;
}

export interface ExperienceEntry {
  readonly id: string;
  readonly period: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly role: string;
  readonly scope: string;
  readonly highlights: readonly string[];
}

export interface Principle {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

const careerStartYear = 2012;

export function getYearsExperience(referenceDate = new Date()): number {
  return referenceDate.getUTCFullYear() - careerStartYear;
}

export const profile = {
  role: "Staff Software Engineer & AI Architect",
  positioning: "Systems-minded engineering across web, mobile, platform, and pragmatic AI.",
  summary:
    "I help teams turn complex product requirements into reliable software: clear interfaces, maintainable architecture, accessible experiences, and delivery systems that hold up beyond launch.",
  shortBiography:
    "My career has moved from hands-on frontend delivery into full-stack architecture and technical leadership. I have worked across marketplaces, high-traffic commerce, event ticketing, food technology, and enterprise process software.",
  collaboration:
    "I work best in small, accountable groups where product, design, and engineering share context early. I write decisions down, surface tradeoffs before they become surprises, and keep progress visible across distributed teams.",
  leadership:
    "My leadership style is clarity over ceremony: define the outcome, make ownership explicit, reduce avoidable coupling, and give engineers enough context to make good local decisions.",
  careerStartYear,
} as const;

export function getImpactMetrics(referenceDate = new Date()): readonly MetricData[] {
  return [
    {
      id: "experience",
      value: `${getYearsExperience(referenceDate)} years`,
      label: "building production software",
      qualification: "Derived from a 2012 career start",
    },
    {
      id: "contexts",
      value: "5 contexts",
      label: "across consumer and enterprise products",
      qualification: "Publicly summarized portfolio experience",
    },
    {
      id: "surfaces",
      value: "3 surfaces",
      label: "web, mobile, and platform delivery",
      qualification: "Cross-functional product engineering",
    },
  ];
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: "lead",
    period: "2024 — Present",
    startDate: "2024",
    role: "Lead Software Engineer",
    scope: "Architecture and delivery for product platforms and AI-assisted engineering workflows.",
    highlights: [
      "Align product intent with clear technical boundaries and incremental delivery plans.",
      "Use AI as an engineering tool with reviewable inputs, outputs, and failure modes.",
    ],
  },
  {
    id: "senior",
    period: "2020 — 2024",
    startDate: "2020",
    endDate: "2024",
    role: "Senior Full-Stack Engineer",
    scope: "Web, React Native, API, and cloud delivery across consumer and enterprise products.",
    highlights: [
      "Worked across mobile-first commerce, real-time product flows, and complex operational interfaces.",
      "Partnered with product, design, and engineering peers in distributed teams.",
    ],
  },
  {
    id: "software",
    period: "2016 — 2020",
    startDate: "2016",
    endDate: "2020",
    role: "Software Engineer",
    scope: "Full-stack product development for marketplaces, commerce, and service integrations.",
    highlights: [
      "Built customer-facing workflows and the APIs and data boundaries supporting them.",
      "Learned to treat reliability and operational clarity as product requirements.",
    ],
  },
  {
    id: "frontend",
    period: "2012 — 2016",
    startDate: "2012",
    endDate: "2016",
    role: "Frontend Developer",
    scope: "Responsive web applications and the foundations of component-led UI development.",
    highlights: [
      "Developed a durable focus on semantic interfaces, responsive behavior, and user feedback.",
      "Expanded from interface implementation into broader application architecture.",
    ],
  },
];

export const principles: readonly Principle[] = [
  {
    id: "boundaries",
    title: "Make boundaries explicit",
    summary:
      "Stable contracts and clear ownership let teams change one part of a system without creating surprises elsewhere.",
  },
  {
    id: "quality",
    title: "Build quality into the path",
    summary:
      "Accessibility, performance, security, and testing work best as delivery constraints—not cleanup after launch.",
  },
  {
    id: "feedback",
    title: "Shorten the feedback loop",
    summary:
      "Small releases, observable failure modes, and direct product feedback reduce risk faster than speculative complexity.",
  },
];
