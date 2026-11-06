import assert from "node:assert/strict";
import test from "node:test";

import { scrollToHash } from "../lib/hash-navigation";

function createRoot(ids: readonly string[]) {
  const calls: { id: string; options: ScrollIntoViewOptions | undefined }[] = [];
  return {
    calls,
    root: {
      getElementById: (id: string) =>
        ids.includes(id)
          ? { scrollIntoView: (options?: ScrollIntoViewOptions) => calls.push({ id, options }) }
          : null,
    },
  };
}

test("scrollToHash jumps straight to the target so a later layout change can't interrupt it", () => {
  const { root, calls } = createRoot(["contact"]);

  assert.equal(scrollToHash("#contact", root), true);
  assert.deepEqual(calls, [{ id: "contact", options: { behavior: "instant" } }]);
});

test("scrollToHash decodes the fragment before looking up the target", () => {
  const { root, calls } = createRoot(["work with me"]);

  assert.equal(scrollToHash("#work%20with%20me", root), true);
  assert.equal(calls[0]?.id, "work with me");
});

test("scrollToHash ignores empty, unknown and malformed fragments", () => {
  const { root, calls } = createRoot(["contact"]);

  for (const hash of ["", "#", "#missing", "#%E0%A4%A"]) {
    assert.equal(scrollToHash(hash, root), false);
  }
  assert.equal(calls.length, 0);
});
