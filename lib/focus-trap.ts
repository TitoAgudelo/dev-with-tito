/**
 * Returns the item Tab should move to, wrapping at the edges. The trap moves
 * focus itself because Safari's Tab skips links by default and would leave it.
 */
export function nextFocus<T>(items: readonly T[], active: unknown, backwards: boolean): T | null {
  if (items.length === 0) return null;

  const index = items.findIndex((item) => item === active);
  if (index === -1) return backwards ? items[items.length - 1] : items[0];

  const step = backwards ? -1 : 1;
  return items[(index + step + items.length) % items.length];
}
