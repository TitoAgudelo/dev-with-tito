"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";

const technologies = ["AWS", "Kubernetes", "Kafka", "OpenAI", "Anthropic", "Terraform", "Postgres", "Redis"] as const;

export default function CapabilityOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const orbit = stage.querySelector<HTMLElement>("[data-orbit-system]");
    if (!orbit) return;
    const rotateX = gsap.quickTo(orbit, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotateY = gsap.quickTo(orbit, "rotationY", { duration: 0.6, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 10);
      rotateX(((event.clientY - bounds.top) / bounds.height - 0.5) * -10);
    };
    const reset = () => { rotateX(0); rotateY(0); };
    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", reset);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="capability-section" aria-labelledby="capability-title">
      <div className="experience-container capability-copy">
        <p className="experience-kicker">02 · Architecture field</p>
        <h2 id="capability-title">Systems are relationships.</h2>
        <p>Move through the field. The interface responds like the architecture does: every node has context, gravity, and a boundary.</p>
      </div>
      <div ref={stageRef} className="orbit-stage" aria-label="Technology architecture map">
        <div className="orbit-system" data-orbit-system>
          <div className="orbit-ring orbit-ring--outer" aria-hidden="true" />
          <div className="orbit-ring orbit-ring--inner" aria-hidden="true" />
          <div className="orbit-core"><span>AI</span><strong>Architecture</strong><small>Human in the loop</small></div>
          <ul className="orbit-nodes">
            {technologies.map((technology, index) => (
              <li key={technology} style={{ "--node-index": index } as CSSProperties}>{technology}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
