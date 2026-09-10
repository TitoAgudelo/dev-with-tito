"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceMetric {
  readonly value: string;
  readonly label: string;
  readonly note: string;
}

export default function ImpactMetrics({ metrics }: { readonly metrics: readonly ExperienceMetric[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-impact-item]", section);
        gsap.set(items, { opacity: 0.18, y: 48, scale: 0.96 });
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: "+=220%", pin: true, scrub: 0.6 },
        });
        items.forEach((item, index) => {
          timeline.to(item, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "none" }, index * 0.75);
          if (index > 0) timeline.to(items[index - 1], { opacity: 0.35, scale: 0.98, duration: 0.5 }, index * 0.75);
        });
      });
    }, section);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="impact" className="impact-section" aria-labelledby="impact-title">
      <div className="experience-container impact-layout">
        <div className="impact-intro">
          <p className="experience-kicker">01 · Operating range</p>
          <h2 id="impact-title">Evidence over theater.</h2>
          <p>Public, supportable signals only. Confidential business metrics stay confidential.</p>
        </div>
        <ol className="impact-list">
          {metrics.map((metric, index) => (
            <li key={metric.label} className="impact-item" data-impact-item>
              <span className="impact-item__index">0{index + 1}</span>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
