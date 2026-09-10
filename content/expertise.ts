export interface Capability {
  readonly id: string;
  readonly name: string;
  readonly problemStatement: string;
  readonly approach: string;
  readonly technologies: readonly string[];
  readonly relatedProjectSlugs: readonly string[];
}

export const capabilities: readonly Capability[] = [
  {
    id: "frontend-architecture",
    name: "Frontend Architecture",
    problemStatement: "Keep product interfaces coherent as teams, routes, data sources, and release pressure grow.",
    approach: "Define stable composition boundaries, server/client ownership, typed contracts, and a design system that makes the correct path easy to reuse.",
    technologies: ["Next.js", "React", "Design systems", "Server Components", "GraphQL"],
    relatedProjectSlugs: ["fanatics-peak-commerce", "taskrabbit-marketplace"],
  },
  {
    id: "react",
    name: "React",
    problemStatement: "Build interactive product surfaces without allowing local state and dependencies to become system-wide complexity.",
    approach: "Use semantic component boundaries, explicit state models, server rendering by default, and focused client islands where interaction requires them.",
    technologies: ["React", "Next.js", "React Query", "Component architecture"],
    relatedProjectSlugs: ["fanatics-peak-commerce", "taskrabbit-marketplace"],
  },
  {
    id: "react-native",
    name: "React Native",
    problemStatement: "Deliver dependable mobile product journeys across changing network, inventory, and device conditions.",
    approach: "Model user and request states explicitly, protect critical paths, and share contracts without forcing web-shaped abstractions onto mobile UX.",
    technologies: ["React Native", "Mobile architecture", "Native integration", "API contracts"],
    relatedProjectSlugs: ["gametime-mobile-ticketing"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    problemStatement: "Make changing system assumptions visible before they become production defects.",
    approach: "Use TypeScript at boundaries, discriminated states, narrow domain types, and runtime validation wherever untrusted data enters the system.",
    technologies: ["TypeScript", "Runtime validation", "API schemas", "Code generation"],
    relatedProjectSlugs: ["gametime-mobile-ticketing", "fanatics-peak-commerce"],
  },
  {
    id: "performance",
    name: "Performance",
    problemStatement: "Preserve responsiveness and comprehension when product scope, traffic, and third-party dependencies increase.",
    approach: "Budget JavaScript, CSS, fonts, images, and data; prioritize the customer task; measure production routes; and treat regressions as release failures.",
    technologies: ["Core Web Vitals", "Bundle analysis", "Caching", "Server rendering", "Profiling"],
    relatedProjectSlugs: ["fanatics-peak-commerce", "gametime-mobile-ticketing"],
  },
  {
    id: "accessibility",
    name: "Accessibility",
    problemStatement: "Ensure product journeys remain understandable and operable across input methods, assistive technology, zoom, and user preferences.",
    approach: "Start with semantic HTML, keyboard and focus behavior, resilient states, WCAG AA contrast, reflow, and manual validation alongside automation.",
    technologies: ["WCAG 2.2 AA", "Semantic HTML", "ARIA", "axe", "Screen readers"],
    relatedProjectSlugs: ["taskrabbit-marketplace"],
  },
  {
    id: "testing",
    name: "Testing",
    problemStatement: "Give teams fast evidence that critical behavior still works as architecture and product requirements evolve.",
    approach: "Test domain rules close to the code, component contracts at interaction boundaries, and a small set of valuable journeys in real browsers.",
    technologies: ["Node test runner", "Testing Library", "Playwright", "Contract tests", "CI"],
    relatedProjectSlugs: ["gametime-mobile-ticketing", "fanatics-peak-commerce", "taskrabbit-marketplace"],
  },
  {
    id: "ai-assisted-engineering",
    name: "AI-assisted engineering",
    problemStatement: "Use generative tools to increase delivery leverage without lowering reviewability, security, or engineering judgment.",
    approach: "Give agents bounded context and acceptance criteria, keep deterministic checks authoritative, and require human ownership at product and production boundaries.",
    technologies: ["Coding agents", "RAG patterns", "OpenAI APIs", "AWS Bedrock", "Workflow automation"],
    relatedProjectSlugs: [],
  },
  {
    id: "cms-content-systems",
    name: "CMS and content systems",
    problemStatement: "Let content teams publish safely without coupling every editorial change to application code or weakening performance and SEO.",
    approach: "Model structured content, validate lifecycle and references, separate editorial data from presentation, and make preview and publication rules explicit.",
    technologies: ["Headless CMS", "Structured content", "Content APIs", "Preview workflows", "SEO metadata"],
    relatedProjectSlugs: ["fanatics-peak-commerce"],
  },
];

export function getCapability(id: string): Capability | undefined {
  return capabilities.find((capability) => capability.id === id);
}
