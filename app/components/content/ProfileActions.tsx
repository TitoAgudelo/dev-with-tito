import Link from "next/link";

import { siteConfig } from "../../../content/site";

export default function ProfileActions() {
  return (
    <ul className="profile-actions" aria-label="Professional links">
      <li><Link href={siteConfig.resume.url} className="button-link button-link--primary">Open résumé <span aria-hidden="true">(PDF)</span></Link></li>
      {siteConfig.socialProfiles.map((profile) => (
        <li key={profile.id}>
          <a className="btn-outline" href={profile.url} target="_blank" rel="noreferrer">
            {profile.label}<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
      <li><Link className="btn-outline" href="/#contact">Contact</Link></li>
    </ul>
  );
}
