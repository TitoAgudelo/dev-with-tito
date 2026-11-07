import type { Metadata, Viewport } from "next";

import { featuredProjects } from "../content/projects";
import { yearsExperience } from "../content/profile";
import { siteConfig } from "../content/site";
import { homeMetadata } from "../lib/metadata";
import { buildHomeStructuredData } from "../lib/structured-data";
import JsonLd from "./components/content/JsonLd";
import AIPlayground from "./components/experience/AIPlayground";
import CapabilityOrbit from "./components/experience/CapabilityOrbit";
import CaseStudyStories from "./components/experience/CaseStudyStories";
import ExperienceMotionProvider from "./components/experience/ExperienceMotionProvider";
import HeroExperience from "./components/experience/HeroExperience";
import ImpactMetrics, { type ExperienceMetric } from "./components/experience/ImpactMetrics";
import PhilosophyReveal from "./components/experience/PhilosophyReveal";
import TerminalCTA from "./components/experience/TerminalCTA";

export const metadata: Metadata = homeMetadata;

export const viewport: Viewport = { themeColor: "#090a20" };

const metrics: readonly ExperienceMetric[] = [
  { value: yearsExperience, label: "years in production engineering", note: "Across web, mobile, and AI products" },
  { value: "5", label: "product environments", note: "Marketplaces, commerce, ticketing, food tech, enterprise" },
  { value: "3", label: "delivery surfaces", note: "Web, mobile, and platform systems" },
  { value: "AA", label: "accessibility baseline", note: "Quality designed into the delivery path" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeStructuredData()} />
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
