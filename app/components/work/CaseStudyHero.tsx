import Link from "next/link";

import type { Project } from "../../../content/projects";
import Container from "../foundation/Container";
import TagList from "../content/TagList";

export default function CaseStudyHero({ project }: { readonly project: Project }) {
  return (
    <header className="case-study-hero">
      <Container size="reading">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li aria-current="page">{project.organization}</li>
          </ol>
        </nav>
        <p className="type-label">{project.organization} · {project.role}</p>
        <h1 className="type-h1">{project.title}</h1>
        <p className="type-lead">{project.result}</p>
        <dl className="case-study-meta">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Scope</dt><dd>{project.timeframe}</dd></div>
          <div><dt>Platforms</dt><dd>{project.platforms.join(", ")}</dd></div>
        </dl>
        <TagList label="Technology highlights" items={project.technologies} />
        <p className="confidentiality-note"><strong>Scope note:</strong> {project.confidentialityNote}</p>
      </Container>
    </header>
  );
}
