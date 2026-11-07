import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_NAV_THEME, NAV_BAND_ROOT_MARGIN, mergeIntersections, parseNavTheme, resolveNavState } from "../lib/nav-state";

test("parseNavTheme keeps known themes and falls back to the light page default", () => {
  assert.equal(parseNavTheme("dark"), "dark");
  assert.equal(parseNavTheme("light"), "light");
  assert.equal(parseNavTheme("purple"), "purple");
  assert.equal(parseNavTheme("neon"), DEFAULT_NAV_THEME);
  assert.equal(parseNavTheme(undefined), DEFAULT_NAV_THEME);
  assert.equal(DEFAULT_NAV_THEME, "light");
});

test("resolveNavState uses the default when nothing marked is under the nav", () => {
  assert.deepEqual(resolveNavState([]), { theme: "light", section: null });
});

test("resolveNavState lets the later section win so a seam flips at one fixed line", () => {
  const impact = { theme: "dark", section: undefined };
  const capability = { theme: "light", section: undefined };
  const work = { theme: "dark", section: "work" };

  assert.deepEqual(resolveNavState([impact]), { theme: "dark", section: null });
  assert.deepEqual(resolveNavState([impact, capability]), { theme: "light", section: null });
  assert.deepEqual(resolveNavState([capability, work]), { theme: "dark", section: "work" });
});

test("the band sits inside the bar on phones and desktops", () => {
  const bottomInset = Number(/-(\d+)%/.exec(NAV_BAND_ROOT_MARGIN)?.[1]);
  const bandHeight = (viewport: number) => viewport * (1 - bottomInset / 100);

  assert.ok(bandHeight(844) <= 64);
  assert.ok(bandHeight(1080) <= 64);
});

test("mergeIntersections adds entering targets and drops leaving ones without touching the input", () => {
  const before = new Set(["impact"]);
  const after = mergeIntersections(before, [
    { target: "impact", isIntersecting: false },
    { target: "capability", isIntersecting: true },
  ]);

  assert.deepEqual([...after], ["capability"]);
  assert.deepEqual([...before], ["impact"]);
});

test("mergeIntersections keeps targets with no new entry", () => {
  const after = mergeIntersections(new Set(["impact"]), [{ target: "capability", isIntersecting: true }]);

  assert.deepEqual([...after].sort(), ["capability", "impact"]);
});

test("mergeIntersections trusts the newest entry when a fast jump queues two for one target", () => {
  const backInside = mergeIntersections(new Set(["hero"]), [
    { target: "hero", isIntersecting: false },
    { target: "hero", isIntersecting: true },
  ]);
  const leftAgain = mergeIntersections(new Set<string>(), [
    { target: "hero", isIntersecting: true },
    { target: "hero", isIntersecting: false },
  ]);

  assert.deepEqual([...backInside], ["hero"]);
  assert.deepEqual([...leftAgain], []);
});
