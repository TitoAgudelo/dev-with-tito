import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { getImpactMetrics, profile, yearsExperience } from "../content/profile";
import { siteConfig } from "../content/site";

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
