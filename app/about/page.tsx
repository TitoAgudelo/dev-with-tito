import type { Metadata } from "next";
import Link from "next/link";

import { capabilities } from "../../content/expertise";
import { experience, getYearsExperience, principles, profile } from "../../content/profile";
import { siteConfig } from "../../content/site";
import { createPageMetadata } from "../../lib/metadata";
import CareerTimeline from "../components/content/CareerTimeline";
import ContactCTA from "../components/content/ContactCTA";
import JsonLd from "../components/content/JsonLd";
import PageHero from "../components/content/PageHero";
import ProfileActions from "../components/content/ProfileActions";
import Container from "../components/foundation/Container";
import Section from "../components/foundation/Section";
import SectionHeader from "../components/foundation/SectionHeader";

export const metadata: Metadata = createPageMetadata({
  title: "About Tito Agudelo",
  description:
    "The professional journey, engineering philosophy, leadership approach, and distributed collaboration style of lead software engineer Tito Agudelo.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${siteConfig.canonicalOrigin}/about`,
          mainEntity: {
            "@type": "Person",
            name: siteConfig.name,
            jobTitle: profile.role,
            url: siteConfig.canonicalOrigin,
            sameAs: siteConfig.socialProfiles.map((item) => item.url),
            knowsAbout: capabilities.map((item) => item.name),
          },
        }}
      />
      <PageHero
        eyebrow={`${profile.role} · ${getYearsExperience()} years in software`}
        title="I lead with context, boundaries, and practical delivery."
        description={`${profile.shortBiography} Today I focus on the architecture and team practices that make ambitious product work easier to understand, ship, and operate.`}
      >
        <ProfileActions />
      </PageHero>

      <Section labelledBy="journey-heading" tone="subtle">
        <Container>
          <SectionHeader
            id="journey-heading"
            eyebrow="Professional journey"
            title="From interfaces to systems and technical leadership."
            description="The through-line is a widening responsibility for the full customer and delivery outcome—not a departure from hands-on engineering."
          />
          <CareerTimeline entries={experience} />
        </Container>
      </Section>

      <Section labelledBy="collaboration-heading">
        <Container>
          <div className="about-two-column">
            <div>
              <p className="type-label">Collaboration style</p>
              <h2 id="collaboration-heading" className="type-h2">Distributed does not have to mean disconnected.</h2>
              <p className="type-lead">{profile.collaboration}</p>
              <p className="type-body">I prefer durable written context for decisions and async progress, then use meetings for the conversations that benefit from live disagreement, synthesis, or trust-building.</p>
            </div>
            <aside className="leadership-panel" aria-labelledby="leadership-heading">
              <p className="type-label">Leadership approach</p>
              <h2 id="leadership-heading" className="type-h3">Clarity over ceremony</h2>
              <p>{profile.leadership}</p>
              <Link href="/work" className="text-link">See that approach in project decisions →</Link>
            </aside>
          </div>
        </Container>
      </Section>

      <Section labelledBy="philosophy-heading" tone="subtle">
        <Container>
          <SectionHeader
            id="philosophy-heading"
            eyebrow="Engineering philosophy"
            title="Quality is part of how the work moves."
            description="These principles are operating constraints for product and engineering decisions."
          />
          <ol className="principle-grid">
            {principles.map((principle, index) => (
              <li key={principle.id}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.summary}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ContactCTA title="Want to compare working styles?" description="Start with the product context and the decision that currently feels hardest. That is usually enough for a useful first conversation." />
    </>
  );
}
