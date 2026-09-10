import type { Metadata } from "next";

import { featuredProjects } from "../content/projects";
import { getYearsExperience, profile } from "../content/profile";
import { siteConfig } from "../content/site";
import JsonLd from "./components/content/JsonLd";
import AIPlayground from "./components/experience/AIPlayground";
import CapabilityOrbit from "./components/experience/CapabilityOrbit";
import CaseStudyStories from "./components/experience/CaseStudyStories";
import ExperienceMotionProvider from "./components/experience/ExperienceMotionProvider";
import HeroExperience from "./components/experience/HeroExperience";
import ImpactMetrics, { type ExperienceMetric } from "./components/experience/ImpactMetrics";
import PhilosophyReveal from "./components/experience/PhilosophyReveal";
import TerminalCTA from "./components/experience/TerminalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "AI Systems Architect & Staff Software Engineer",
  description: "Tito Agudelo designs resilient product platforms and pragmatic AI systems across web, mobile, cloud, and applied AI.",
};

const metrics: readonly ExperienceMetric[] = [
  { value: `${getYearsExperience()}`, label: "years in production engineering", note: "Career history from 2012 to present" },
  { value: "5", label: "product environments", note: "Marketplaces, commerce, ticketing, food tech, enterprise" },
  { value: "3", label: "delivery surfaces", note: "Web, mobile, and platform systems" },
  { value: "AA", label: "accessibility baseline", note: "Quality designed into the delivery path" },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.canonicalOrigin,
          jobTitle: profile.role,
          description: profile.positioning,
          sameAs: siteConfig.socialProfiles.map((item) => item.url),
          knowsAbout: ["AI systems", "Frontend architecture", "React", "React Native", "TypeScript", "Platform engineering"],
        }}
      />
      <ExperienceMotionProvider>
        <HeroExperience />
        <ImpactMetrics metrics={metrics} />
        <CapabilityOrbit />
        <CaseStudyStories projects={featuredProjects} />
        <PhilosophyReveal />
        <AIPlayground />
        <TerminalCTA linkedInUrl={siteConfig.socialProfiles.find((item) => item.id === "linkedin")!.url} />
      </ExperienceMotionProvider>
    </>
  );
}
