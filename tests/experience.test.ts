import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("premium home exposes the complete seven-section narrative", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const component of [
    "HeroExperience",
    "ImpactMetrics",
    "CapabilityOrbit",
    "CaseStudyStories",
    "PhilosophyReveal",
    "AIPlayground",
    "TerminalCTA",
  ]) assert.match(page, new RegExp(`<${component}`));
});

test("scroll motion is ScrollTrigger-owned and preference-aware", async () => {
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const metrics = await readFile(new URL("../app/components/experience/ImpactMetrics.tsx", import.meta.url), "utf8");
  const stories = await readFile(new URL("../app/components/experience/CaseStudyStories.tsx", import.meta.url), "utf8");
  const philosophy = await readFile(new URL("../app/components/experience/PhilosophyReveal.tsx", import.meta.url), "utf8");

  assert.match(`${metrics}${stories}${philosophy}`, /ScrollTrigger/);
  assert.match(`${metrics}${stories}${philosophy}`, /prefers-reduced-motion/);
  assert.match(stylesheet, /#f6f5f2/i);
  assert.match(stylesheet, /#7c3aed/i);
  assert.match(stylesheet, /Space Grotesk Variable/);
});

test("AI demo readiness labels distinguish live work from future architecture", async () => {
  const playground = await readFile(new URL("../app/components/experience/AIPlayground.tsx", import.meta.url), "utf8");
  assert.match(playground, /status: "Live"/);
  assert.match(playground, /status: "Architecture ready"/);
  assert.match(playground, /href: "\/rag"/);
});
