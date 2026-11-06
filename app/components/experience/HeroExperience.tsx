"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { heroCopy } from "../../../content/hero";

const ROLE_HIGHLIGHT_INTERVAL_MS = 2400;

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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(
      () => setActiveRole((current) => (current + 1) % heroCopy.roles.length),
      ROLE_HIGHLIGHT_INTERVAL_MS,
    );
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="experience-hero" aria-labelledby="experience-title">
      <HeroBackground />
      <div className="experience-float experience-float--one" aria-hidden="true">01</div>
      <div className="experience-float experience-float--two" aria-hidden="true">AI / SYSTEMS</div>
      <div className="experience-container experience-hero__inner">
        <h1 id="experience-title" className="experience-hero__title">
          <span className="experience-kicker hero-reveal hero-reveal--kicker">{heroCopy.eyebrow}</span>
          <span className="visually-hidden"> — </span>
          <span className="experience-display">
            <span className="hero-reveal hero-reveal--line-1">{heroCopy.headline[0]}</span>{" "}
            <span className="hero-reveal hero-reveal--line-2">{heroCopy.headline[1]}</span>
          </span>
        </h1>
        <div className="experience-hero__details hero-reveal hero-reveal--details">
          <p className="experience-hero__lead">{heroCopy.lead}</p>
          <div className="experience-hero__actions">
            <a className="button-link button-link--primary" href={heroCopy.primaryCta.href}>{heroCopy.primaryCta.label}</a>
            <a className="hero-scroll-cue" href={heroCopy.secondaryCta.href}>
              <span>{heroCopy.secondaryCta.label}</span><span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="role-list">
            <span id="hero-roles-label" className="role-list__label">{heroCopy.rolesLabel}</span>
            <ul aria-labelledby="hero-roles-label">
              {heroCopy.roles.map((role, index) => (
                <li key={role} data-active={index === activeRole ? "true" : undefined}>{role}</li>
              ))}
            </ul>
          </div>
          <p className="experience-hero__shipped">
            <span>{heroCopy.shippedAtLabel}</span> {heroCopy.shippedAt.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
