"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  title: string;
  path: string;
  type: "section" | "route";
};

const navLinks: ReadonlyArray<NavLink> = [
  { title: "About", path: "#about", type: "section" },
  { title: "Skills", path: "#skills", type: "section" },
  { title: "Projects", path: "#projects", type: "section" },
  { title: "RAG Demo", path: "/rag", type: "route" },
  { title: "Contact", path: "#contact", type: "section" },
];

const sectionHref = (hash: string, isHome: boolean): string =>
  isHome ? hash : `/${hash}`;

const contactHref = (isHome: boolean): string => (isHome ? "#contact" : "/#contact");

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) {
        setActiveSection("");
        return;
      }
      const sections = navLinks
        .filter((l) => l.type === "section")
        .map((l) => l.path.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="relative z-10 shrink-0">
          <Image
            src="/images/DevWithTito_logo.svg"
            alt="Dev With Tito"
            width={160}
            height={40}
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.type === "route"
                ? pathname === link.path
                : isHome && activeSection === link.path.replace("#", "");
            const href =
              link.type === "route" ? link.path : sectionHref(link.path, isHome);
            return (
              <Link
                key={link.path}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  isActive ? "text-white" : "text-secondary hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.title}</span>
              </Link>
            );
          })}
          <Link
            href={contactHref(isHome)}
            className="btn-glow ml-4 !py-2 !px-5 !text-sm"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="relative z-10 md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center gap-2 py-8">
              {navLinks.map((link) => {
                const href =
                  link.type === "route"
                    ? link.path
                    : sectionHref(link.path, isHome);
                return (
                  <Link
                    key={link.path}
                    href={href}
                    onClick={closeMobile}
                    className="px-6 py-3 text-lg font-medium text-secondary hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                );
              })}
              <Link
                href={contactHref(isHome)}
                onClick={closeMobile}
                className="btn-glow mt-4 !text-sm"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
