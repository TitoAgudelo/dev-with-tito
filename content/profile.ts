export interface MetricData {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly qualification?: string;
}

export interface ExperienceEntry {
  readonly id: string;
  readonly period: string;
  /** Omitted when the start year is not yet verified. */
  readonly startDate?: string;
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

/** Single source for the public experience claim. Change it here and every surface follows. */
export const yearsExperience = "13+";

export const profile = {
  role: "Senior Software Engineer",
  positioning: "Systems-minded engineering across web, mobile, platform, and pragmatic AI.",
  summary:
    "I help teams turn complex product requirements into reliable software: clear interfaces, maintainable architecture, accessible experiences, and delivery systems that hold up beyond launch.",
  shortBiography:
    "My career has moved from hands-on frontend delivery into full-stack architecture and technical leadership. I have worked across marketplaces, high-traffic commerce, event ticketing, food technology, and enterprise process software.",
  collaboration:
    "I work best in small, accountable groups where product, design, and engineering share context early. I write decisions down, surface tradeoffs before they become surprises, and keep progress visible across distributed teams.",
  leadership:
    "My leadership style is clarity over ceremony: define the outcome, make ownership explicit, reduce avoidable coupling, and give engineers enough context to make good local decisions.",
} as const;

export function getImpactMetrics(): readonly MetricData[] {
  return [
    {
      id: "experience",
      value: `${yearsExperience} years`,
      label: "building production software",
      qualification: "Across web, mobile, and AI products",
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
    id: "gametime",
    period: "Current",
    role: "Senior Software Engineer, Gametime",
    scope: "React Native engineering for a mobile-first ticket marketplace.",
    highlights: [
      "Work across mobile engineering, product growth, application reliability, and user experience.",
    ],
  },
  {
    id: "epam",
    period: "2023 — 2025",
    startDate: "2023",
    endDate: "2025",
    role: "Lead Software Engineer, EPAM Systems",
    scope: "Technical leadership as a Lead Software Engineer.",
    highlights: [],
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
