import type { Metadata } from "next";

import { siteConfig } from "../content/site";

interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const canonical = new URL(path, siteConfig.canonicalOrigin).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
