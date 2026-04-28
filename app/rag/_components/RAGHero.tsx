"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function RAGHero() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
      className="relative pt-32 lg:pt-40 pb-16 lg:pb-20"
    >
      {/* Background ambience — same vocabulary as the home hero, dialed down */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span variants={fadeUp} className="section-label mb-6">
          <span className="w-2 h-2 rounded-full bg-accent" />
          Live RAG demo
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
        >
          Tito Agudelo
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-3 text-base sm:text-lg font-mono text-muted tracking-wide"
        >
          Senior Software Engineer
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-secondary text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          I&apos;m a Senior Software Engineer with{" "}
          <span className="text-primary font-medium">13+ years</span> building
          web and mobile applications, mainly using React, Next.js, and the
          modern JavaScript ecosystem. I&apos;ve worked with startups and large
          companies in distributed teams, designing scalable systems, real-time
          applications, and data-driven products.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-secondary text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          Recently I&apos;ve focused on integrating AI into real-world
          applications —{" "}
          <span className="gradient-text font-medium">
            LLMs, RAG pipelines, and automation workflows
          </span>
          . I care about clean architecture, strong UX, and reliable systems.
        </motion.p>
      </div>
    </motion.section>
  );
}
