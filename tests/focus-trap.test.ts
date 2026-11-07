import assert from "node:assert/strict";
import test from "node:test";

import { nextFocus } from "../lib/focus-trap";

const items = ["toggle", "work", "contact"] as const;

test("nextFocus wraps from the last item to the first going forward", () => {
  assert.equal(nextFocus(items, "contact", false), "toggle");
});

test("nextFocus wraps from the first item to the last going backward", () => {
  assert.equal(nextFocus(items, "toggle", true), "contact");
});

test("nextFocus steps through the middle itself so Safari can't skip links", () => {
  assert.equal(nextFocus(items, "toggle", false), "work");
  assert.equal(nextFocus(items, "contact", true), "work");
});

test("nextFocus pulls stray focus back into the trap", () => {
  assert.equal(nextFocus(items, "outside", false), "toggle");
  assert.equal(nextFocus(items, "outside", true), "contact");
});

test("nextFocus does nothing with an empty trap", () => {
  assert.equal(nextFocus([], "outside", false), null);
});
