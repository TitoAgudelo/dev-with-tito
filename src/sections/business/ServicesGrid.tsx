import React from "react";
import ServiceCard, { ServiceItem } from "./ServiceCard";

const CONSULTING_SERVICES: ServiceItem[] = [
  {
    id: "react-native-consulting",
    code: "SERVICE_01 // MOBILE_CORE",
    title: "React Native Consulting",
    description:
      "Architecture reviews, performance optimization, Expo migrations, navigation strategies, deep linking, and mobile platform improvements.",
    deliverables: [
      "Expo Migrations",
      "Performance Profiling",
      "Deep Linking Setup",
      "Lifecycle State Audits",
      "Native Bridge Optimization",
    ],
    idealFor:
      "Scale-ups and mobile engineering teams needing to eliminate bottlenecks, resolve deep linking issues, or modernize their React Native codebase.",
  },
  {
    id: "mobile-product-development",
    code: "SERVICE_02 // PRODUCT_0_TO_1",
    title: "Mobile Product Development",
    description:
      "End-to-end mobile product design and implementation using React Native and modern engineering practices.",
    deliverables: [
      "0-to-1 Mobile Architecture",
      "Cross-Platform Delivery",
      "Automated CI/CD Workflows",
      "State & Offline Storage",
      "App Store Release Pipeline",
    ],
    idealFor:
      "Startups and product companies building flagship mobile applications that demand production-grade reliability from day one.",
  },
  {
    id: "ai-product-development",
    code: "SERVICE_03 // AI_SYSTEMS",
    title: "AI Product Development",
    description:
      "RAG platforms, AI agents, automation workflows, knowledge systems, and LLM integrations.",
    deliverables: [
      "Enterprise RAG Platforms",
      "Autonomous AI Agents",
      "Vector Indexing & Embeddings",
      "Workflow Automation",
      "LLM Gateway & Guardrails",
    ],
    idealFor:
      "Businesses seeking to build proprietary AI systems, integrate conversational retrieval, or automate mission-critical knowledge workflows.",
  },
  {
    id: "full-stack-engineering",
    code: "SERVICE_04 // FULL_STACK",
    title: "Full Stack Engineering",
    description:
      "Modern web and backend development using React, Next.js, Node.js, Python, PostgreSQL, and cloud infrastructure.",
    deliverables: [
      "Next.js App Architectures",
      "API & BFF Gateways",
      "PostgreSQL & Redis Pipelines",
      "Cloud Serverless Systems",
      "GraphQL & REST APIs",
    ],
    idealFor:
      "Organizations requiring senior engineering execution to deliver high-velocity web platforms and resilient backend services.",
  },
  {
    id: "architecture-reviews",
    code: "SERVICE_05 // AUDIT_EVAL",
    title: "Architecture Reviews",
    description:
      "Evaluation of technical systems, identification of bottlenecks, and recommendations for scalable growth.",
    deliverables: [
      "Codebase Health Audit",
      "Scalability & Bottleneck Report",
      "Security & Lifecycle Review",
      "Actionable Refactor Plan",
      "Technical Due Diligence",
    ],
    idealFor:
      "CTOs, engineering directors, and investors seeking an objective technical evaluation of codebase health prior to scaling or fundraising.",
  },
  {
    id: "fractional-leadership",
    code: "SERVICE_06 // LEADERSHIP",
    title: "Fractional Technical Leadership",
    description:
      "Technical planning, architecture guidance, engineering mentoring, and product strategy support.",
    deliverables: [
      "Technical Roadmap Planning",
      "Architecture Governance",
      "Engineer Mentoring & Pairing",
      "Hiring & Delivery Standards",
      "Stakeholder Alignment",
    ],
    idealFor:
      "Early to growth-stage startups needing staff/principal technical direction, team mentoring, and product strategy without a full-time executive hire.",
  },
];

export interface ServicesGridProps {
  className?: string;
}

export function ServicesGrid({ className = "" }: ServicesGridProps) {
  return (
    <section
      id="services-catalog"
      aria-labelledby="services-catalog-heading"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3
            id="services-catalog-heading"
            className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium"
          >
            Consulting Practices & Service Catalog // 6 Core Disciplines
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          SRC: knowledge/services.md
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONSULTING_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default ServicesGrid;
