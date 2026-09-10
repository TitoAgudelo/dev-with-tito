import Link from "next/link";

import Container from "./components/foundation/Container";

export default function NotFoundPage() {
  return (
    <section className="system-page" aria-labelledby="not-found-heading">
      <Container size="reading">
        <p className="type-label">404 · Page not found</p>
        <h1 id="not-found-heading" className="type-h1">This path does not lead to published work.</h1>
        <p className="type-lead">The page may have moved, or the content may not be public. Continue with the portfolio or return home.</p>
        <div className="hero-actions">
          <Link href="/work" className="button-link button-link--primary">View selected work</Link>
          <Link href="/" className="btn-outline">Return home</Link>
        </div>
      </Container>
    </section>
  );
}
