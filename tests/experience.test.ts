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

test("hero Cloud Field is isolated, progressive, and motion preference aware", async () => {
  const hero = await readFile(new URL("../app/components/experience/HeroExperience.tsx", import.meta.url), "utf8");
  const background = await readFile(new URL("../app/components/experience/HeroBackground.tsx", import.meta.url), "utf8");
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(hero, /dynamic\(\(\) => import\("\.\/HeroBackground"\)/);
  assert.match(hero, /ssr: false/);
  assert.match(background, /prefers-reduced-motion: reduce/);
  assert.match(background, /IntersectionObserver/);
  assert.match(background, /visibilitychange/);
  assert.match(background, /Math\.min\(window\.devicePixelRatio \|\| 1, mobile \? 1 : 1\.5\)/);
  assert.match(background, /cancelAnimationFrame/);
  assert.match(background, /deleteBuffer/);
  assert.match(background, /deleteProgram/);
  assert.match(background, /inverseSmoothstep/);
  assert.match(background, /color \+= vec3\(0\.78, 0\.83, 1\.0\) \* starField/);
  assert.doesNotMatch(background, /smoothstep\(ridge \+ 0\.003, ridge - 0\.001/);
  assert.doesNotMatch(background, /smoothstep\(0\.00[3-9], 0\.0,/);
  assert.doesNotMatch(background, /smoothstep\(0\.8, 0\.55,/);
  assert.doesNotMatch(background, /color -= .*starField/);
  assert.doesNotMatch(hero, /experience-grid/);
  assert.doesNotMatch(stylesheet, /\.experience-grid\s*\{/);
  assert.doesNotMatch(stylesheet, /\.experience-hero::after/);
  assert.match(stylesheet, /\.hero-background__fallback/);
  assert.match(stylesheet, /data-ready="true"\] \.hero-background__fallback \{ opacity: 0; \}/);
  assert.match(stylesheet, /pointer-events: none/);
});

test("AI demo readiness labels distinguish live work from future architecture", async () => {
  const playground = await readFile(new URL("../app/components/experience/AIPlayground.tsx", import.meta.url), "utf8");
  assert.match(playground, /status: "Live"/);
  assert.match(playground, /status: "Architecture ready"/);
  assert.match(playground, /href: "\/ask"/);
});

test("terminal CTA embeds the contact form without hijacking keyboard submission", async () => {
  const terminal = await readFile(
    new URL("../app/components/experience/TerminalCTA.tsx", import.meta.url),
    "utf8",
  );

  assert.match(terminal, /<ContactForm appearance="terminal" idPrefix="home-contact"/);
  assert.match(terminal, />Connect on LinkedIn/);
  assert.doesNotMatch(terminal, /window\.open|openLinkedIn|Press Enter|hire-tito/);
  assert.doesNotMatch(terminal, /onKeyDown|onSubmit/);
});
