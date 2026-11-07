"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { scrollToHash } from "../../../lib/hash-navigation";
import { registerScroller } from "../../../lib/scroll-lock";

gsap.registerPlugin(ScrollTrigger);

const HASH_ALIGNMENT_WINDOW_MS = 4000;
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

// Pinned sections add their scroll length after hydration, so a browser jump to
// a fragment lands short. Re-align after each refresh until the visitor takes
// over, one frame later because the layout is still settling during the event.
function keepHashTargetAligned() {
  let frame = 0;
  const align = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => scrollToHash(window.location.hash, document));
  };
  const stop = () => {
    window.clearTimeout(timeout);
    window.cancelAnimationFrame(frame);
    ScrollTrigger.removeEventListener("refresh", align);
    USER_SCROLL_EVENTS.forEach((type) => window.removeEventListener(type, stop));
  };
  const timeout = window.setTimeout(stop, HASH_ALIGNMENT_WINDOW_MS);

  ScrollTrigger.addEventListener("refresh", align);
  USER_SCROLL_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  return stop;
}

interface ExperienceMotionProviderProps {
  readonly children: ReactNode;
}

export default function ExperienceMotionProvider({ children }: ExperienceMotionProviderProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const updateScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    const unregisterScroller = registerScroller(lenis);

    lenis.on("scroll", updateScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let removeCursorListeners = () => undefined;
    if (finePointer.matches) {
      const cursor = document.querySelector<HTMLElement>("[data-experience-cursor]");
      if (cursor) {
        const moveX = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
        const moveY = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });
        const onMove = (event: PointerEvent) => {
          moveX(event.clientX);
          moveY(event.clientY);
          cursor.dataset.visible = "true";
        };
        const onLeave = () => { cursor.dataset.visible = "false"; };
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);
        removeCursorListeners = () => {
          window.removeEventListener("pointermove", onMove);
          document.documentElement.removeEventListener("mouseleave", onLeave);
        };
      }
    }

    const stopHashAlignment = keepHashTargetAligned();
    ScrollTrigger.refresh();
    return () => {
      stopHashAlignment();
      removeCursorListeners();
      unregisterScroller();
      lenis.off("scroll", updateScroll);
      lenis.destroy();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <div className="experience-root">
      {children}
      <span className="experience-cursor" data-experience-cursor aria-hidden="true" />
    </div>
  );
}
