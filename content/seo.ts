import { yearsExperience } from "./profile";

export const seo = {
  title: "Tito Agudelo — Senior Software Engineer | React Native, AI & Solutions Architecture",
  description:
    "Senior software engineer and AI engineer Tito Agudelo builds React Native and AI products (Gametime, Fanatics, TaskRabbit). Solutions architecture consulting.",
  keywords: [
    "Tito Agudelo",
    "Software Engineer",
    "AI Engineer",
    "Solutions Architect",
    "React Native Engineer",
    "Mobile Architect",
    "Full-Stack Engineer",
    "TypeScript",
    "Node.js",
    "Bogotá",
    "Colombia",
    "Remote",
  ],
  personDescription:
    `Senior software engineer with ${yearsExperience} years building mobile products and AI applications with React Native, TypeScript, and Node.js.`,
  serviceDescription:
    "Remote consulting for teams building mobile and AI products, from Bogotá, Colombia, working worldwide.",
  services: [
    "React Native consulting",
    "Mobile architecture",
    "AI product development",
    "Full-stack engineering",
    "Architecture reviews",
    "Fractional technical leadership",
  ],
  knowsAbout: [
    "React Native",
    "TypeScript",
    "Node.js",
    "AI engineering",
    "LLM applications",
    "RAG",
    "Solutions Architecture",
    "Mobile Architecture",
  ],
  // TODO(tito): add the real photo at public/tito.jpg. This path 404s until then.
  portraitPath: "/tito.jpg",
} as const;
