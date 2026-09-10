import type { ReactNode } from "react";

type SectionTone = "canvas" | "subtle" | "accent";
type SectionSpacing = "compact" | "default" | "spacious";

interface SectionProps {
  readonly id?: string;
  readonly labelledBy?: string;
  readonly tone?: SectionTone;
  readonly spacing?: SectionSpacing;
  readonly children: ReactNode;
  readonly className?: string;
}

export default function Section({
  id,
  labelledBy,
  tone = "canvas",
  spacing = "default",
  children,
  className,
}: SectionProps) {
  const classes = [
    "foundation-section",
    `foundation-section--${tone}`,
    `foundation-section--${spacing}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} aria-labelledby={labelledBy} className={classes}>
      {children}
    </section>
  );
}
