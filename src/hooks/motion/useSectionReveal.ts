"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface SectionRevealOptions {
  triggerRef?: RefObject<HTMLElement | null>;
  start?: string;
  toggleActions?: string;
  duration?: number;
  y?: number;
  ease?: string;
  delay?: number;
}

export function useSectionReveal(
  targetRef: RefObject<HTMLElement | null>,
  options: SectionRevealOptions = {}
) {
  const {
    triggerRef,
    start = "top 80%",
    toggleActions = "play none none reverse",
    duration = 0.6,
    y = 20,
    ease = "power2.out",
    delay = 0,
  } = options;

  useGSAP(
    () => {
      const element = targetRef.current;
      if (!element) return;

      const triggerElement = triggerRef ? triggerRef.current : element;
      if (!triggerElement) return;

      const mm = gsap.matchMedia();

      // 1. Motion active
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger: triggerElement,
              start,
              toggleActions,
            },
          }
        );
      });

      // 2. Reduced motion active: static presentation
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(element, {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
      });
    },
    { scope: targetRef, dependencies: [targetRef, triggerRef, start, toggleActions] }
  );
}

export default useSectionReveal;
