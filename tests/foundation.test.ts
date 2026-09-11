import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { publishedNavigation, siteConfig } from "../content/site";

const requiredTokens = [
  "--color-canvas",
  "--color-surface-1",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-text-muted",
  "--color-accent",
  "--color-focus",
  "--font-family-sans",
  "--font-family-mono",
  "--font-size-display",
  "--font-size-body",
  "--space-1",
  "--space-24",
  "--radius-sm",
  "--radius-xl",
  "--shadow-1",
  "--layer-sticky",
  "--control-height-md",
  "--duration-base",
] as const;

test("the design-system stylesheet exposes the required foundation tokens", async () => {
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  for (const token of requiredTokens) {
    assert.match(stylesheet, new RegExp(`${token.replaceAll("-", "\\-")}:`));
  }

  assert.match(stylesheet, /prefers-reduced-motion:\s*reduce/);
  assert.match(stylesheet, /prefers-contrast:\s*more/);
  assert.match(stylesheet, /forced-colors:\s*active/);
});

test("navigation follows the documented order and publishes only available routes", () => {
  assert.deepEqual(
    siteConfig.navigation.map(({ label, href }) => [label, href]),
    [
      ["Work", "/work"],
      ["Expertise", "/expertise"],
      ["About", "/about"],
      ["Ask Tito", "/ask"],
      ["Contact", "/#contact"],
      ["Privacy", "/privacy"],
    ],
  );

  assert.deepEqual(
    publishedNavigation.map(({ id }) => id),
    ["work", "expertise", "about", "ask", "contact"],
  );
  assert.equal(new Set(siteConfig.navigation.map(({ id }) => id)).size, siteConfig.navigation.length);
});
