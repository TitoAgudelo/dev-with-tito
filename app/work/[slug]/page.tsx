import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNextProject, getPublishedProject, publishedProjects } from "../../../content/projects";
import { siteConfig } from "../../../content/site";
import { createPageMetadata } from "../../../lib/metadata";
import ContactCTA from "../../components/content/ContactCTA";
import JsonLd from "../../components/content/JsonLd";
import Container from "../../components/foundation/Container";
import CaseStudyHero from "../../components/work/CaseStudyHero";
import CaseStudySection from "../../components/work/CaseStudySection";
import DecisionRecord from "../../components/work/DecisionRecord";

interface CaseStudyPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${siteConfig.canonicalOrigin}/work/${project.slug}`,
          creator: { "@type": "Person", name: siteConfig.name },
          about: project.technologies,
        }}
      />
      <CaseStudyHero project={project} />
      <Container size="reading" className="case-study-body">
        <CaseStudySection id="summary" title="Summary">
          <div className="case-summary-grid">
            <div><h3>Challenge</h3><p>{project.challenge}</p></div>
            <div><h3>Contribution</h3><p>{project.summary}</p></div>
            <div><h3>Outcome</h3><p>{project.result}</p></div>
          </div>
        </CaseStudySection>

        <CaseStudySection id="constraints" title="Constraints">
          <ul className="prose-list">{project.constraints.map((item) => <li key={item}>{item}</li>)}</ul>
        </CaseStudySection>

        <CaseStudySection id="approach" title="Approach">
          <ol className="numbered-list">{project.approach.map((item) => <li key={item}>{item}</li>)}</ol>
        </CaseStudySection>

        <CaseStudySection id="decisions" title="Key decisions">
          <div className="decision-grid">
            {project.decisions.map((decision) => <DecisionRecord key={decision.title} decision={decision} />)}
          </div>
        </CaseStudySection>

        <CaseStudySection id="implementation" title="Implementation focus">
          <ul className="prose-list">{project.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
        </CaseStudySection>

        <CaseStudySection id="outcomes" title="Outcomes and attribution">
          <div className="outcome-grid">
            {project.outcomes.map((outcome) => (
              <article key={outcome.label}>
                <h3>{outcome.label}</h3>
                <p>{outcome.detail}</p>
                <small>{outcome.qualification}</small>
              </article>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection id="lessons" title="What I learned">
          <ul className="prose-list">{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul>
        </CaseStudySection>

        <nav className="case-study-next" aria-label="Continue exploring work">
          <Link href="/expertise">See related expertise</Link>
          {nextProject ? <Link href={`/work/${nextProject.slug}`}>Next case: {nextProject.organization} →</Link> : null}
        </nav>
      </Container>
      <ContactCTA />
    </>
  );
}
