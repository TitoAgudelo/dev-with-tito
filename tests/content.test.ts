import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { capabilities } from "../content/expertise";
import { getYearsExperience } from "../content/profile";
import { publishedProjects } from "../content/projects";
import sitemap from "../app/sitemap";
import { POST as submitContact } from "../app/api/send/route";

const requiredCapabilities = [
  "Frontend Architecture",
  "React",
  "React Native",
  "TypeScript",
  "Performance",
  "Accessibility",
  "Testing",
  "AI-assisted engineering",
  "CMS and content systems",
] as const;

test("Phase 2 exposes every requested capability with unique stable IDs", () => {
  assert.deepEqual(capabilities.map(({ name }) => name), requiredCapabilities);
  assert.equal(new Set(capabilities.map(({ id }) => id)).size, capabilities.length);
  for (const capability of capabilities) {
    assert.ok(capability.problemStatement.length > 30);
    assert.ok(capability.approach.length > 40);
    assert.ok(capability.technologies.length >= 3);
  }
});

test("published case studies satisfy the NDA-safe structural gate", () => {
  const slugs = new Set(publishedProjects.map(({ slug }) => slug));
  assert.equal(slugs.size, publishedProjects.length);
  assert.ok(publishedProjects.length >= 3);

  for (const project of publishedProjects) {
    assert.equal(project.lifecycle, "published");
    assert.ok(project.challenge.length > 50);
    assert.ok(project.constraints.length >= 2);
    assert.ok(project.decisions.length >= 2);
    assert.ok(project.outcomes.length >= 1);
    assert.match(project.confidentialityNote, /confidential/i);
    assert.ok(project.seo.title.length > 10);
    assert.ok(project.seo.description.length > 50);
  }

  for (const capability of capabilities) {
    for (const slug of capability.relatedProjectSlugs) assert.ok(slugs.has(slug));
  }
});

test("experience length is derived from the authoritative career start", () => {
  assert.equal(getYearsExperience(new Date("2026-09-09T00:00:00Z")), 14);
});

test("sitemap contains canonical content routes and excludes the contact fragment", () => {
  const urls = sitemap().map(({ url }) => url);
  for (const path of ["", "/work", "/expertise", "/about", "/rag"]) {
    assert.ok(urls.includes(`https://devwithtito.com${path}`));
  }
  for (const project of publishedProjects) {
    assert.ok(urls.includes(`https://devwithtito.com/work/${project.slug}`));
  }
  assert.ok(urls.every((url) => !url.includes("#contact") && !url.endsWith("/contact")));
});

test("all Phase 2 route entry points exist", async () => {
  for (const path of [
    "../app/page.tsx",
    "../app/work/page.tsx",
    "../app/work/[slug]/page.tsx",
    "../app/expertise/page.tsx",
    "../app/about/page.tsx",
    "../app/contact/page.tsx",
  ]) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.ok(source.length > 0);
  }
});

test("contact endpoint rejects malformed and invalid payloads before provider access", async () => {
  const malformed = await submitContact(new Request("http://localhost/api/send", {
    method: "POST",
    body: "{",
    headers: { "content-type": "application/json" },
  }));
  assert.equal(malformed.status, 400);

  const invalid = await submitContact(new Request("http://localhost/api/send", {
    method: "POST",
    body: JSON.stringify({ email: "not-an-email", subject: "", message: "" }),
    headers: { "content-type": "application/json" },
  }));
  assert.equal(invalid.status, 400);
});
