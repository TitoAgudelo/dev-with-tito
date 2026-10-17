export interface KnowledgeFile {
  name: string;
  type: "file";
  title: string;
  category: string;
  content: string[];
  citation: string;
}

export interface KnowledgeDirectory {
  name: string;
  type: "dir";
  files: Record<string, KnowledgeFile>;
}

export interface KnowledgeFileSystem {
  rootFiles: Record<string, KnowledgeFile>;
  directories: Record<string, KnowledgeDirectory>;
}

export const KNOWLEDGE_BASE: KnowledgeFileSystem = {
  rootFiles: {
    "about.md": {
      name: "about.md",
      type: "file",
      title: "About Tito Agudelo",
      category: "PROFILE",
      citation: "knowledge/about.md",
      content: [
        "# Tito Agudelo — Staff Software Engineer & Mobile Architect",
        "",
        "I build software products that combine strong engineering foundations with exceptional user experiences.",
        "",
        "Key Highlights:",
        "• 15+ years of experience across mobile applications, ecommerce platforms, marketplaces, enterprise systems, and AI-powered products.",
        "• Primary focus: Designing scalable systems, improving developer velocity, and delivering products that create measurable business impact.",
        "• Core domains: React Native, full-stack product development, AI systems, and software architecture.",
        "• Engineering philosophy: Solving complex technical challenges while keeping user and developer experiences simple and intuitive.",
      ],
    },
    "experience.md": {
      name: "experience.md",
      type: "file",
      title: "Work Experience & History",
      category: "CAREER_TIMELINE",
      citation: "knowledge/experience.md",
      content: [
        "# Career Experience Summary",
        "",
        "Staff-level software engineer with more than 15 years of experience building mobile, web, cloud, and AI-powered products.",
        "Specialized in React Native, product architecture, full-stack development, and technical leadership.",
        "",
        "Selected Companies & Engagements:",
        "1. Gametime — Senior React Native Engineer (Live event ticketing marketplace, deep linking, push systems, experimentation platforms)",
        "2. Fanatics — Software Engineer (High-scale sports ecommerce, mobile checkout optimization, performance tuning)",
        "3. TaskRabbit — Senior Mobile Engineer (On-demand marketplace, JavaScript to TypeScript migration, Jest/Detox test suite)",
        "4. Toptal — Senior Consultant / Senior Software Engineer (2016 – Present, enterprise client modernization: Google Fiber, ConsumerAffairs, Huge)",
        "5. X-Team — Senior Software Engineer (Remote product engineering, frontend architecture, modern web technologies)",
        "6. Huge — Software Engineer (Digital transformation, enterprise UX, large-scale web products)",
      ],
    },
    "skills.md": {
      name: "skills.md",
      type: "file",
      title: "Technical Skills Matrix",
      category: "COMPETENCY",
      citation: "knowledge/skills.md",
      content: [
        "# Technical Skills Matrix",
        "",
        "• Mobile Engineering: React Native, Expo, Deep Linking, Push Notifications, Mobile Architecture, Performance Optimization",
        "• Frontend Systems: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP",
        "• Backend & APIs: Node.js, Python, FastAPI, GraphQL, REST APIs",
        "• Data & Storage: PostgreSQL, Redis, OpenSearch, Vector Databases",
        "• Cloud Infrastructure: AWS, CI/CD, Serverless Architectures",
        "• Artificial Intelligence: RAG Systems, AI Agents, OpenAI, Anthropic, Vector Databases, Workflow Automation",
        "• Technical Leadership: Technical Strategy, System Design, Architecture Reviews, Product Engineering, Team Mentoring",
      ],
    },
    "services.md": {
      name: "services.md",
      type: "file",
      title: "Consulting Practices & Services",
      category: "SERVICES",
      citation: "knowledge/services.md",
      content: [
        "# Consulting Services & Leadership",
        "",
        "1. React Native Consulting — Architecture reviews, performance optimization, Expo migrations, deep linking, and navigation strategies.",
        "2. Mobile Product Development — End-to-end mobile product design and implementation using React Native and modern engineering practices.",
        "3. AI Product Development — RAG platforms, AI agents, automation workflows, knowledge systems, and LLM integrations.",
        "4. Full Stack Engineering — Modern web and backend development using React, Next.js, Node.js, Python, PostgreSQL, and cloud infrastructure.",
        "5. Architecture Reviews — Evaluation of technical systems, identification of bottlenecks, and recommendations for scalable growth.",
        "6. Fractional Technical Leadership — Technical planning, architecture guidance, engineering mentoring, and product strategy support.",
      ],
    },
    "contact.txt": {
      name: "contact.txt",
      type: "file",
      title: "Contact Information",
      category: "CONTACT",
      citation: "knowledge/services.md",
      content: [
        "# Contact Channels & Scheduling",
        "",
        "• Direct Email: tito@devwithtito.com",
        "• Discovery Call: 30-min architecture consultation (https://calendly.com/titoagudelo)",
        "• Availability: Open for consulting, architecture reviews, and fractional technical leadership.",
        "• Response SLA: Under 24 hours.",
      ],
    },
    "resume.txt": {
      name: "resume.txt",
      type: "file",
      title: "Resume Overview",
      category: "RESUME",
      citation: "knowledge/experience.md",
      content: [
        "# Tito Agudelo — Executive Resume Summary",
        "",
        "Role: Staff Software Engineer & Mobile Architect",
        "Experience: 15+ Years",
        "Core Specialties: React Native, Mobile Platform Architecture, Full-Stack Next.js/Node/Python, AI/RAG Systems",
        "Selected Clients: Gametime, Fanatics, TaskRabbit, Google Fiber, Huge, Toptal",
        "Direct PDF download available via Top HUD.",
      ],
    },
  },
  directories: {
    projects: {
      name: "projects",
      type: "dir",
      files: {
        "gametime.md": {
          name: "gametime.md",
          type: "file",
          title: "Gametime Mobile Marketplace",
          category: "PROJECT",
          citation: "knowledge/projets/gametime.md",
          content: [
            "# Gametime — Senior React Native Engineer",
            "",
            "Company: Mobile-first live event ticket marketplace focusing on speed, transparent pricing, and last-minute ticket access.",
            "",
            "Focus Areas & Contributions:",
            "• Designed and built mobile features for high-concurrency ticket purchasing.",
            "• Architected resilient deep linking infrastructure and Android/iOS push notification onboarding.",
            "• Developed experimentation platforms (A/B testing) for rapid growth and user activation rollouts.",
            "• Optimized mobile application performance and solved complex runtime lifecycle edge cases.",
            "",
            "Technologies: React Native, Expo, TypeScript, Redux, Analytics, Feature Flags, REST APIs.",
          ],
        },
        "fanatics.md": {
          name: "fanatics.md",
          type: "file",
          title: "Fanatics High-Scale Ecommerce",
          category: "PROJECT",
          citation: "knowledge/experience.md",
          content: [
            "# Fanatics — Software Engineer",
            "",
            "Company: Global sports ecommerce platform serving millions of fans.",
            "",
            "Focus Areas & Contributions:",
            "• Mobile commerce architecture and customer experience enhancement.",
            "• Performance optimization for high-traffic merchandise surges during championship events.",
            "• High-volume product delivery and seamless mobile checkout flows.",
            "",
            "Technologies: React Native, Mobile Commerce, REST APIs, Performance Optimization.",
          ],
        },
        "taskrabbit.md": {
          name: "taskrabbit.md",
          type: "file",
          title: "TaskRabbit Marketplace",
          category: "PROJECT",
          citation: "knowledge/projets/taskrabbit.md",
          content: [
            "# TaskRabbit — Senior Mobile Engineer",
            "",
            "Company: On-demand marketplace platform connecting customers with skilled service professionals.",
            "",
            "Focus Areas & Contributions:",
            "• Led the TypeScript migration of the core React Native application from legacy JavaScript.",
            "• Built automated testing infrastructure using Jest and Detox end-to-end test suites.",
            "• Engineered real-time REST backend integrations for task dispatch and messaging.",
            "• Significantly improved developer velocity, code maintainability, and release stability.",
            "",
            "Technologies: React Native, TypeScript, Node.js, Jest, Detox, REST APIs.",
          ],
        },
        "toptal.md": {
          name: "toptal.md",
          type: "file",
          title: "Toptal Senior Engineering Consulting",
          category: "PROJECT",
          citation: "knowledge/projets/toptal.md",
          content: [
            "# Toptal — Senior Consultant / Senior Software Engineer (2016 – Present)",
            "",
            "Company: Global network of senior software engineers serving enterprise and high-growth clients.",
            "",
            "Representative Client Engagements:",
            "• TaskRabbit: React Native feature engineering and TypeScript migration.",
            "• Google Fiber: Frontend architecture, Web Components, and modern JavaScript.",
            "• ConsumerAffairs: Scalable frontend systems, AngularJS, Django, and Node.js.",
            "• Huge: Large-scale digital experience platforms and enterprise frontend systems.",
            "",
            "Technologies: React, React Native, Next.js, TypeScript, Node.js, Architecture Reviews.",
          ],
        },
      },
    },
  },
};
