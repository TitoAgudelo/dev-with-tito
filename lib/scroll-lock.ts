export interface LockableScroller {
  stop(): void;
  start(): void;
}

interface LockRoot {
  readonly dataset: Record<string, string | undefined>;
}

// The header sits outside the homepage's motion provider, so the Lenis instance
// reaches it through this handle rather than through React context.
let activeScroller: LockableScroller | null = null;
let locked = false;

export function registerScroller(scroller: LockableScroller): () => void {
  activeScroller = scroller;
  if (locked) scroller.stop();

  return () => {
    if (activeScroller === scroller) activeScroller = null;
  };
}

export function lockScroll(root: LockRoot): void {
  locked = true;
  root.dataset.scrollLocked = "true";
  activeScroller?.stop();
}

export function unlockScroll(root: LockRoot): void {
  locked = false;
  delete root.dataset.scrollLocked;
  activeScroller?.start();
}
