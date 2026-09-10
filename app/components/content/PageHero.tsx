import Container from "../foundation/Container";

interface PageHeroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-heading">
      <Container>
        <div className="page-hero__content">
          <p className="type-label">{eyebrow}</p>
          <h1 id="page-heading" className="type-h1">{title}</h1>
          <p className="type-lead foundation-reading-measure">{description}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}
