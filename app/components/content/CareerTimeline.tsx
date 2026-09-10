import type { ExperienceEntry } from "../../../content/profile";

export default function CareerTimeline({
  entries,
  compact = false,
}: {
  readonly entries: readonly ExperienceEntry[];
  readonly compact?: boolean;
}) {
  const visibleEntries = compact ? entries.slice(0, 3) : entries;

  return (
    <ol className="career-timeline">
      {visibleEntries.map((entry) => (
        <li key={entry.id} className="career-entry">
          <p className="type-label">
            <time dateTime={entry.startDate}>{entry.period}</time>
          </p>
          <h3>{entry.role}</h3>
          <p>{entry.scope}</p>
          {!compact ? (
            <ul>
              {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
