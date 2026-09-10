interface CaseStudySectionProps {
  readonly id: string;
  readonly title: string;
  readonly children: React.ReactNode;
}

export default function CaseStudySection({ id, title, children }: CaseStudySectionProps) {
  return (
    <section id={id} className="case-study-section" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="type-h2">{title}</h2>
      {children}
    </section>
  );
}
