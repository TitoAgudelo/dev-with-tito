"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statement = "Architecture is not the diagram. It is the quality of the decisions a team can keep making after the diagram is gone.";

export default function PhilosophyReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-philosophy-word]", section);
      gsap.fromTo(words, { opacity: 0.12, y: 16, filter: "blur(4px)" }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 72%", end: "bottom 58%", scrub: 0.5 },
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="philosophy-section" aria-labelledby="philosophy-title">
      <div className="experience-container">
        <p className="experience-kicker">04 · Engineering philosophy</p>
        <h2 id="philosophy-title" className="philosophy-statement">
          {statement.split(" ").map((word, index) => <span key={`${word}-${index}`} data-philosophy-word>{word}{" "}</span>)}
        </h2>
        <p className="philosophy-note">Clear boundaries. Short feedback loops. Systems that make the right behavior the easy behavior.</p>
      </div>
    </section>
  );
}
