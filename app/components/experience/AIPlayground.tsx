"use client";

import Link from "next/link";
import type { PointerEvent } from "react";

interface PlaygroundDemo {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly detail: string;
  readonly href?: string;
}

const demos: readonly PlaygroundDemo[] = [
  { id: "rag", title: "RAG", status: "Live", detail: "Deterministic retrieval with source-ranked context.", href: "/rag" },
  { id: "agents", title: "Agents", status: "Architecture ready", detail: "Bounded tools, observable handoffs, human approval." },
  { id: "voice", title: "Voice AI", status: "Architecture ready", detail: "Realtime turn-taking designed around interruption." },
  { id: "workflows", title: "Workflows", status: "Architecture ready", detail: "Typed, recoverable automation across systems." },
];

function handleTilt(event: PointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.setProperty("--tilt-x", `${y * -5}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${x * 7}deg`);
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export default function AIPlayground() {
  return (
    <section className="playground-section" aria-labelledby="playground-title">
      <div className="experience-container">
        <header className="playground-header">
          <div><p className="experience-kicker">05 · AI playground</p><h2 id="playground-title">Prototypes with boundaries.</h2></div>
          <p>Small, inspectable demonstrations—not vague claims about intelligence.</p>
        </header>
        <div className="playground-grid">
          {demos.map((demo, index) => {
            const content = <><span className="playground-card__index">0{index + 1}</span><span className="playground-card__signal" aria-hidden="true" /><h3>{demo.title}</h3><p>{demo.detail}</p><small>{demo.status}</small></>;
            return demo.href ? (
              <Link key={demo.id} href={demo.href} className="playground-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>{content}</Link>
            ) : (
              <article key={demo.id} className="playground-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>{content}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
