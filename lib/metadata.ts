import type { Metadata } from "next";

import { seo } from "../content/seo";
import { siteConfig } from "../content/site";

/** A page-level openGraph object drops the file-based image, so subpages name it. */
const openGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Tito Agudelo — Senior Software Engineer",
} as const;

/**
 * Inherited by every route, so nothing page-specific belongs here: a canonical
 * in this object would mark each child route as a duplicate of the homepage.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalOrigin),
  title: { default: seo.title, template: `%s | ${siteConfig.name}` },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.canonicalOrigin }],
  creator: siteConfig.name,
  applicationName: siteConfig.siteName,
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

/** Leaves `title` unset: a page-level title would replace the layout default. */
export const homeMetadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: siteConfig.canonicalOrigin,
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "profile",
    firstName: "Tito",
    lastName: "Agudelo",
    username: "titoagudelo",
  },
};

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
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage.url],
    },
  };
}
