import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tito Agudelo — Lead Software Engineer & AI-Driven Builder",
  description:
    "Engineer with 12+ years building scalable full-stack and cloud solutions. Specialized in AI-augmented delivery with Next.js, Node.js, and GraphQL.",
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
    title: "Tito Agudelo — Lead Software Engineer & AI-Driven Builder",
    description:
      "Engineer with 12+ years building scalable full-stack and cloud solutions across web, mobile, and serverless.",
    url: "https://devwithtito.com",
    siteName: "Dev With Tito",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tito Agudelo — Lead Software Engineer",
    description:
      "12+ years building scalable full-stack and cloud solutions. AI-augmented delivery specialist.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
