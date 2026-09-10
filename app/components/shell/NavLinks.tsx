"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavigationItem } from "../../../content/site";

interface NavLinksProps {
  readonly items: readonly NavigationItem[];
  readonly presentation: "desktop" | "mobile";
  readonly onNavigate?: () => void;
}

function isCurrent(pathname: string, item: NavigationItem): boolean {
  if (item.href.includes("#")) return false;
  if (item.match === "prefix") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  return pathname === item.href;
}

export default function NavLinks({ items, presentation, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={`nav-links nav-links--${presentation}`}>
      {items.map((item) => {
        const current = isCurrent(pathname, item);
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              className="nav-link"
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
