"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  tech: string[];
  color: string;
  tag: string[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Marketplace Platform",
    company: "TaskRabbit",
    description:
      "Built scalable marketplace features connecting users with local service providers. Worked on matching algorithms, real-time messaging, and payment integrations for IKEA's acquired platform serving millions of users.",
    tech: ["React", "Ruby on Rails", "PostgreSQL", "Redis", "AWS"],
    color: "#0D7A5F",
    tag: ["All", "Web"],
  },
  {
    id: 2,
    title: "Sports E-Commerce",
    company: "Fanatics",
    description:
      "Engineered high-traffic e-commerce experiences for major sports leagues (NFL, NBA, MLB). Built checkout systems, inventory management, and personalization features handling massive game-day traffic spikes.",
    tech: ["React", "Node.js", "Microservices", "AWS", "Kubernetes"],
    color: "#1E40AF",
    tag: ["All", "Web"],
  },
  {
    id: 3,
    title: "Event Tickets App",
    company: "Gametime",
    description:
      "Developed a mobile-first experience for last-minute event ticket purchases. Built dynamic pricing, real-time inventory systems, and a frictionless checkout flow for sports, concerts, and theater events.",
    tech: ["React Native", "Node.js", "Python", "AWS"],
    color: "#7C3AED",
    tag: ["All", "Mobile"],
  },
  {
    id: 4,
    title: "Food Tech Platform",
    company: "Food is Good",
    description:
      "Full-stack development for a food-tech startup, building the MVP from scratch. Designed ordering systems, restaurant integrations, and user-facing interfaces with a small, fast-moving team.",
    tech: ["React", "Node.js", "PostgreSQL", "Express"],
    color: "#C2410C",
    tag: ["All", "Web"],
  },
  {
    id: 5,
    title: "Business Process Management",
    company: "iGrafx",
    description:
      "Enterprise BPM software for process modeling, mining, and optimization. Built complex visualization tools, data analytics dashboards, and integration layers for large-scale organizational compliance.",
    tech: ["React", "TypeScript", "Java", ".NET", "Enterprise"],
    color: "#0284C7",
    tag: ["All", "Web"],
  },
];

const tags = ["All", "Web", "Mobile"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectsSection() {
  const [activeTag, setActiveTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = projectsData.filter((p) => p.tag.includes(activeTag));

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      <div className="container-main">
        {/* Header — centered */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <span className="section-label mb-4">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Featured<span className="gradient-text"> Projects</span>
          </h2>
        </motion.div>

        {/* Filter — centered */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={fadeUp}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTag === tag
                  ? "bg-white/10 text-white border border-white/[0.1]"
                  : "text-muted hover:text-secondary border border-transparent"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              layout
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className={`group gradient-border rounded-2xl overflow-hidden ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Color accent bar */}
              <div className="h-1 w-full" style={{ background: project.color }} />

              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex flex-col">
                    <span
                      className="text-xs font-mono font-semibold tracking-wider uppercase"
                      style={{ color: project.color }}
                    >
                      {project.company}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-primary mt-1">
                      {project.title}
                    </h3>
                  </div>
                  <svg
                    className="w-5 h-5 text-muted shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                <p className="text-secondary leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-white/[0.04] text-muted border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
