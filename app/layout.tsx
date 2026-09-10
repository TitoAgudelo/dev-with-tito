import type { Metadata, Viewport } from "next";
import "./globals.css";
import MainContent from "./components/shell/MainContent";
import SiteFooter from "./components/shell/SiteFooter";
import SiteHeader from "./components/shell/SiteHeader";
import SkipLink from "./components/shell/SkipLink";
import { getYearsExperience } from "../content/profile";
import { siteConfig } from "../content/site";

const yearsExperience = getYearsExperience();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalOrigin),
  title: {
    default: "Tito Agudelo — Staff Software Engineer & AI Architect",
    template: "%s · Tito Agudelo",
  },
  description:
    `Staff software engineer and AI architect with ${yearsExperience} years building product systems across web, mobile, platform, and pragmatic AI.`,
  keywords: [
    "Tito Agudelo",
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "Node.js",
    "React Native",
    "GraphQL",
  ],
  authors: [{ name: "Tito Agudelo" }],
  openGraph: {
    title: "Tito Agudelo — Staff Software Engineer & AI Architect",
    description:
      `Staff software engineer and AI architect with ${yearsExperience} years building product systems across web, mobile, platform, and pragmatic AI.`,
    url: siteConfig.canonicalOrigin,
    siteName: "Dev With Tito",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tito Agudelo — Staff Software Engineer & AI Architect",
    description:
      `${yearsExperience} years building product systems across web, mobile, platform, and applied AI delivery.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F6F5F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="font-sans antialiased">
        <SkipLink />
        <SiteHeader />
        <MainContent>{children}</MainContent>
        <SiteFooter />
      </body>
    </html>
  );
}
