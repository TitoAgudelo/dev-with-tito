import Link from "next/link";

import type { Capability } from "../../../content/expertise";
import Container from "../foundation/Container";
import Section from "../foundation/Section";
import SectionHeader from "../foundation/SectionHeader";
import TagList from "../content/TagList";

export default function ExpertisePreview({ capabilities }: { readonly capabilities: readonly Capability[] }) {
  return (
    <Section id="expertise-preview" labelledBy="expertise-preview-heading">
      <Container>
        <div className="section-heading-row">
          <SectionHeader
            id="expertise-preview-heading"
            eyebrow="Expertise"
            title="Architecture in service of the product."
            description="Technical depth matters when it improves comprehension, delivery speed, resilience, or customer outcomes."
          />
          <Link href="/expertise" className="text-link">Explore all capabilities →</Link>
        </div>
        <div className="capability-preview-grid">
          {capabilities.map((capability) => (
            <article key={capability.id} className="capability-card">
              <h3>{capability.name}</h3>
              <p>{capability.problemStatement}</p>
              <TagList label={`${capability.name} technologies`} items={capability.technologies.slice(0, 3)} />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
