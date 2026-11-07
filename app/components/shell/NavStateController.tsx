"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { NAV_BAND_ROOT_MARGIN, mergeIntersections, resolveNavState } from "../../../lib/nav-state";

function findHeader(): HTMLElement | null {
  return document.querySelector<HTMLElement>(".site-header");
}

function writeNavState(header: HTMLElement, targets: readonly HTMLElement[], active: ReadonlySet<Element>): void {
  const state = resolveNavState(
    targets
      .filter((target) => active.has(target))
      .map((target) => ({ theme: target.dataset.navTheme, section: target.dataset.navSection })),
  );

  header.dataset.theme = state.theme;
  if (state.section) header.dataset.activeSection = state.section;
  else delete header.dataset.activeSection;
}

/**
 * Observers write straight to the header's data attributes so scrolling never
 * re-renders React. Both read real scroll position, which Lenis also drives, so
 * they behave the same with Lenis, with native scroll, and through GSAP pins.
 */
export default function NavStateController() {
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = findHeader();
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries.at(-1);
      if (entry) header.dataset.scrolled = String(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = findHeader();
    if (!header) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    let active: ReadonlySet<Element> = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        active = mergeIntersections(active, entries);
        writeNavState(header, targets, active);
      },
      { rootMargin: NAV_BAND_ROOT_MARGIN },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return <span ref={sentinelRef} className="nav-sentinel" aria-hidden="true" />;
}
