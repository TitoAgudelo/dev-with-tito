import type { NavigationItem } from "../../../content/site";
import NavLinks from "./NavLinks";

export default function DesktopNav({ items }: { readonly items: readonly NavigationItem[] }) {
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      <NavLinks items={items} presentation="desktop" />
    </nav>
  );
}
