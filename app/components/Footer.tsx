"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

const socialLinks = [
  { title: "GitHub", href: "https://github.com/titoAgudelo/" },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/titoagudelo/" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-main py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/DevWithTito_logo.svg"
              alt="Dev With Tito"
              width={140}
              height={35}
            />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
            <span className="hidden sm:block w-px h-4 bg-white/[0.06]" />
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">&copy; {currentYear} Tito Agudelo. All rights reserved.</p>
          <p className="text-xs text-muted">Built with Next.js, Tailwind CSS & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
