import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./site-header.css";
import MainContent from "./components/shell/MainContent";
import NavStateController from "./components/shell/NavStateController";
import SiteFooter from "./components/shell/SiteFooter";
import SiteHeader from "./components/shell/SiteHeader";
import SkipLink from "./components/shell/SkipLink";
import { rootMetadata } from "../lib/metadata";

export const metadata: Metadata = rootMetadata;

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
        <NavStateController />
        <SiteHeader />
        <MainContent>{children}</MainContent>
        <SiteFooter />
      </body>
    </html>
  );
}
