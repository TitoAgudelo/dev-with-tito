import type { ReactNode } from "react";

type HeadingLevel = 2 | 3 | 4;

interface SectionHeaderProps {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly level?: HeadingLevel;
  readonly align?: "start" | "center";
  readonly id?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  level = 2,
  align = "start",
  id,
}: SectionHeaderProps) {
  const Heading = `h${level}` as const;

  return (
    <header className={`foundation-section-header foundation-section-header--${align}`}>
      {eyebrow ? <p className="type-label">{eyebrow}</p> : null}
      <Heading id={id} className={level === 2 ? "type-h2" : "type-h3"}>
        {title}
      </Heading>
      {description ? <div className="type-lead foundation-reading-measure">{description}</div> : null}
    </header>
  );
}
