import type { MetadataRoute } from "next";

import { publishedProjects } from "../content/projects";
import { siteConfig } from "../content/site";

const lastModified = new Date("2026-09-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/expertise", "/about", "/rag"];
  return [
    ...paths.map((path) => ({
      url: `${siteConfig.canonicalOrigin}${path}`,
      lastModified,
      changeFrequency: path === "" ? "monthly" as const : "yearly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...publishedProjects.map((project) => ({
      url: `${siteConfig.canonicalOrigin}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
