"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface StaggerRevealOptions {
  itemSelector?: string;
  triggerRef?: RefObject<HTMLElement | null>;
  start?: string;
  toggleActions?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  ease?: string;
  delay?: number;
}

export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  options: StaggerRevealOptions = {}
) {
  const {
    itemSelector = ".stagger-item",
    triggerRef,
    start = "top 80%",
    toggleActions = "play none none reverse",
    stagger = 0.08,
    duration = 0.6,
    y = 20,
    ease = "power2.out",
    delay = 0,
  } = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.querySelectorAll(itemSelector);
      if (!items || items.length === 0) return;

      const triggerElement = triggerRef ? triggerRef.current : container;
      if (!triggerElement) return;

      const mm = gsap.matchMedia();

      // 1. Motion active
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
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
        gsap.set(items, {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [containerRef, triggerRef, itemSelector, start, toggleActions, stagger],
    }
  );
}

export default useStaggerReveal;
