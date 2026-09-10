"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

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

    ScrollTrigger.refresh();
    return () => {
      removeCursorListeners();
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
