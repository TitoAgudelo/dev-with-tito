"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TechItem {
  name: string;
  icon: string;
}

const categories: { title: string; items: TechItem[] }[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "React Native", icon: "📱" },
      { name: "Framer Motion", icon: "✨" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "🟢" },
      { name: "GraphQL", icon: "◈" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Redis", icon: "🔴" },
      { name: "Express", icon: "⚡" },
      { name: "REST APIs", icon: "🔗" },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: "☁️" },
      { name: "Azure", icon: "🔷" },
      { name: "Docker", icon: "🐳" },
      { name: "CI/CD", icon: "🔄" },
      { name: "Serverless", icon: "λ" },
      { name: "Kubernetes", icon: "⎈" },
    ],
  },
  {
    title: "AI & Automation",
    items: [
      { name: "OpenAI", icon: "🤖" },
      { name: "Claude AI", icon: "🧠" },
      { name: "AWS Bedrock", icon: "🪨" },
      { name: "n8n", icon: "🔧" },
      { name: "LangChain", icon: "🔗" },
      { name: "RAG Systems", icon: "📚" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Subtle background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px]"
        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        {/* Header — centered */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <span className="section-label mb-4">Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Tools I<span className="gradient-text"> Work With</span>
          </h2>
        </motion.div>

        {/* 2x2 Grid of categories */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              <h3 className="text-sm font-mono font-medium tracking-wider uppercase text-muted mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {category.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06] transition-all duration-300 cursor-default"
                  >
                    <span className="text-2xl" role="img" aria-label={tech.name}>
                      {tech.icon}
                    </span>
                    <span className="text-xs font-medium text-secondary group-hover:text-primary transition-colors text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
