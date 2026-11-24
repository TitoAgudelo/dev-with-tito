import type { Locale } from "../lib/i18n";
import { yearsExperience } from "./profile";

export interface SolutionOffer {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly examples: readonly [string, string, string];
  readonly askQuestion: string;
}

export interface SolutionStep {
  readonly title: string;
  readonly detail: string;
}

export interface SolutionModel {
  readonly title: string;
  readonly detail: string;
}

export interface SolutionsCopy {
  readonly meta: { readonly title: string; readonly description: string };
  readonly hero: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly switchLabel: string;
  };
  readonly proof: readonly { readonly value: string; readonly label: string }[];
  readonly offers: {
    readonly kicker: string;
    readonly title: string;
    readonly askLabel: string;
    readonly items: readonly SolutionOffer[];
  };
  readonly process: {
    readonly kicker: string;
    readonly title: string;
    readonly steps: readonly SolutionStep[];
  };
  readonly engagement: {
    readonly kicker: string;
    readonly title: string;
    readonly models: readonly SolutionModel[];
    readonly fitTitle: string;
    readonly fit: readonly string[];
  };
  readonly contact: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly emailCta: string;
    readonly emailSubject: string;
    readonly askFirst: string;
    readonly askFirstQuestion: string;
    readonly formSubject: string;
  };
  readonly teaser: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly cta: string;
    readonly otherLanguage: string;
  };
}

const en: SolutionsCopy = {
  meta: {
    title: "Custom solutions — apps, platforms and AI",
    description: "Custom mobile apps, web platforms, AI assistants and full-stack products from Tito Agudelo, a senior engineer working remotely from Bogotá.",
  },
  hero: {
    kicker: "Custom solutions",
    title: "Software built around your business.",
    lead: "Mobile apps, web platforms, AI assistants and full-stack products — built, modernized or reviewed by one senior engineer who stays close to the work.",
    primaryCta: "Start a conversation",
    secondaryCta: "See what I build",
    switchLabel: "Ver en español",
  },
  proof: [
    { value: `${yearsExperience} years`, label: "building production software" },
    { value: "Since 2016", label: "freelance through Toptal" },
    { value: "EN / ES", label: "Spanish native, English professional" },
  ],
  offers: {
    kicker: "What I build",
    title: "Six ways I can help.",
    askLabel: "Ask about this",
    items: [
      {
        id: "mobile",
        title: "Mobile apps (React Native)",
        summary: "Cross-platform apps built, extended or stabilized with React Native and TypeScript.",
        examples: ["New mobile product", "Features for an existing app", "Navigation, deep links and push notifications"],
        askQuestion: "What React Native experience does Tito have?",
      },
      {
        id: "web",
        title: "Web platforms & internal tools",
        summary: "Responsive web applications, dashboards and business tools with React and Next.js.",
        examples: ["SaaS interfaces", "Internal business applications", "Dashboards and data-driven views"],
        askQuestion: "Can Tito build a custom app for my business?",
      },
      {
        id: "ai",
        title: "AI assistants & automation",
        summary: "LLM-powered assistants grounded in your own content. Ask Tito on this site is a live example.",
        examples: ["Knowledge-based chatbot", "Retrieval over your documents (RAG)", "LLM features inside an existing product"],
        askQuestion: "What AI projects has Tito built?",
      },
      {
        id: "fullstack",
        title: "MVPs & full-stack products",
        summary: "From first idea to a working product: frontend, APIs, data and authentication.",
        examples: ["MVP for a startup", "Authentication and workflows", "Third-party service integrations"],
        askQuestion: "Can Tito build a custom app for my business?",
      },
      {
        id: "modernization",
        title: "Modernization & rescue",
        summary: "Stabilize and improve an existing codebase without stopping product delivery.",
        examples: ["JavaScript to TypeScript migration", "Refactoring and testing", "Production bug investigation"],
        askQuestion: "What is Tito's experience with legacy modernization?",
      },
      {
        id: "architecture",
        title: "Architecture & technical guidance",
        summary: "Practical technical decisions for teams facing trade-offs between speed and maintainability.",
        examples: ["Architecture review", "Modernization plan", "Technical leadership for a project"],
        askQuestion: "What leadership experience does Tito have?",
      },
    ],
  },
  process: {
    kicker: "How we work",
    title: "Four steps, in small increments.",
    steps: [
      { title: "Understand", detail: "The business problem, the existing technical environment, the constraints and the outcome you want." },
      { title: "Shape", detail: "An appropriate solution, with the trade-offs explained before anything is built." },
      { title: "Build", detail: "Changes delivered in manageable increments, with blockers and risks communicated early." },
      { title: "Launch & support", detail: "Deployment, ongoing maintenance and continued improvement of what was built." },
    ],
  },
  engagement: {
    kicker: "Working together",
    title: "Pick the shape that fits.",
    models: [
      { title: "Defined project", detail: "A specific product, feature or migration with an agreed outcome." },
      { title: "Ongoing partnership", detail: "A senior engineer embedded for long-term product development — the kind of engagement I prefer." },
      { title: "Review & advisory", detail: "An architecture review or technical guidance for a team facing a hard decision." },
    ],
    fitTitle: "Who I work with",
    fit: [
      "Startups building their first product",
      "Growing businesses extending existing applications",
      "Established teams that need senior mobile or full-stack capacity",
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Tell me what you need to build.",
    lead: "Share the problem, the context and the outcome you are after.",
    emailCta: "Email Tito",
    emailSubject: "Custom solution inquiry",
    askFirst: "Ask Tito AI first",
    askFirstQuestion: "Can Tito build a custom app for my business?",
    formSubject: "Custom solution inquiry",
  },
  teaser: {
    kicker: "Custom solutions",
    title: "Need something built for your business?",
    lead: "Mobile apps, web platforms, AI assistants and MVPs. See what I build and how we would work together.",
    cta: "Explore custom solutions",
    otherLanguage: "Ver en español",
  },
};

const es: SolutionsCopy = {
  meta: {
    title: "Soluciones a medida — apps, plataformas e IA",
    description: "Apps móviles, plataformas web, asistentes de IA y productos full-stack a medida, de la mano de Tito Agudelo, ingeniero senior que trabaja de forma remota desde Bogotá.",
  },
  hero: {
    kicker: "Soluciones a medida",
    title: "Software construido alrededor de tu negocio.",
    lead: "Apps móviles, plataformas web, asistentes de IA y productos full-stack: construidos, modernizados o revisados por un ingeniero senior que se mantiene cerca del trabajo.",
    primaryCta: "Empecemos a conversar",
    secondaryCta: "Mira lo que construyo",
    switchLabel: "View in English",
  },
  proof: [
    { value: `${yearsExperience} años`, label: "construyendo software en producción" },
    { value: "Desde 2016", label: "freelance a través de Toptal" },
    { value: "EN / ES", label: "español nativo, inglés profesional" },
  ],
  offers: {
    kicker: "Lo que construyo",
    title: "Seis formas en las que puedo ayudar.",
    askLabel: "Pregunta sobre esto",
    items: [
      {
        id: "mobile",
        title: "Apps móviles (React Native)",
        summary: "Apps multiplataforma creadas, ampliadas o estabilizadas con React Native y TypeScript.",
        examples: ["Un nuevo producto móvil", "Funcionalidades para una app existente", "Navegación, deep links y notificaciones push"],
        askQuestion: "¿Qué experiencia tiene Tito con React Native?",
      },
      {
        id: "web",
        title: "Plataformas web y herramientas internas",
        summary: "Aplicaciones web responsivas, paneles y herramientas de negocio con React y Next.js.",
        examples: ["Interfaces para SaaS", "Aplicaciones internas de negocio", "Paneles y vistas basadas en datos"],
        askQuestion: "¿Puede Tito construir una aplicación a medida para mi negocio?",
      },
      {
        id: "ai",
        title: "Asistentes de IA y automatización",
        summary: "Asistentes con LLM basados en tu propio contenido. Ask Tito, en este sitio, es un ejemplo en vivo.",
        examples: ["Chatbot basado en conocimiento", "Recuperación sobre tus documentos (RAG)", "Funcionalidades con LLM dentro de un producto existente"],
        askQuestion: "¿Qué proyectos de IA ha construido Tito?",
      },
      {
        id: "fullstack",
        title: "MVPs y productos full-stack",
        summary: "De la primera idea a un producto funcionando: frontend, APIs, datos y autenticación.",
        examples: ["MVP para una startup", "Autenticación y flujos de trabajo", "Integración de servicios de terceros"],
        askQuestion: "¿Puede Tito construir una aplicación a medida para mi negocio?",
      },
      {
        id: "modernization",
        title: "Modernización y rescate",
        summary: "Estabilizar y mejorar un código existente sin detener la entrega del producto.",
        examples: ["Migración de JavaScript a TypeScript", "Refactorización y pruebas", "Investigación de errores en producción"],
        askQuestion: "¿Qué experiencia tiene Tito modernizando código heredado?",
      },
      {
        id: "architecture",
        title: "Arquitectura y guía técnica",
        summary: "Decisiones técnicas prácticas para equipos que equilibran velocidad y mantenibilidad.",
        examples: ["Revisión de arquitectura", "Plan de modernización", "Liderazgo técnico para un proyecto"],
        askQuestion: "¿Qué experiencia de liderazgo tiene Tito?",
      },
    ],
  },
  process: {
    kicker: "Cómo trabajamos",
    title: "Cuatro pasos, en incrementos pequeños.",
    steps: [
      { title: "Entender", detail: "El problema de negocio, el entorno técnico actual, las restricciones y el resultado que buscas." },
      { title: "Definir", detail: "Una solución apropiada, con los compromisos explicados antes de construir nada." },
      { title: "Construir", detail: "Cambios entregados en incrementos manejables, comunicando bloqueos y riesgos a tiempo." },
      { title: "Lanzar y acompañar", detail: "Despliegue, mantenimiento continuo y mejora de lo que se construyó." },
    ],
  },
  engagement: {
    kicker: "Trabajemos juntos",
    title: "Elige el formato que encaje.",
    models: [
      { title: "Proyecto definido", detail: "Un producto, funcionalidad o migración específica con un resultado acordado." },
      { title: "Colaboración continua", detail: "Un ingeniero senior integrado al desarrollo del producto a largo plazo, el tipo de colaboración que prefiero." },
      { title: "Revisión y asesoría", detail: "Una revisión de arquitectura o guía técnica para un equipo ante una decisión difícil." },
    ],
    fitTitle: "Con quién trabajo",
    fit: [
      "Startups que construyen su primer producto",
      "Negocios en crecimiento que amplían aplicaciones existentes",
      "Equipos establecidos que necesitan capacidad senior en móvil o full-stack",
    ],
  },
  contact: {
    kicker: "Contacto",
    title: "Cuéntame qué necesitas construir.",
    lead: "Comparte el problema, el contexto y el resultado que buscas.",
    emailCta: "Escríbele a Tito",
    emailSubject: "Consulta de solución a medida",
    askFirst: "Pregúntale primero a Tito AI",
    askFirstQuestion: "¿Puede Tito construir una aplicación a medida para mi negocio?",
    formSubject: "Consulta de solución a medida",
  },
  teaser: {
    kicker: "Soluciones a medida",
    title: "¿Necesitas algo construido para tu negocio?",
    lead: "Apps móviles, plataformas web, asistentes de IA y MVPs. Mira lo que construyo y cómo trabajaríamos juntos.",
    cta: "Explorar soluciones a medida",
    otherLanguage: "Ver en español",
  },
};

export const SOLUTIONS_COPY: Readonly<Record<Locale, SolutionsCopy>> = { en, es };
