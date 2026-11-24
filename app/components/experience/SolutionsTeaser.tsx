import Link from "next/link";

import { SOLUTIONS_COPY } from "../../../content/solutions";
import { SOLUTIONS_PATHS } from "../../../lib/i18n";

export default function SolutionsTeaser() {
  const { teaser } = SOLUTIONS_COPY.en;
  return (
    <section className="solutions-teaser" data-nav-theme="light" aria-labelledby="solutions-teaser-title">
      <div className="experience-container solutions-teaser__layout">
        <div>
          <p className="experience-kicker">{teaser.kicker}</p>
          <h2 id="solutions-teaser-title">{teaser.title}</h2>
        </div>
        <div className="solutions-teaser__body">
          <p>{teaser.lead}</p>
          <div className="solutions-actions">
            <Link className="button-link button-link--primary" href={SOLUTIONS_PATHS.en}>{teaser.cta}</Link>
            <Link className="solutions-switch" href={SOLUTIONS_PATHS.es} hrefLang="es" lang="es">
              {SOLUTIONS_COPY.es.teaser.otherLanguage}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
