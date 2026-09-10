export type ProjectLifecycle = "draft" | "review" | "published" | "archived";

export interface ProjectDecision {
  readonly title: string;
  readonly context: string;
  readonly decision: string;
  readonly tradeoff: string;
}

export interface ProjectOutcome {
  readonly label: string;
  readonly detail: string;
  readonly qualification: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly organization: string;
  readonly summary: string;
  readonly result: string;
  readonly role: string;
  readonly timeframe: string;
  readonly platforms: readonly string[];
  readonly technologies: readonly string[];
  readonly capabilityIds: readonly string[];
  readonly challenge: string;
  readonly constraints: readonly string[];
  readonly approach: readonly string[];
  readonly decisions: readonly ProjectDecision[];
  readonly implementation: readonly string[];
  readonly outcomes: readonly ProjectOutcome[];
  readonly lessons: readonly string[];
  readonly confidentialityNote: string;
  readonly featured: boolean;
  readonly lifecycle: ProjectLifecycle;
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
}

const confidentialityNote =
  "This case study is intentionally limited to role-level patterns and publicly shareable context. It excludes internal metrics, customer data, proprietary algorithms, and confidential implementation detail.";

export const projects: readonly Project[] = [
  {
    slug: "gametime-mobile-ticketing",
    title: "A mobile-first path through time-sensitive ticketing",
    organization: "Gametime",
    summary:
      "Product engineering for a React Native experience where inventory changes quickly and customers need confidence from discovery through checkout.",
    result:
      "Contributed to a clearer, more resilient mobile purchase experience for last-minute event discovery and checkout.",
    role: "Senior product engineer",
    timeframe: "Public portfolio summary",
    platforms: ["Mobile", "Backend", "Cloud"],
    technologies: ["React Native", "TypeScript", "Node.js", "Python", "AWS"],
    capabilityIds: ["react-native", "performance", "testing", "typescript"],
    challenge:
      "A time-sensitive marketplace has to present changing inventory, pricing, and purchase state without making the customer carry the system's complexity.",
    constraints: [
      "Inventory and price state can change while a customer is deciding.",
      "Mobile networks and device conditions make partial failure a normal operating condition.",
      "Purchase feedback must be immediate and unambiguous without exposing internal systems.",
    ],
    approach: [
      "Keep the mobile experience centered on the customer's next decision, with explicit loading, unavailable, retry, and confirmed states.",
      "Separate presentation state from service boundaries so individual flows can evolve without coupling the entire application.",
      "Treat instrumentation and failure recovery as part of the feature contract rather than post-release diagnostics.",
    ],
    decisions: [
      {
        title: "Model purchase states explicitly",
        context: "Optimistic interfaces can become misleading when inventory changes quickly.",
        decision: "Represent transitional and terminal states directly in the UI and API contracts.",
        tradeoff: "More state modelling up front in exchange for clearer recovery and fewer ambiguous outcomes.",
      },
      {
        title: "Optimize the critical path first",
        context: "Mobile checkout performance matters more than decorative work outside the conversion path.",
        decision: "Prioritize discovery-to-purchase responsiveness and defer nonessential client work.",
        tradeoff: "A stricter feature budget, with a more dependable core journey.",
      },
    ],
    implementation: [
      "Component boundaries aligned to product states rather than screen-shaped abstractions.",
      "Typed service contracts and defensive handling for stale or unavailable inventory.",
      "Focused validation around high-value purchase and recovery paths.",
    ],
    outcomes: [
      {
        label: "Customer clarity",
        detail: "Purchase state and recovery paths remained understandable during time-sensitive interactions.",
        qualification: "Qualitative contribution; internal conversion metrics are not disclosed.",
      },
      {
        label: "Delivery resilience",
        detail: "The product flow treated partial failure as a designed state instead of an exceptional blank screen.",
        qualification: "Architecture-level outcome within a broader team effort.",
      },
    ],
    lessons: [
      "In a changing marketplace, trustworthy state communication is as important as raw request speed.",
      "The best mobile abstractions follow user decisions and failure boundaries, not visual repetition alone.",
    ],
    confidentialityNote,
    featured: true,
    lifecycle: "published",
    seo: {
      title: "Gametime Mobile Ticketing Case Study",
      description:
        "An NDA-safe case study on React Native architecture, purchase-state clarity, performance, and resilient mobile ticketing delivery.",
    },
  },
  {
    slug: "fanatics-peak-commerce",
    title: "Frontend resilience for peak-demand sports commerce",
    organization: "Fanatics",
    summary:
      "Engineering across high-traffic commerce experiences where product discovery, inventory, and checkout must remain useful during demand spikes.",
    result:
      "Supported dependable customer-facing commerce flows across major sports properties and high-attention moments.",
    role: "Full-stack product engineer",
    timeframe: "Public portfolio summary",
    platforms: ["Web", "Backend", "Platform"],
    technologies: ["React", "TypeScript", "Node.js", "Microservices", "AWS", "Kubernetes"],
    capabilityIds: ["frontend-architecture", "react", "performance", "testing"],
    challenge:
      "Demand can rise sharply around games and releases, putting the most valuable customer paths under the greatest technical pressure.",
    constraints: [
      "Traffic shape changes quickly and unevenly across discovery and checkout.",
      "Inventory and personalization depend on multiple service boundaries.",
      "Customer experience must degrade predictably when a dependency is slow or unavailable.",
    ],
    approach: [
      "Protect the primary commerce journey with clear data ownership, bounded client work, and explicit dependency states.",
      "Use performance budgets and observable service behavior to make peak-readiness a continuous engineering concern.",
      "Coordinate frontend and service changes through versioned contracts and focused release validation.",
    ],
    decisions: [
      {
        title: "Keep failure local",
        context: "A slow secondary dependency should not erase the entire commerce experience.",
        decision: "Design independent loading and recovery boundaries around noncritical modules.",
        tradeoff: "Additional component states in exchange for a more resilient customer journey.",
      },
      {
        title: "Budget work on the conversion path",
        context: "Every client dependency competes with product content and checkout responsiveness.",
        decision: "Evaluate JavaScript and data cost against its value to the customer task.",
        tradeoff: "Fewer convenience abstractions and more deliberate dependency review.",
      },
    ],
    implementation: [
      "React interfaces organized around independently recoverable product regions.",
      "Service integration patterns that made loading, stale, unavailable, and success states visible.",
      "Release checks focused on high-demand routes and critical commerce behavior.",
    ],
    outcomes: [
      {
        label: "Peak-path resilience",
        detail: "Critical customer flows were treated as isolated, observable paths rather than one all-or-nothing page.",
        qualification: "Qualitative contribution; traffic and commercial metrics remain confidential.",
      },
      {
        label: "Cross-layer clarity",
        detail: "Frontend behavior and service expectations were aligned through explicit contracts and states.",
        qualification: "Delivered as part of a cross-functional engineering organization.",
      },
    ],
    lessons: [
      "Peak readiness is a property of everyday architecture and release discipline, not a one-time load-test event.",
      "Graceful degradation starts with deciding which customer task must remain available.",
    ],
    confidentialityNote,
    featured: true,
    lifecycle: "published",
    seo: {
      title: "Fanatics Peak Commerce Case Study",
      description:
        "An NDA-safe case study on React commerce architecture, performance budgets, service boundaries, and peak-demand resilience.",
    },
  },
  {
    slug: "taskrabbit-marketplace",
    title: "Clear product boundaries in a two-sided marketplace",
    organization: "TaskRabbit",
    summary:
      "Marketplace product work spanning customer and provider workflows, real-time communication, and payment-adjacent integration boundaries.",
    result:
      "Contributed to scalable marketplace experiences that connected customers with local service providers.",
    role: "Full-stack product engineer",
    timeframe: "Public portfolio summary",
    platforms: ["Web", "Backend", "Cloud"],
    technologies: ["React", "Ruby on Rails", "PostgreSQL", "Redis", "AWS"],
    capabilityIds: ["frontend-architecture", "react", "accessibility", "testing"],
    challenge:
      "A two-sided marketplace has to keep distinct customer, provider, messaging, and transaction concerns coherent without turning every product change into a system-wide change.",
    constraints: [
      "Multiple user roles have different goals and state transitions.",
      "Real-time communication and transaction boundaries require trustworthy feedback.",
      "Existing platform contracts must evolve without interrupting active workflows.",
    ],
    approach: [
      "Organize interface and service boundaries around marketplace responsibilities and user intent.",
      "Make asynchronous states and role-specific actions explicit in both interaction design and implementation.",
      "Deliver changes incrementally so new behavior can coexist with established workflows.",
    ],
    decisions: [
      {
        title: "Prefer domain boundaries over page boundaries",
        context: "The same marketplace responsibilities appear across multiple screens and user journeys.",
        decision: "Group behavior around stable domain responsibilities rather than route-specific duplication.",
        tradeoff: "More deliberate modelling with less accidental coupling as journeys evolve.",
      },
      {
        title: "Expose asynchronous state",
        context: "Messaging and transaction-adjacent actions do not complete instantaneously.",
        decision: "Represent pending, confirmed, unavailable, and retryable outcomes in the product contract.",
        tradeoff: "Additional states to test in exchange for user trust and operational clarity.",
      },
    ],
    implementation: [
      "React product surfaces integrated with established Rails and data-service boundaries.",
      "Explicit handling for asynchronous marketplace communication and transactions.",
      "Incremental delivery designed to preserve established user paths.",
    ],
    outcomes: [
      {
        label: "Maintainable product change",
        detail: "Marketplace responsibilities could evolve with clearer separation between user journeys and underlying services.",
        qualification: "Architectural contribution within a mature team and platform.",
      },
      {
        label: "Trustworthy feedback",
        detail: "Asynchronous actions were represented as understandable product states.",
        qualification: "Qualitative outcome; internal marketplace metrics are not disclosed.",
      },
    ],
    lessons: [
      "Two-sided products become easier to evolve when user roles and domain responsibilities are explicit.",
      "Reliable feedback is a cross-layer contract, not a frontend-only detail.",
    ],
    confidentialityNote,
    featured: true,
    lifecycle: "published",
    seo: {
      title: "TaskRabbit Marketplace Case Study",
      description:
        "An NDA-safe case study on React marketplace architecture, domain boundaries, asynchronous states, and incremental delivery.",
    },
  },
];

export const additionalWork = [
  {
    id: "food-is-good",
    organization: "Food is Good",
    title: "Startup product delivery from MVP foundations",
    summary:
      "Full-stack work across ordering, restaurant integrations, and customer-facing workflows in a small, fast-moving product team.",
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
  },
  {
    id: "igrafx",
    organization: "iGrafx",
    title: "Complex interfaces for enterprise process work",
    summary:
      "Interface and integration work for process modelling, analytics dashboards, and enterprise operational workflows.",
    technologies: ["React", "TypeScript", "Java", ".NET"],
  },
] as const;

export const publishedProjects = projects.filter((project) => project.lifecycle === "published");
export const featuredProjects = publishedProjects.filter((project) => project.featured);

export function getPublishedProject(slug: string): Project | undefined {
  return publishedProjects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const index = publishedProjects.findIndex((project) => project.slug === slug);
  if (index < 0 || publishedProjects.length < 2) return undefined;
  return publishedProjects[(index + 1) % publishedProjects.length];
}
