"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "125+", label: "Projects Delivered" },
  { value: "100K+", label: "Users Impacted" },
  { value: "7", label: "Featured Projects" },
];

const timeline = [
  {
    period: "2024 — Present",
    role: "Lead Software Engineer",
    detail: "AI-augmented delivery, agentic systems, Next.js architecture",
    active: true,
  },
  {
    period: "2020 — 2024",
    role: "Senior Full-Stack Engineer",
    detail: "Enterprise platforms, React Native, cloud-native solutions",
    active: false,
  },
  {
    period: "2016 — 2020",
    role: "Software Engineer",
    detail: "E-commerce, marketplace platforms, API development",
    active: false,
  },
  {
    period: "2012 — 2016",
    role: "Frontend Developer",
    detail: "Web applications, responsive design, JavaScript frameworks",
    active: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      <div className="container-main">
        {/* Section Header — centered */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <span className="section-label mb-4">About Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Bridging Engineering
            <span className="gradient-text"> & AI Innovation</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Story */}
          <motion.div
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            <p className="text-secondary text-lg leading-relaxed">
              I&apos;m a full-stack engineer passionate about building products that
              matter. Over the past 12+ years, I&apos;ve shipped scalable solutions
              across web, mobile, and serverless environments — from
              high-traffic marketplaces to AI-powered booking systems.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              I specialize in AI-augmented software delivery, integrating
              OpenAI, Anthropic Claude, AWS Bedrock, and n8n automation
              pipelines with modern architectures. I design developer workflows
              powered by OpenAPI Codegen, React Query, and custom CI/CD systems
              on Azure and AWS.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              My mission: bridge traditional engineering with agentic AI
              systems, memory persistence, and generative workflows that
              multiply human productivity.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl p-4 flex flex-col items-center text-center"
                >
                  <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                  <span className="text-xs text-muted mt-1 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={fadeUp}
            className="flex flex-col"
          >
            <h3 className="text-sm font-mono font-medium tracking-wider uppercase text-muted mb-8">
              Career Timeline
            </h3>
            <div className="flex flex-col gap-8 relative">
              {/* Vertical line */}
              <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/[0.06]" />

              {timeline.map((entry) => (
                <div key={entry.period} className="relative pl-8 flex flex-col">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-[6px] w-[7px] h-[7px] rounded-full ${
                      entry.active ? "bg-accent" : "bg-muted"
                    }`}
                  />
                  <span className="text-xs font-mono text-muted tracking-wider">{entry.period}</span>
                  <h4 className="text-lg font-semibold text-primary mt-1">{entry.role}</h4>
                  <p className="text-secondary text-sm mt-1">{entry.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
