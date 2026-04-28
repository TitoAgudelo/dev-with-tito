"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const facts: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Years in software", value: "13+" },
  { label: "Remote since", value: "2016" },
  { label: "Team footprint", value: "US + global" },
  { label: "Primary stack", value: "React · Next.js · TS" },
];

export default function RAGAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <span className="section-label mb-4">About</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Senior engineer, <span className="gradient-text">remote-first since 2016</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-10 flex flex-col gap-5 max-w-2xl mx-auto"
      >
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Over the last 13+ years I&apos;ve shipped production software for
          early-stage startups and large companies — full-stack web,
          React Native mobile, real-time data products, and the supporting
          backend services that keep them honest.
        </p>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          I&apos;ve been fully remote since 2016, working with distributed
          teams across the United States and internationally. I own work
          end-to-end, communicate asynchronously, and care just as much about
          the systems we build as the people we build them with.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="glass rounded-xl p-4 flex flex-col items-center text-center"
          >
            <span className="text-lg font-semibold text-primary">{fact.value}</span>
            <span className="text-[11px] uppercase tracking-wider text-muted mt-1 font-mono">
              {fact.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
