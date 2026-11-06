import type { Metadata, Viewport } from "next";
import "./globals.css";
import MainContent from "./components/shell/MainContent";
import SiteFooter from "./components/shell/SiteFooter";
import SiteHeader from "./components/shell/SiteHeader";
import SkipLink from "./components/shell/SkipLink";
import { yearsExperience } from "../content/profile";
import { siteConfig } from "../content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalOrigin),
  title: {
    default: "Tito Agudelo — Senior Software Engineer",
    template: "%s · Tito Agudelo",
  },
  description:
    `Senior software engineer with ${yearsExperience} years building product systems across web, mobile, platform, and pragmatic AI.`,
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
    title: "Tito Agudelo — Senior Software Engineer",
    description:
      `Senior software engineer with ${yearsExperience} years building product systems across web, mobile, platform, and pragmatic AI.`,
    url: siteConfig.canonicalOrigin,
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tito Agudelo — Senior Software Engineer",
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
