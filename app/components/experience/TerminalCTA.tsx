import ContactForm from "../ContactForm";

export default function TerminalCTA({ linkedInUrl }: { readonly linkedInUrl: string }) {
  return (
    <section id="contact" className="terminal-section" aria-labelledby="terminal-title">
      <div className="experience-container terminal-layout">
        <div>
          <p className="experience-kicker experience-kicker--light">06 · Start a conversation</p>
          <h2 id="terminal-title">Build the system that comes next.</h2>
        </div>
        <div className="terminal">
          <div className="terminal__bar" aria-hidden="true"><i /><i /><i /><span>tito@architecture:~</span></div>
          <div className="terminal__intro">
            <p><span aria-hidden="true">$</span> start-conversation</p>
            <p>Ready to talk architecture, platforms, and pragmatic AI.</p>
          </div>
          <ContactForm appearance="terminal" idPrefix="home-contact" />
          <div className="terminal__secondary">
            <span>Prefer a professional network?</span>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
