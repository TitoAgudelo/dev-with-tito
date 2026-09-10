"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { gsap } from "gsap";

export default function TerminalCTA({ linkedInUrl }: { readonly linkedInUrl: string }) {
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = submitRef.current;
    if (!button || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = gsap.quickTo(button, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(button, "y", { duration: 0.35, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      const bounds = button.getBoundingClientRect();
      x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
      y((event.clientY - bounds.top - bounds.height / 2) * 0.16);
    };
    const reset = () => { x(0); y(0); };
    button.addEventListener("pointermove", move, { passive: true });
    button.addEventListener("pointerleave", reset);
    return () => {
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", reset);
    };
  }, []);

  function openLinkedIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="terminal-section" aria-labelledby="terminal-title">
      <div className="experience-container terminal-layout">
        <div>
          <p className="experience-kicker experience-kicker--light">06 · Start a conversation</p>
          <h2 id="terminal-title">Build the system that comes next.</h2>
        </div>
        <form className="terminal" onSubmit={openLinkedIn} aria-label="Open Tito Agudelo's LinkedIn profile">
          <div className="terminal__bar" aria-hidden="true"><i /><i /><i /><span>tito@architecture:~</span></div>
          <p className="terminal__line"><span aria-hidden="true">$</span> <span>hire-tito</span><span className="terminal__caret" aria-hidden="true" /></p>
          <p className="terminal__response">Ready to talk architecture, platforms, and pragmatic AI.</p>
          <button ref={submitRef} type="submit">Press Enter <span aria-hidden="true">↵</span></button>
          <noscript><a href={linkedInUrl}>Open LinkedIn</a></noscript>
        </form>
      </div>
    </section>
  );
}
