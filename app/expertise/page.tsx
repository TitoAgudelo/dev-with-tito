import type { Metadata } from "next";

import { capabilities } from "../../content/expertise";
import { publishedProjects } from "../../content/projects";
import { createPageMetadata } from "../../lib/metadata";
import ContactCTA from "../components/content/ContactCTA";
import PageHero from "../components/content/PageHero";
import Container from "../components/foundation/Container";
import Section from "../components/foundation/Section";
import CapabilityGroup from "../components/expertise/CapabilityGroup";

export const metadata: Metadata = createPageMetadata({
  title: "Frontend, Mobile, Platform, and AI Expertise",
  description:
    "Product-led engineering expertise across frontend architecture, React, React Native, TypeScript, performance, accessibility, testing, AI-assisted delivery, and content systems.",
  path: "/expertise",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering expertise"
        title="Technical depth connected to product outcomes."
        description="I work across interface, application, delivery, and team boundaries. Each capability starts with the problem it solves, explains the operating approach, and links to public evidence where available."
      >
        <nav className="page-jump-nav" aria-label="Expertise on this page">
          <p>Jump to a capability</p>
          <ul>
            {capabilities.map((capability) => (
              <li key={capability.id}><a href={`#${capability.id}`}>{capability.name}</a></li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section labelledBy="capabilities-heading">
        <Container>
          <h2 id="capabilities-heading" className="visually-hidden">Capabilities</h2>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <CapabilityGroup
                key={capability.id}
                capability={capability}
                projects={publishedProjects.filter((project) => capability.relatedProjectSlugs.includes(project.slug))}
              />
            ))}
          </div>
        </Container>
      </Section>

      <section className="delivery-practices" aria-labelledby="delivery-heading">
        <Container>
          <div className="delivery-practices__copy">
            <p className="type-label">Leadership and delivery</p>
            <h2 id="delivery-heading" className="type-h2">Make the system understandable to the team operating it.</h2>
            <p className="type-lead">Architecture is only useful when people can make decisions with it. I use written decision records, bounded ownership, observable releases, and explicit acceptance criteria to keep distributed delivery aligned.</p>
          </div>
          <ol className="delivery-list">
            <li><strong>Frame</strong><span>Define the user outcome, constraint, and evidence of success.</span></li>
            <li><strong>Bound</strong><span>Separate responsibilities and make integration contracts visible.</span></li>
            <li><strong>Ship</strong><span>Deliver a reviewable slice with quality checks in the path.</span></li>
            <li><strong>Learn</strong><span>Observe behavior, document the result, and adjust deliberately.</span></li>
          </ol>
        </Container>
      </section>

      <ContactCTA title="Looking for an engineering partner, not just a framework specialist?" />
    </>
  );
}
