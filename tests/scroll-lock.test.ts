import assert from "node:assert/strict";
import test from "node:test";

import { lockScroll, registerScroller, unlockScroll } from "../lib/scroll-lock";

function createScroller() {
  const calls: string[] = [];
  return { calls, scroller: { stop: () => calls.push("stop"), start: () => calls.push("start") } };
}

const createRoot = () => ({ dataset: {} as Record<string, string | undefined> });

test("locking marks the page and stops the registered scroller", () => {
  const root = createRoot();
  const { calls, scroller } = createScroller();
  const unregister = registerScroller(scroller);

  lockScroll(root);
  assert.equal(root.dataset.scrollLocked, "true");
  assert.deepEqual(calls, ["stop"]);

  unlockScroll(root);
  assert.equal(root.dataset.scrollLocked, undefined);
  assert.deepEqual(calls, ["stop", "start"]);
  unregister();
});

test("locking works with native scroll when no scroller is registered", () => {
  const root = createRoot();

  lockScroll(root);
  assert.equal(root.dataset.scrollLocked, "true");
  unlockScroll(root);
  assert.equal(root.dataset.scrollLocked, undefined);
});

test("a scroller registered while locked starts stopped", () => {
  const root = createRoot();
  const { calls, scroller } = createScroller();

  lockScroll(root);
  const unregister = registerScroller(scroller);
  assert.deepEqual(calls, ["stop"]);
  unlockScroll(root);
  unregister();
});

test("an unregistered scroller is left alone", () => {
  const root = createRoot();
  const { calls, scroller } = createScroller();

  registerScroller(scroller)();
  lockScroll(root);
  unlockScroll(root);
  assert.deepEqual(calls, []);
});
