import Link from "next/link";

import Container from "../foundation/Container";

export default function ContactCTA({
  title = "Have a similar engineering problem?",
  description = "Share the context, constraints, and outcome you are working toward. I’ll respond with a direct next step.",
}: {
  readonly title?: string;
  readonly description?: string;
}) {
  return (
    <section className="conversion-cta" aria-labelledby="conversion-heading">
      <Container>
        <div className="conversion-cta__inner">
          <div>
            <h2 id="conversion-heading" className="type-h2">{title}</h2>
            <p className="type-body">{description}</p>
          </div>
          <Link href="/#contact" className="button-link button-link--primary">Start a conversation</Link>
        </div>
      </Container>
    </section>
  );
}
