"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ASK_TITO_COPY, ASK_TITO_OPEN_EVENT, type AskTitoOpenDetail } from "../../../content/ask-tito";
import { localeFromPath } from "../../../lib/i18n";
import type { AskTitoRequest } from "./AskTitoChat";

const AskTitoChat = dynamic(() => import("./AskTitoChat"), { ssr: false });

const FULL_PAGE_PATH = "/ask";

/**
 * Floating, non-modal chat. The conversation stays mounted once opened, so
 * closing the panel or changing route never throws the transcript away.
 */
export default function AskTitoLauncher() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = ASK_TITO_COPY[locale];
  const panelId = useId();
  const titleId = `${panelId}-title`;

  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [request, setRequest] = useState<AskTitoRequest | undefined>();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const requestCounterRef = useRef(0);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleOpen(event: Event) {
      const detail = (event as CustomEvent<AskTitoOpenDetail | undefined>).detail;
      const question = typeof detail?.question === "string" ? detail.question.trim() : "";
      setEverOpened(true);
      setOpen(true);
      if (question) {
        requestCounterRef.current += 1;
        setRequest({ text: question, id: requestCounterRef.current });
      }
    }
    window.addEventListener(ASK_TITO_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(ASK_TITO_OPEN_EVENT, handleOpen);
  }, []);

  // The panel closes with the route but the chat inside it keeps its state.
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    function focusField(): boolean {
      const field = panel?.querySelector<HTMLTextAreaElement>("textarea:not([disabled])");
      if (!field) return false;
      field.focus({ preventScroll: true });
      return true;
    }

    // The chat is lazy-loaded, so its textarea may arrive after the panel opens.
    if (focusField()) return;
    const observer = new MutationObserver(() => { if (focusField()) observer.disconnect(); });
    observer.observe(panel, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [open, everOpened]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const active = document.activeElement;
      if (!panelRef.current?.contains(active) && active !== launcherRef.current) return;
      event.preventDefault();
      close(true);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  function toggle() {
    if (open) {
      close(false);
      return;
    }
    setEverOpened(true);
    setOpen(true);
  }

  return (
    <div className="ask-launcher" data-open={open} hidden={pathname === FULL_PAGE_PATH}>
      <div
        ref={panelRef}
        id={panelId}
        className="ask-launcher__panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        data-lenis-prevent
        hidden={!open}
      >
        <header className="ask-launcher__header">
          <div>
            <h2 id={titleId}>{copy.panelTitle}</h2>
            <p>{copy.panelSubtitle}</p>
          </div>
          <div className="ask-launcher__actions">
            <Link href={FULL_PAGE_PATH} className="ask-launcher__full">{copy.openFullPage}</Link>
            <button type="button" className="ask-launcher__close" onClick={() => close(true)} aria-label={copy.close}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>
        <div className="ask-launcher__body">
          {everOpened ? (
            <AskTitoChat
              locale={locale}
              variant="panel"
              initialQuestion={request}
              onNavigate={() => close(false)}
            />
          ) : null}
        </div>
      </div>
      <button
        ref={launcherRef}
        type="button"
        className="ask-launcher__button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <i className="ask-launcher__dot" aria-hidden="true" />
        <span>{copy.launcher}</span>
      </button>
    </div>
  );
}
