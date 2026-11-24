export type Locale = "en" | "es";

export const LOCALES: readonly Locale[] = ["en", "es"];

export const SOLUTIONS_PATHS: Readonly<Record<Locale, string>> = {
  en: "/solutions",
  es: "/es/soluciones",
};

/** `/es` and anything under it is Spanish; every other path is English. */
export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return "en";
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}
