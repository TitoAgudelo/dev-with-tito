export const NAV_THEMES = ["dark", "light", "purple"] as const;
export type NavTheme = (typeof NAV_THEMES)[number];

/** Pages sit on the light canvas, so anything unmarked reads as light. */
export const DEFAULT_NAV_THEME: NavTheme = "light";

/** A band covering the top 5% of the viewport, which stays inside the bar. */
export const NAV_BAND_ROOT_MARGIN = "0px 0px -95% 0px";

export interface NavTarget {
  readonly theme: string | undefined;
  readonly section: string | undefined;
}

export interface NavState {
  readonly theme: NavTheme;
  readonly section: string | null;
}

export function parseNavTheme(value: string | undefined): NavTheme {
  return NAV_THEMES.find((theme) => theme === value) ?? DEFAULT_NAV_THEME;
}

/**
 * `intersecting` is in document order. The last entry wins, so a seam between
 * two sections flips at the band's bottom edge in both scroll directions.
 */
export function resolveNavState(intersecting: readonly NavTarget[]): NavState {
  const target = intersecting.at(-1);
  return { theme: parseNavTheme(target?.theme), section: target?.section ?? null };
}

export interface IntersectionUpdate<T> {
  readonly target: T;
  readonly isIntersecting: boolean;
}

/** Entries arrive oldest first, so the newest entry per target decides. */
export function mergeIntersections<T>(
  active: ReadonlySet<T>,
  entries: readonly IntersectionUpdate<T>[],
): ReadonlySet<T> {
  const latest = new Map(entries.map((entry) => [entry.target, entry.isIntersecting]));
  return new Set([...active, ...latest.keys()].filter((target) => latest.get(target) ?? true));
}
