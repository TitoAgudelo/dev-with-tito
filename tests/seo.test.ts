import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { getImpactMetrics, profile, yearsExperience } from "../content/profile";
import { siteConfig } from "../content/site";
import { homeMetadata, rootMetadata } from "../lib/metadata";
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
