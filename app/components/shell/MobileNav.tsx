"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { NavigationItem } from "../../../content/site";
import NavLinks from "./NavLinks";

export default function MobileNav({ items }: { readonly items: readonly NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="mobile-nav__icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div ref={panelRef} id={panelId} className="mobile-nav__panel">
          <nav aria-label="Mobile navigation">
            <NavLinks items={items} presentation="mobile" onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
