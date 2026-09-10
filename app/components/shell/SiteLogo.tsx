import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link href="/" className="site-logo" aria-label="Tito Agudelo — Home">
      <span className="site-logo__mark" aria-hidden="true">T/A</span>
      <span className="site-logo__name">Tito Agudelo</span>
    </Link>
  );
}
