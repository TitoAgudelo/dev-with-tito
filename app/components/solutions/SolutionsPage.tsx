import Link from "next/link";

import { SOLUTIONS_COPY } from "../../../content/solutions";
import { siteConfig } from "../../../content/site";
import { SOLUTIONS_PATHS, type Locale } from "../../../lib/i18n";
import AskTitoTrigger from "../ask-tito/AskTitoTrigger";
import ContactForm from "../ContactForm";

const OTHER_LOCALE: Record<Locale, Locale> = { en: "es", es: "en" };

export default function SolutionsPage({ locale }: { readonly locale: Locale }) {
  const copy = SOLUTIONS_COPY[locale];
  const other = OTHER_LOCALE[locale];
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(copy.contact.emailSubject)}`;

  return (
    <div lang={locale} className="solutions">
      <section className="solutions-hero" data-nav-theme="light" aria-labelledby="solutions-title">
        <div className="experience-container solutions-hero__layout">
          <div className="solutions-hero__copy">
            <p className="experience-kicker">{copy.hero.kicker}</p>
            <h1 id="solutions-title">{copy.hero.title}</h1>
            <p className="solutions-hero__lead">{copy.hero.lead}</p>
            <div className="solutions-actions">
              <a className="button-link button-link--primary" href="#solutions-contact">{copy.hero.primaryCta}</a>
              <a className="btn-outline" href="#solutions-offers">{copy.hero.secondaryCta}</a>
              <Link
                className="solutions-switch"
                href={SOLUTIONS_PATHS[other]}
                hrefLang={other}
                lang={other}
              >
                {copy.hero.switchLabel}
              </Link>
            </div>
          </div>
          <ul className="solutions-proof">
            {copy.proof.map((item) => (
              <li key={item.label}><strong>{item.value}</strong><span>{item.label}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="solutions-offers" className="solutions-offers" data-nav-theme="light" aria-labelledby="solutions-offers-title">
        <div className="experience-container">
          <header className="solutions-header">
            <p className="experience-kicker">{copy.offers.kicker}</p>
            <h2 id="solutions-offers-title">{copy.offers.title}</h2>
          </header>
          <ul className="solutions-grid">
            {copy.offers.items.map((offer) => (
              <li key={offer.id} className="solutions-card">
                <h3>{offer.title}</h3>
                <p>{offer.summary}</p>
                <ul className="solutions-card__examples">
                  {offer.examples.map((example) => <li key={example}>{example}</li>)}
                </ul>
                <AskTitoTrigger question={offer.askQuestion} className="solutions-card__ask">
                  {copy.offers.askLabel}<span aria-hidden="true"> ↗</span>
                </AskTitoTrigger>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="solutions-process" data-nav-theme="dark" aria-labelledby="solutions-process-title">
        <div className="experience-container">
          <header className="solutions-header">
            <p className="experience-kicker experience-kicker--light">{copy.process.kicker}</p>
            <h2 id="solutions-process-title">{copy.process.title}</h2>
          </header>
          <ol className="solutions-steps">
            {copy.process.steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="solutions-engagement" data-nav-theme="light" aria-labelledby="solutions-engagement-title">
        <div className="experience-container solutions-engagement__layout">
          <div>
            <header className="solutions-header">
              <p className="experience-kicker">{copy.engagement.kicker}</p>
              <h2 id="solutions-engagement-title">{copy.engagement.title}</h2>
            </header>
            <ul className="solutions-models">
              {copy.engagement.models.map((model) => (
                <li key={model.title}><h3>{model.title}</h3><p>{model.detail}</p></li>
              ))}
            </ul>
          </div>
          <aside className="solutions-fit" aria-labelledby="solutions-fit-title">
            <h3 id="solutions-fit-title">{copy.engagement.fitTitle}</h3>
            <ul>{copy.engagement.fit.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section id="solutions-contact" className="solutions-contact" data-nav-theme="dark" data-nav-section="contact" aria-labelledby="solutions-contact-title">
        <div className="experience-container solutions-contact__layout">
          <div className="solutions-contact__copy">
            <p className="experience-kicker experience-kicker--light">{copy.contact.kicker}</p>
            <h2 id="solutions-contact-title">{copy.contact.title}</h2>
            <p>{copy.contact.lead}</p>
            <div className="solutions-actions">
              <a className="button-link button-link--primary" href={mailto}>{copy.contact.emailCta}</a>
              <AskTitoTrigger question={copy.contact.askFirstQuestion} className="solutions-contact__ask">
                {copy.contact.askFirst}<span aria-hidden="true"> ↗</span>
              </AskTitoTrigger>
            </div>
          </div>
          <div className="terminal solutions-contact__form">
            <ContactForm
              appearance="terminal"
              idPrefix={`solutions-${locale}-contact`}
              locale={locale}
              defaultSubject={copy.contact.formSubject}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
