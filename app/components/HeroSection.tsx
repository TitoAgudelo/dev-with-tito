"use client";

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Content */}
      <div className="container-main relative z-10 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Text — centered on mobile, left on desktop */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-6">
              <span className="section-label">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="gradient-text">Hello, I&apos;m</span>
              <br />
              <TypeAnimation
                sequence={[
                  "Tito Agudelo",
                  2000,
                  "a Lead Engineer",
                  1500,
                  "a Mobile Engineer",
                  1500,
                  "an AI-Driven Builder",
                  1500,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="text-secondary text-lg lg:text-xl leading-relaxed max-w-xl mb-10"
            >
              12+ years building scalable full-stack and cloud solutions across
              web, mobile, and serverless. Specialized in AI-augmented delivery
              with Next.js, Node.js, and GraphQL architectures.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="#contact" className="btn-glow">
                Get in Touch
              </Link>
              <Link
                href="/docs/Tito-Agudelo-Resume-2025.pdf"
                download
                className="btn-outline"
                aria-label="Download my resume as a PDF"
              >
                Download Resume
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" as const }}
            className="shrink-0 flex items-center justify-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-full opacity-40 blur-3xl"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
                aria-hidden="true"
              />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/[0.06]">
                <Image
                  src="/images/hero-image-ava.png"
                  alt="Tito Agudelo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="hidden lg:flex flex-col items-center gap-2 mt-20"
        >
          <span className="text-xs font-mono text-muted tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
