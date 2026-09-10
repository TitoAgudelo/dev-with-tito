import Link from "next/link";

import { publishedNavigation, siteConfig } from "../../../content/site";
import Container from "../foundation/Container";
import SiteLogo from "./SiteLogo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__primary">
          <SiteLogo />
          <nav aria-label="Footer navigation">
            <ul className="footer-links">
              {publishedNavigation.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href={siteConfig.resume.url}>{siteConfig.resume.label}</Link>
              </li>
              {siteConfig.socialProfiles.map((profile) => (
                <li key={profile.id}>
                  <a href={profile.url} target="_blank" rel="noreferrer">
                    {profile.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${siteConfig.email}`}>Email</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="site-footer__meta">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}.</p>
          <p>Built for speed, access, and resilient delivery.</p>
        </div>
      </Container>
    </footer>
  );
}
