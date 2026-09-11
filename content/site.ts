export type NavigationMatch = "exact" | "prefix";
export type NavigationPriority = "primary" | "secondary";
export type PublicationStatus = "published" | "planned";

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly match: NavigationMatch;
  readonly priority: NavigationPriority;
  readonly status: PublicationStatus;
}

export interface SocialProfile {
  readonly id: "github" | "linkedin";
  readonly label: string;
  readonly url: string;
}

export const siteConfig = {
  name: "Tito Agudelo",
  siteName: "Dev With Tito",
  canonicalOrigin: "https://devwithtito.com",
  email: "titoarturoagudelo@gmail.com",
  resume: {
    url: "/docs/Tito-Agudelo-Resume-2025.pdf",
    label: "Résumé (PDF)",
  },
  navigation: [
    { id: "work", label: "Work", href: "/work", match: "prefix", priority: "primary", status: "published" },
    { id: "expertise", label: "Expertise", href: "/expertise", match: "exact", priority: "primary", status: "published" },
    { id: "about", label: "About", href: "/about", match: "exact", priority: "primary", status: "published" },
    { id: "ask", label: "Ask Tito", href: "/ask", match: "exact", priority: "primary", status: "published" },
    { id: "contact", label: "Contact", href: "/#contact", match: "exact", priority: "primary", status: "published" },
    { id: "privacy", label: "Privacy", href: "/privacy", match: "exact", priority: "secondary", status: "planned" },
  ] satisfies readonly NavigationItem[],
  socialProfiles: [
    { id: "github", label: "GitHub", url: "https://github.com/titoAgudelo/" },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/titoagudelo/" },
  ] satisfies readonly SocialProfile[],
} as const;

export const publishedNavigation = siteConfig.navigation.filter(
  (item) => item.status === "published",
);
