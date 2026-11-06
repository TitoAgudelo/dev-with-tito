import { yearsExperience } from "./profile";

export const heroCopy = {
  eyebrow: "Tito Agudelo · Senior Software Engineer · Bogotá / Remote",
  headline: ["Mobile & AI Products.", "Built To Scale."],
  lead:
    `Senior full-stack engineer with ${yearsExperience} years shipping mobile and web products with React Native, TypeScript and Node.js at Gametime, Fanatics and TaskRabbit. I design mobile architecture, build AI products, and help teams as a solutions architect.`,
  rolesLabel: "Available as",
  roles: [
    "Software Engineer",
    "AI Engineer",
    "Solutions Architect",
    "Mobile Architect",
    "React Native Consultant",
  ],
  shippedAtLabel: "Shipped at",
  shippedAt: ["Gametime", "Fanatics", "TaskRabbit", "Toptal"],
  primaryCta: { label: "Work with me", href: "#contact" },
  secondaryCta: { label: "Explore the system", href: "#impact" },
} as const;
