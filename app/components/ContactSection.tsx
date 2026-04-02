"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/titoAgudelo/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/titoagudelo/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:titoarturoagudelo@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px]"
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
          <span className="section-label mb-4">Contact</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Let&apos;s Build<span className="gradient-text"> Something Great</span>
          </h2>
          <p className="text-secondary text-lg mt-4 max-w-xl">
            I&apos;m always open to new opportunities and interesting projects.
            Drop me a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start"
        >
          {/* Left — Social Links */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Get in touch</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Whether you have a project in mind, want to collaborate, or
                just want to say hello — I&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300 group"
                >
                  <span className="text-muted group-hover:text-accent transition-colors">
                    {social.icon}
                  </span>
                  <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                    {social.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 gradient-border rounded-2xl">
            <div className="p-6 lg:p-8">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Message Sent!</h3>
                  <p className="text-secondary mt-2">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  <button onClick={() => setStatus("idle")} className="btn-outline text-sm mt-6">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-secondary">Email</label>
                    <input type="email" name="email" id="email" required placeholder="you@example.com" className="input-field" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-medium text-secondary">Subject</label>
                    <input type="text" name="subject" id="subject" required placeholder="What's this about?" className="input-field" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-secondary">Message</label>
                    <textarea name="message" id="message" required rows={5} placeholder="Tell me about your project..." className="input-field resize-none" />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email me directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
