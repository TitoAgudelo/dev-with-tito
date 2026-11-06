import { profile } from "../content/profile";
import { seo } from "../content/seo";
import { siteConfig } from "../content/site";

type JsonValue = string | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export type StructuredDataNode = {
  readonly "@type": "WebSite" | "Person" | "ProfilePage" | "Service";
  readonly "@id": string;
  readonly [key: string]: JsonValue;
};

export type StructuredDataGraph = {
  readonly "@context": "https://schema.org";
  readonly "@graph": readonly StructuredDataNode[];
};

const origin = siteConfig.canonicalOrigin;
const websiteId = `${origin}/#website`;

export const personId = `${origin}/#person`;

function buildPerson(): StructuredDataNode {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    givenName: "Tito",
    familyName: "Agudelo",
    jobTitle: profile.role,
    description: seo.personDescription,
    url: origin,
    image: `${origin}${seo.portraitPath}`,
    worksFor: { "@type": "Organization", name: "Gametime" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Piloto de Colombia" },
    address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
    knowsAbout: seo.knowsAbout,
    knowsLanguage: ["es", "en"],
    sameAs: siteConfig.socialProfiles.map(({ url }) => url),
  };
}

export function buildHomeStructuredData(): StructuredDataGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: origin,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      buildPerson(),
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#profilepage`,
        url: origin,
        name: seo.title,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Service",
        "@id": `${origin}/#consulting`,
        name: `${siteConfig.name} — Engineering Consulting`,
        description: seo.serviceDescription,
        url: `${origin}/#contact`,
        serviceType: seo.services,
        areaServed: "Worldwide",
        provider: { "@id": personId },
      },
    ],
  };
}
