import Link from "next/link";

import { experience, profile } from "../../../content/profile";
import CareerTimeline from "../content/CareerTimeline";
import Container from "../foundation/Container";
import Section from "../foundation/Section";

export default function AboutPreviewSection() {
  return (
    <Section labelledBy="about-preview-heading">
      <Container>
        <div className="about-preview">
          <div className="about-preview__copy">
            <p className="type-label">Professional summary</p>
            <h2 id="about-preview-heading" className="type-h2">An engineer who works across boundaries.</h2>
            <p className="type-lead">{profile.shortBiography}</p>
            <p className="type-body">{profile.collaboration}</p>
            <Link href="/about" className="button-link button-link--primary">Read about my journey</Link>
          </div>
          <div>
            <h3 className="type-label">Career progression</h3>
            <CareerTimeline entries={experience} compact />
          </div>
        </div>
      </Container>
    </Section>
  );
}
