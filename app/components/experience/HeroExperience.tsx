"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["Staff Software Engineer", "Platform Architect", "AI Builder"] as const;

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => (
    <div className="hero-background hero-background--loading" aria-hidden="true">
      <div className="hero-background__fallback" />
      <div className="hero-background__veil" />
    </div>
  ),
});

export default function HeroExperience() {
  const [activeRole, setActiveRole] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(
      () => setActiveRole((current) => (current + 1) % roles.length),
      2400,
    );
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <section className="experience-hero" aria-labelledby="experience-title">
      <HeroBackground />
      <div className="experience-float experience-float--one" aria-hidden="true">01</div>
      <div className="experience-float experience-float--two" aria-hidden="true">AI / SYSTEMS</div>
      <div className="experience-container experience-hero__inner">
        <LazyMotion features={domAnimation}>
          <m.p
            className="experience-kicker"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Tito Agudelo · Systems-minded product engineering
          </m.p>
          <h1 id="experience-title" className="experience-display">
            <m.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 64 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >AI Systems.</m.span>
            <m.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 64 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >Built To Scale.</m.span>
          </h1>
          <div className="role-rotator" aria-label={roles.join(", ")}>
            <span className="role-rotator__index" aria-hidden="true">0{activeRole + 1}</span>
            <span className="role-rotator__window" aria-hidden="true">
              <AnimatePresence mode="wait">
                <m.span
                  key={roles[activeRole]}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >{roles[activeRole]}</m.span>
              </AnimatePresence>
            </span>
          </div>
        </LazyMotion>
        <a className="hero-scroll-cue" href="#impact">
          <span>Explore the system</span><span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
