import React from "react";
import CaseStudyCard, { CaseStudyData } from "./CaseStudyCard";

const FEATURED_CASE_STUDIES: CaseStudyData[] = [
  {
    id: "gametime",
    company: "Gametime",
    domain: "LIVE_EVENT_TICKETING_MARKETPLACE",
    role: "Senior React Native Engineer",
    headline: "High-Velocity Mobile Ticketing & User Activation Engine",
    overview:
      "Gametime is a mobile-first marketplace focused on on-demand ticket access for sports, concerts, and live entertainment. The platform emphasizes instant discovery, transparent pricing, and last-minute mobile checkout.",
    coreAreas: [
      "Mobile Platform Engineering",
      "React Native Architecture",
      "Push Notification Onboarding",
      "Deep Linking Infrastructure",
      "Experimentation Systems",
      "Growth Initiatives",
    ],
    framework: {
      problem:
        "In live event ticketing, customer intent peaks minutes before event start. Discovery, deep link routing, and checkout must execute flawlessly without user friction or broken session context.",
      challenge:
        "Handling complex mobile OS lifecycle edge states, Android permission flows, and deep link resolution race conditions that frequently caused dropped user intent and broken onboarding funnels during high-traffic ticket drops.",
      investigation:
        "Analyzed application initialization sequences, monitored deep link resolution drop-offs across OS versions, and traced push notification enrollment telemetry to isolate where link state and user context were being lost.",
      solution:
        "Architected an end-to-end resilient deep linking infrastructure in React Native, unified push notification enrollment pipelines, and built a dynamic experimentation platform for safe, continuous feature rollouts.",
      impact:
        "Eliminated deep link routing failures, optimized user activation funnels, accelerated experiment deployment velocity, and ensured rock-solid ticket purchasing reliability under high-concurrency event spikes.",
    },
    sourceDoc: "knowledge/projets/gametime.md",
  },
  {
    id: "fanatics",
    company: "Fanatics",
    domain: "SPORTS_ECOMMERCE_SCALE",
    role: "Software Engineer",
    headline: "High-Traffic Ecommerce Runtime & Mobile Commerce Optimization",
    overview:
      "Contributed to large-scale ecommerce platforms serving sports fans worldwide, engineering high-concurrency product discovery and mobile shopping experiences.",
    coreAreas: [
      "Mobile Commerce",
      "Customer Experience",
      "Performance Optimization",
      "Product Delivery",
      "High-Volume Traffic",
    ],
    framework: {
      problem:
        "Massive traffic spikes during major championship events placed extreme pressure on product catalog navigation, merchandise customization, and checkout responsiveness.",
      challenge:
        "Maintaining sub-second mobile rendering speeds and seamless purchasing flows while dynamically loading high-res merchandise assets under unpredictable traffic surges.",
      investigation:
        "Audited client-side rendering bottlenecks, component re-render overhead, and API payload hydration latencies across high-traffic customer touchpoints.",
      solution:
        "Engineered client-side performance optimizations, streamlined catalog data fetching, and fortified mobile commerce checkout pathways for high-volume consumer traffic.",
      impact:
        "Significantly reduced mobile catalog latency, enhanced customer purchasing fluidity, and maintained reliable ecommerce uptime during major sports championship peaks.",
    },
    sourceDoc: "knowledge/experience.md",
  },
  {
    id: "taskrabbit",
    company: "TaskRabbit",
    domain: "ON_DEMAND_SERVICES_MARKETPLACE",
    role: "Senior Mobile Engineer",
    headline: "TypeScript Modernization & Testing Infrastructure for Production Scale",
    overview:
      "TaskRabbit connects thousands of customers with skilled service professionals for everyday home tasks, requiring high-reliability mobile dispatch, booking, and real-time communication.",
    coreAreas: [
      "TypeScript Migration",
      "React Native Features",
      "Testing Infrastructure (Jest & Detox)",
      "Real-Time Backend Integration",
      "Engineering Excellence",
    ],
    framework: {
      problem:
        "A large, untyped legacy JavaScript codebase caused recurring runtime regressions, increased developer friction, and prolonged release verification cycles across distributed teams.",
      challenge:
        "Migrating a live, multi-team React Native application to strict TypeScript without halting active feature development or destabilizing real-time dispatch and booking flows.",
      investigation:
        "Audited runtime error telemetry, mapped critical dependency graphs, and identified systemic gaps in automated unit, integration, and end-to-end test coverage.",
      solution:
        "Spearheaded the systematic migration of core application flows to strict TypeScript, built automated unit and end-to-end test suites using Jest and Detox, and streamlined REST/real-time service integrations.",
      impact:
        "Drastically reduced production runtime regressions, increased release deployment confidence, accelerated cross-team developer velocity, and established enduring architectural best practices.",
    },
    sourceDoc: "knowledge/projets/taskrabbit.md",
  },
  {
    id: "toptal",
    company: "Toptal",
    domain: "ENTERPRISE_SYSTEMS_&_CONSULTING",
    role: "Senior Software Engineer & Senior Consultant (2016 – Present)",
    headline: "Full-Stack Architecture Modernization & Technical Leadership",
    overview:
      "Delivered strategic software architecture, mobile engineering, and full-stack solutions for enterprise clients and scaling organizations across diverse industries (including Google Fiber, ConsumerAffairs, and Huge).",
    coreAreas: [
      "React & Next.js Architecture",
      "Technical Consulting",
      "System Modernization",
      "Full-Stack Delivery",
      "Engineering Leadership",
    ],
    framework: {
      problem:
        "Enterprise organizations and scaling startups faced stalled delivery timelines, accumulated frontend debt, and architectural bottlenecks that prevented product growth.",
      challenge:
        "Rapidly onboarding into unfamiliar, complex codebases, diagnosing systemic bottlenecks, and executing high-leverage architectural modernizations under aggressive business deadlines.",
      investigation:
        "Conducted deep technical audits, code quality evaluations, and performance profiling across diverse web, mobile, and backend architectures.",
      solution:
        "Engineered scalable component-based frontend architectures, modernized legacy applications (migrating to Next.js/React and TypeScript), and provided hands-on architecture guidance and mentoring.",
      impact:
        "Modernized mission-critical customer-facing applications, accelerated product delivery cycles, elevated engineering quality standards, and delivered scalable solutions across enterprise engagements.",
    },
    sourceDoc: "knowledge/projets/toptal.md",
  },
];

export interface CaseStudyGalleryProps {
  className?: string;
}

export function CaseStudyGallery({ className = "" }: CaseStudyGalleryProps) {
  return (
    <section
      aria-label="Production Case Studies Gallery"
      className={`space-y-8 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3 className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
            Production Case Studies // Architectural Breakdown
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          4_FEATURED_SYSTEMS
        </span>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {FEATURED_CASE_STUDIES.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  );
}

export default CaseStudyGallery;
