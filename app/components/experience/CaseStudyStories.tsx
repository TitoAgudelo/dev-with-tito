"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "../../../content/projects";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyStories({ projects }: { readonly projects: readonly Project[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-case-story]", root).forEach((story) => {
          const frame = story.querySelector<HTMLElement>("[data-case-frame]");
          const stages = gsap.utils.toArray<HTMLElement>("[data-case-stage]", story);
          if (!frame || stages.length < 2) return;
          gsap.set(stages.slice(1), { opacity: 0, y: 36, filter: "blur(5px)" });
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: story, start: "top top", end: "+=240%", pin: frame, scrub: 0.65 },
          });
          stages.forEach((stage, index) => {
            if (index === 0) return;
            timeline.to(stages[index - 1], { opacity: 0, y: -24, filter: "blur(5px)", duration: 0.45 })
              .to(stage, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, "<0.25");
          });
        });
      });
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="case-studies" aria-labelledby="case-studies-title">
      <header className="experience-container case-studies__header">
        <p className="experience-kicker">03 · Selected systems</p>
        <h2 id="case-studies-title">Work, unfolded.</h2>
        <p>Three product environments. One recurring job: make complexity understandable and failure recoverable.</p>
      </header>
      {projects.map((project, projectIndex) => {
        const stages = [
          { label: "Problem", text: project.challenge },
          { label: "Architecture", text: project.decisions[0]?.decision ?? project.approach[0] },
          { label: "Implementation", text: project.implementation[0] },
          { label: "Impact", text: project.outcomes[0]?.detail ?? project.result },
        ];
        return (
          <article key={project.slug} className="case-story" data-case-story>
            <div className="case-story__frame experience-container" data-case-frame>
              <aside className="case-story__identity">
                <span>0{projectIndex + 1}</span>
                <p>{project.organization}</p>
                <h3>{project.title}</h3>
                <ul aria-label="Technology highlights">{project.technologies.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
              </aside>
              <div className="case-story__stages">
                {stages.map((stage, index) => (
                  <section key={stage.label} className="case-story__stage" data-case-stage aria-labelledby={`${project.slug}-${stage.label}`}>
                    <span>0{index + 1} / 04</span>
                    <h4 id={`${project.slug}-${stage.label}`}>{stage.label}</h4>
                    <p>{stage.text}</p>
                    {index === stages.length - 1 ? <Link href={`/work/${project.slug}`}>Read the complete case study <span aria-hidden="true">↗</span></Link> : null}
                  </section>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
