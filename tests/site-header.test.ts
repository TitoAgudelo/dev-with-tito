import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("every homepage section declares the nav theme of its real background", async () => {
  const expected: readonly (readonly [string, string])[] = [
    ["HeroExperience", "dark"],
    ["ImpactMetrics", "dark"],
    ["CapabilityOrbit", "light"],
    ["CaseStudyStories", "dark"],
    ["PhilosophyReveal", "light"],
    ["AIPlayground", "light"],
    ["TerminalCTA", "dark"],
  ];
  for (const [component, theme] of expected) {
    const source = await read(`app/components/experience/${component}.tsx`);
    assert.match(source, new RegExp(`<section[^>]*data-nav-theme="${theme}"`), component);
  }
  assert.match(await read("app/components/shell/SiteFooter.tsx"), /data-nav-theme="light"/);
});

test("sections with a matching header link say so", async () => {
  assert.match(await read("app/components/experience/CaseStudyStories.tsx"), /data-nav-section="work"/);
  assert.match(await read("app/components/experience/TerminalCTA.tsx"), /data-nav-section="contact"/);
});

test("scroll state reaches the header without React state", async () => {
  const controller = await read("app/components/shell/NavStateController.tsx");

  assert.match(controller, /IntersectionObserver/);
  assert.match(controller, /dataset\.scrolled/);
  assert.match(controller, /dataset\.theme/);
  assert.doesNotMatch(controller, /useState/);
  assert.doesNotMatch(controller, /addEventListener\("scroll"/);
});

test("the sentinel reads the newest queued entry, not the oldest", async () => {
  const controller = await read("app/components/shell/NavStateController.tsx");

  assert.doesNotMatch(controller, /\(\[entry\]\)/);
  assert.match(controller, /entries\.at\(-1\)/);
});

test("the mobile menu closes with the route and hands focus back", async () => {
  const menu = await read("app/components/shell/MobileNav.tsx");

  assert.match(menu, /usePathname/);
  assert.match(menu, /openedAt === pathname/);
  assert.match(menu, /const closeAfterNavigate[\s\S]*?buttonRef\.current\?\.focus\(\)/);
});

test("the header keeps its landmarks and the hero CTA copy", async () => {
  const header = await read("app/components/shell/SiteHeader.tsx");

  assert.match(header, /<header/);
  assert.match(header, /heroCopy\.primaryCta\.label/);
  assert.match(await read("app/components/shell/DesktopNav.tsx"), /aria-label="Primary"/);
  assert.match(await read("app/layout.tsx"), /<SkipLink/);
});

test("glass lives on a pseudo-element and only while scrolled", async () => {
  const css = await read("app/site-header.css");
  const blurRules = [...css.matchAll(/([^{}]+)\{[^{}]*-webkit-backdrop-filter[^{}]*\}/g)].map((match) => match[1]);

  assert.ok(blurRules.length > 0);
  for (const selector of blurRules.filter((rule) => !rule.includes("mobile-nav__panel"))) {
    assert.match(selector, /::before/);
  }
  assert.match(css, /data-scrolled="true"/);
  assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, ""), /\.site-header\s*\{[^}]*backdrop-filter/);
});

test("browsers without any backdrop-filter get an opaque bar", async () => {
  const css = await read("app/site-header.css");

  assert.match(css, /@supports not \(\(backdrop-filter: blur\(1px\)\) or \(-webkit-backdrop-filter: blur\(1px\)\)\)/);
});

test("the tuning tokens are all defined", async () => {
  const css = await read("app/site-header.css");

  for (const token of ["--nav-bg", "--nav-fg", "--nav-border", "--nav-blur", "--nav-height", "--nav-height-compact"]) {
    assert.match(css, new RegExp(`${token}:`), token);
  }
});

test("the hero reaches the top of the viewport without moving its content", async () => {
  const css = await read("app/globals.css");
  const header = await read("app/site-header.css");

  assert.doesNotMatch(css, /100svh - 4rem/);
  assert.match(css, /padding-block-start: calc\(var\(--nav-height\) \+ 3rem\)/);
  assert.match(header, /margin-top: calc\(-1 \* var\(--nav-height\)\)/);
});

test("the home page tints browser chrome to match the hero", async () => {
  assert.match(await read("app/page.tsx"), /themeColor: "#090a20"/);
  assert.match(await read("app/site-header.css"), /html:has\(\.experience-hero\)[\s\S]*?background: #090a20/);
});
