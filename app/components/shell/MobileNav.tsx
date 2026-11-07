"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import type { NavigationItem } from "../../../content/site";
import { nextFocus } from "../../../lib/focus-trap";
import { lockScroll, unlockScroll } from "../../../lib/scroll-lock";
import NavLinks from "./NavLinks";

export default function MobileNav({ items }: { readonly items: readonly NavigationItem[] }) {
  const pathname = usePathname();
  // Stored per route, so any navigation closes the menu, including browser Back.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenedAt(null);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedAt(null);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
      const trapped = buttonRef.current ? [buttonRef.current, ...links] : links;
      const target = nextFocus(trapped, document.activeElement, event.shiftKey);
      if (target) {
        event.preventDefault();
        target.focus();
      }
    };

    const root = document.documentElement;
    lockScroll(root);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      unlockScroll(root);
    };
  }, [open]);

  // The tapped link unmounts with the panel, which would drop focus to <body>.
  const closeAfterNavigate = () => {
    setOpenedAt(null);
    buttonRef.current?.focus();
  };

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpenedAt(open ? null : pathname)}
      >
        <span aria-hidden="true" className="mobile-nav__icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div ref={panelRef} id={panelId} className="mobile-nav__panel" data-lenis-prevent>
          <nav aria-label="Primary">
            <NavLinks items={items} presentation="mobile" onNavigate={closeAfterNavigate} />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
