import Image from "next/image";
import Link from "next/link";

import { getImpactMetrics, profile } from "../../../content/profile";
import Container from "../foundation/Container";
import MetricGroup from "../content/MetricGroup";

export default function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-heading">
      <div className="orb orb-1" aria-hidden="true" />
      <div className="grid-bg home-hero__grid" aria-hidden="true" />
      <Container className="home-hero__inner">
        <div className="home-hero__copy">
          <p className="type-label">{profile.role} · Product, platform, and AI delivery</p>
          <h1 id="home-heading" className="type-display">
            I turn complex product requirements into software teams can trust.
          </h1>
          <p className="type-lead">{profile.summary}</p>
          <div className="hero-actions">
            <Link href="/work" className="button-link button-link--primary">View selected work</Link>
            <Link href="/#contact" className="btn-outline">Start a conversation</Link>
            <Link href="/docs/Tito-Agudelo-Resume-2025.pdf" className="text-link">Open résumé <span aria-hidden="true">(PDF)</span></Link>
          </div>
        </div>
        <div className="home-hero__portrait">
          <div className="hero-avatar-glow" aria-hidden="true" />
          <Image
            src="/images/hero-image-ava.png"
            alt="Portrait of Tito Agudelo"
            width={400}
            height={520}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 240px"
            priority
          />
        </div>
        <MetricGroup label="Professional impact" metrics={getImpactMetrics()} />
      </Container>
    </section>
  );
}
