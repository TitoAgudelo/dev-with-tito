import Link from "next/link";

import type { Project } from "../../../content/projects";
import TagList from "./TagList";

interface ProjectCardProps {
  readonly project: Project;
  readonly headingLevel?: 2 | 3;
}

export default function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <Link href={`/work/${project.slug}`} className="project-card">
      <article>
        <div className="project-card__meta">
          <span>{project.organization}</span>
          <span>{project.platforms.join(" · ")}</span>
        </div>
        <Heading>{project.title}</Heading>
        <p>{project.summary}</p>
        <p className="project-card__result"><strong>Contribution:</strong> {project.result}</p>
        <TagList label={`${project.title} technologies`} items={project.technologies.slice(0, 4)} />
        <span className="project-card__action" aria-hidden="true">Read the case study →</span>
      </article>
    </Link>
  );
}
