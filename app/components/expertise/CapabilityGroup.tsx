import Link from "next/link";

import type { Capability } from "../../../content/expertise";
import type { Project } from "../../../content/projects";
import TagList from "../content/TagList";

export default function CapabilityGroup({
  capability,
  projects,
}: {
  readonly capability: Capability;
  readonly projects: readonly Project[];
}) {
  return (
    <article id={capability.id} className="capability-group">
      <div className="capability-group__content">
        <h2>{capability.name}</h2>
        <p className="capability-group__problem"><strong>Problem class:</strong> {capability.problemStatement}</p>
        <p><strong>Approach:</strong> {capability.approach}</p>
        <TagList label={`${capability.name} technologies and practices`} items={capability.technologies} />
      </div>
      <div className="capability-group__evidence">
        <h3>Supporting evidence</h3>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`}>{project.organization}: {project.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            See the <Link href="/rag">RAG Lab</Link> for a transparent, deterministic retrieval example.
          </p>
        )}
      </div>
    </article>
  );
}
