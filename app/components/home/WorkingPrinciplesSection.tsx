import type { Principle } from "../../../content/profile";
import Container from "../foundation/Container";
import Section from "../foundation/Section";
import SectionHeader from "../foundation/SectionHeader";

export default function WorkingPrinciplesSection({ principles }: { readonly principles: readonly Principle[] }) {
  return (
    <Section labelledBy="principles-heading" tone="subtle">
      <Container>
        <SectionHeader
          id="principles-heading"
          eyebrow="Engineering approach"
          title="How I reduce delivery risk."
          description="A small set of principles that shape architecture, product decisions, and team leadership."
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
  );
}
