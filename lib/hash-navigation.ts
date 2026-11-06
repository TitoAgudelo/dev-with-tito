interface HashTarget {
  scrollIntoView(options?: ScrollIntoViewOptions): void;
}

interface HashRoot {
  getElementById(id: string): HashTarget | null;
}

function decodeFragment(hash: string): string {
  const fragment = hash.slice(1);
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
}

export function scrollToHash(hash: string, root: HashRoot): boolean {
  const id = decodeFragment(hash);
  const target = id ? root.getElementById(id) : null;
  if (!target) return false;

  target.scrollIntoView({ behavior: "instant" });
  return true;
}
