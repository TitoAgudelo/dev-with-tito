import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { heroCopy } from "../content/hero";
import { getImpactMetrics, profile, yearsExperience } from "../content/profile";
import { siteConfig } from "../content/site";
import { createPageMetadata, homeMetadata, rootMetadata } from "../lib/metadata";
import { buildHomeStructuredData } from "../lib/structured-data";

const origin = "https://tito.website";

async function source(path: string): Promise<string> {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("the canonical origin is the live domain, everywhere crawlers read it", () => {
  assert.equal(siteConfig.canonicalOrigin, origin);
  assert.equal(robots().sitemap, `${origin}/sitemap.xml`);
  assert.ok(sitemap().every(({ url }) => url.startsWith(origin)));
});

test("the public site name is the person, not the retired brand", async () => {
  assert.equal(siteConfig.siteName, "Tito Agudelo");
  assert.doesNotMatch(await source("../app/manifest.ts"), /Dev With Tito/);
});

test("experience is one fixed value, not computed from a start year", async () => {
  assert.equal(yearsExperience, "13+");
  assert.ok(getImpactMetrics().some(({ value }) => value === `${yearsExperience} years`));
  for (const path of ["../content/profile.ts", "../app/page.tsx", "../lib/rag/retriever.ts"]) {
    assert.doesNotMatch(await source(path), /getYearsExperience|careerStartYear/);
  }
});

test("the public title is Senior, never Staff or AI Architect", async () => {
  assert.equal(profile.role, "Senior Software Engineer");
  for (const path of [
    "../content/profile.ts",
    "../lib/rag/retriever.ts",
    "../app/components/ask-tito/SuggestedQuestions.tsx",
    "../AGENTS.md",
  ]) {
    assert.doesNotMatch(await source(path), /\bStaff\b|AI Architect/);
  }
});

test("root metadata carries the name-first title and a crawl-friendly robots policy", () => {
  assert.equal(rootMetadata.metadataBase?.toString(), `${origin}/`);
  assert.deepEqual(rootMetadata.title, {
    default: "Tito Agudelo — Senior Software Engineer | React Native, AI & Solutions Architecture",
    template: "%s | Tito Agudelo",
  });
  assert.equal(typeof rootMetadata.description, "string");
  const length = String(rootMetadata.description).length;
  assert.ok(length >= 150 && length <= 160, `description is ${length} characters`);
  assert.match(JSON.stringify(rootMetadata.robots), /"max-image-preview":"large"/);
  assert.equal(rootMetadata.applicationName, "Tito Agudelo");
  assert.equal(rootMetadata.creator, "Tito Agudelo");
});

test("homepage-only fields never leak to child routes through the root layout", async () => {
  assert.equal(rootMetadata.alternates, undefined);
  assert.equal(homeMetadata.alternates?.canonical, "/");
  assert.equal(homeMetadata.title, undefined, "a page title would bypass the layout default");
  assert.match(JSON.stringify(homeMetadata.openGraph), /"type":"profile"/);
  assert.match(JSON.stringify(homeMetadata.openGraph), /"firstName":"Tito"/);
  assert.match(await source("../app/page.tsx"), /metadata: Metadata = homeMetadata/);
});

test("the homepage graph links WebSite, Person, ProfilePage and Service by @id", () => {
  const graph = buildHomeStructuredData()["@graph"];
  const byType = new Map(graph.map((node) => [node["@type"], node]));
  const personId = `${origin}/#person`;

  assert.deepEqual([...byType.keys()].sort(), ["Person", "ProfilePage", "Service", "WebSite"]);
  assert.deepEqual(byType.get("ProfilePage")?.mainEntity, { "@id": personId });
  assert.deepEqual(byType.get("Service")?.provider, { "@id": personId });

  const person = byType.get("Person");
  assert.equal(person?.["@id"], personId);
  assert.equal(person?.jobTitle, "Senior Software Engineer");
  assert.deepEqual(person?.worksFor, { "@type": "Organization", name: "Gametime" });
  assert.equal(person?.image, `${origin}/tito.jpg`);
});

test("sameAs only lists real URLs and the graph survives a JSON round trip", () => {
  const data = buildHomeStructuredData();
  const person = data["@graph"].find((node) => node["@type"] === "Person");
  assert.ok(Array.isArray(person?.sameAs));
  for (const url of person.sameAs) assert.match(String(url), /^https:\/\/(github\.com|www\.linkedin\.com)\//);
  assert.deepEqual(JSON.parse(JSON.stringify(data)), data);
});

test("the homepage renders the graph instead of a standalone Person", async () => {
  const page = await source("../app/page.tsx");
  assert.match(page, /buildHomeStructuredData/);
  assert.doesNotMatch(page, /"@type": "Person"/);
});

test("hero copy is specific, honest about Fanatics, and complete", () => {
  assert.equal(heroCopy.eyebrow, "Tito Agudelo · Senior Software Engineer · Bogotá / Remote");
  assert.deepEqual(heroCopy.headline, ["Mobile & AI Products.", "Built To Scale."]);
  assert.match(heroCopy.lead, new RegExp(`^Senior full-stack engineer with ${yearsExperience.replace("+", "\\+")} years`));
  assert.match(heroCopy.lead, /mobile and web products with React Native/);
  assert.deepEqual(heroCopy.roles, [
    "Software Engineer",
    "AI Engineer",
    "Solutions Architect",
    "Mobile Architect",
    "React Native Consultant",
  ]);
  assert.deepEqual(heroCopy.shippedAt, ["Gametime", "Fanatics", "TaskRabbit", "Toptal"]);
  assert.equal(heroCopy.primaryCta.href, "#contact");
});

test("the hero h1 wraps the eyebrow and every role stays in server HTML", async () => {
  const hero = await source("../app/components/experience/HeroExperience.tsx");
  const h1 = hero.slice(hero.indexOf("<h1"), hero.indexOf("</h1>"));
  assert.match(h1, /heroCopy\.eyebrow/);
  assert.match(h1, /heroCopy\.headline/);
  assert.match(hero, /heroCopy\.roles\.map/);
  assert.doesNotMatch(hero.slice(hero.indexOf("<ul"), hero.indexOf("</ul>")), /aria-hidden/);
});

test("the hero entrance is CSS-driven so text paints before hydration", async () => {
  const hero = await source("../app/components/experience/HeroExperience.tsx");
  const stylesheet = await source("../app/globals.css");
  assert.doesNotMatch(hero, /framer-motion/);
  assert.match(stylesheet, /@keyframes hero-rise/);
  assert.match(stylesheet, /\.hero-reveal--kicker[^}]*600ms/);
  assert.match(stylesheet, /\.hero-reveal--line-1[^}]*900ms[^}]*80ms/);
  assert.match(stylesheet, /\.hero-reveal--line-2[^}]*900ms[^}]*160ms/);
  assert.match(stylesheet, /cubic-bezier\(0\.22, 1, 0\.36, 1\)/);
  assert.match(stylesheet, /prefers-reduced-motion: reduce\) \{\s*\.hero-reveal \{\s*animation: none/);
});

test("section headings carry honest keywords", async () => {
  const stories = await source("../app/components/experience/CaseStudyStories.tsx");
  const terminal = await source("../app/components/experience/TerminalCTA.tsx");
  assert.match(await source("../app/components/experience/CapabilityOrbit.tsx"), /<h2[^>]*>Solutions architecture, mapped\.<\/h2>/);
  assert.match(stories, /<h2[^>]*>Mobile and web work at Gametime, Fanatics, TaskRabbit\.<\/h2>/);
  assert.doesNotMatch(stories, /<h2[^>]*>[^<]*React Native[^<]*Fanatics/);
  assert.match(await source("../app/components/experience/AIPlayground.tsx"), /AI prototypes with boundaries\./);
  assert.match(terminal, /<h2[^>]*>React Native and AI consulting\.<\/h2>/);
  assert.match(terminal, /fractional technical leadership/i);
});

test("the footer states identity and marks owned profiles with rel=me", async () => {
  const footer = await source("../app/components/shell/SiteFooter.tsx");
  assert.match(footer, /owner\.role/);
  assert.match(footer, /siteConfig\.location/);
  assert.match(footer, /rel="me noreferrer"/);
});

test("the logo accessible name contains its visible text", async () => {
  assert.doesNotMatch(await source("../app/components/shell/SiteLogo.tsx"), /aria-label=/);
});

test("the Open Graph image shows the current identity on the purple palette", async () => {
  const image = await source("../app/opengraph-image.tsx");
  assert.match(image, /Senior Software Engineer · React Native · AI · Solutions Architecture/);
  assert.match(image, /#7c3aed/i);
  assert.doesNotMatch(image, /Lead Software Engineer|DEV WITH TITO|https?:\/\//);
});

test("the sitemap reports the date of this content update", () => {
  assert.ok(sitemap().every(({ lastModified }) => new Date(lastModified as Date).getTime() >= Date.UTC(2026, 10, 6)));
});

test("DESIGN.md records purple as the single accent", async () => {
  const design = await source("../DESIGN.md");
  assert.match(design, /Single accent \| `#7C3AED`/);
  assert.doesNotMatch(design, /C9932E|bronze/i);
});

test("subpages keep the OG image and do not repeat the name in their title", async () => {
  const metadata = createPageMetadata({ title: "Example", description: "Example description", path: "/example" });
  assert.match(JSON.stringify(metadata.openGraph), /"url":"\/opengraph-image"/);
  assert.match(JSON.stringify(metadata.twitter), /\/opengraph-image/);
  assert.doesNotMatch(await source("../app/about/page.tsx"), /title: "[^"]*Tito Agudelo/);
});
