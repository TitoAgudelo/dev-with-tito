import type { Metadata } from "next";

import { additionalWork, publishedProjects } from "../../content/projects";
import { createPageMetadata } from "../../lib/metadata";
import ContactCTA from "../components/content/ContactCTA";
import PageHero from "../components/content/PageHero";
import ProjectCard from "../components/content/ProjectCard";
import TagList from "../components/content/TagList";
import Container from "../components/foundation/Container";
import Section from "../components/foundation/Section";
import SectionHeader from "../components/foundation/SectionHeader";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering Work",
  description:
    "NDA-safe software engineering case studies across mobile ticketing, peak-demand commerce, marketplaces, and enterprise product delivery.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Engineering decisions, not a logo wall."
        description="These summaries focus on the customer problem, my contribution, the constraints that shaped the work, and outcomes I can discuss publicly. Confidential metrics and implementation details stay confidential."
      />

      <Section labelledBy="case-studies-heading">
        <Container>
          <SectionHeader
            id="case-studies-heading"
            eyebrow="Case studies"
            title="Three product systems under real constraints."
            description="Compare mobile, commerce, and marketplace work through the same Challenge → Approach → Outcome structure."
          />
          <div className="project-grid">
            {publishedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="additional-work-heading" tone="subtle">
        <Container>
          <SectionHeader
            id="additional-work-heading"
            eyebrow="Additional company experience"
            title="Breadth beyond the featured cases."
            description="Concise public summaries are shown where a full case study would add detail I cannot responsibly substantiate or disclose."
          />
          <div className="additional-work-grid">
            {additionalWork.map((item) => (
              <article key={item.id} className="additional-work-card">
                <p className="type-label">{item.organization}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <TagList label={`${item.organization} technology highlights`} items={item.technologies} />
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA title="Need this level of clarity on your product?" />
    </>
  );
}
