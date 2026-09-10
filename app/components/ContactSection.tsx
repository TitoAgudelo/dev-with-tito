import { siteConfig } from "../../content/site";
import ContactForm from "./ContactForm";
import Container from "./foundation/Container";
import Section from "./foundation/Section";

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

const profileIcons = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
};

export default function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading" tone="subtle" spacing="spacious">
      <Container>
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <p className="type-label mb-4">Contact</p>
          <h2 id="contact-heading" className="type-h2">
            Bring the hard part of the problem.
          </h2>
          <p className="type-lead mt-4 max-w-xl">
            Product architecture, frontend systems, mobile delivery, or applied AI—share the context and desired outcome. Direct email and the form are equivalent paths.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="type-h3">Start directly</h3>
              <p className="type-body mt-2">
                Email works without JavaScript and remains available if the form service is interrupted.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}?subject=Engineering%20conversation`}
                  className="button-link button-link--primary w-full"
                >
                  <EmailIcon />
                  Email Tito
                </a>
              </li>
              {siteConfig.socialProfiles.map((profile) => (
                <li key={profile.id}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center gap-3 p-3 rounded-xl glass hover:bg-elevated transition-colors group"
                  >
                    <span className="text-muted group-hover:text-accent transition-colors">
                      {profileIcons[profile.id]}
                    </span>
                    <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                      {profile.label}
                    </span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 gradient-border rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="type-h3">Send project context</h3>
              <p className="type-body mt-2">No account, phone number, company field, or marketing consent required.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
