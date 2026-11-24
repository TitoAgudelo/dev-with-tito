import type { Metadata } from "next";

import { SOLUTIONS_COPY } from "../../content/solutions";
import { SOLUTIONS_PATHS } from "../../lib/i18n";
import { createPageMetadata } from "../../lib/metadata";
import SolutionsPage from "../components/solutions/SolutionsPage";

const { meta } = SOLUTIONS_COPY.en;

export const metadata: Metadata = createPageMetadata({
  title: meta.title,
  description: meta.description,
  path: SOLUTIONS_PATHS.en,
  languages: {
    en: SOLUTIONS_PATHS.en,
    es: SOLUTIONS_PATHS.es,
    "x-default": SOLUTIONS_PATHS.en,
  },
});

export default function SolutionsRoute() {
  return <SolutionsPage locale="en" />;
}
