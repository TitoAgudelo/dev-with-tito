import Link from "next/link";

import type { Project } from "../../../content/projects";
import Container from "../foundation/Container";
import Section from "../foundation/Section";
import SectionHeader from "../foundation/SectionHeader";
import ProjectCard from "../content/ProjectCard";

export default function SelectedWorkSection({ projects }: { readonly projects: readonly Project[] }) {
  return (
    <Section id="selected-work" labelledBy="selected-work-heading" tone="subtle">
      <Container>
        <div className="section-heading-row">
          <SectionHeader
            id="selected-work-heading"
            eyebrow="Selected work"
            title="Evidence before adjectives."
            description="NDA-safe case studies focused on the problem, engineering decisions, tradeoffs, and attributable outcome."
          />
          <Link href="/work" className="text-link">View all work →</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </Container>
    </Section>
  );
}
