import React from "react";

export interface ContactPanelProps {
  className?: string;
}

export function ContactPanel({ className = "" }: ContactPanelProps) {
  return (
    <div
      role="region"
      aria-label="Direct Project Inquiry and Contact"
      className={`relative p-6 sm:p-8 lg:p-10 rounded border border-[rgba(201,147,46,0.22)] bg-[#141514]/85 space-y-8 ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(201,147,46,0.18)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <span className="font-mono text-xs text-[#C9932E] tracking-wider uppercase font-medium">
            DIRECT_INQUIRY // INITIATE CONVERSATION
          </span>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          RESPONSE_SLA: &lt; 24_HOURS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Context & Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F0EFED] tracking-tight">
              Start a Conversation
            </h3>
            <p className="font-sans text-sm text-[#8A8A85] leading-relaxed">
              Have a mobile architecture challenge, an upcoming Expo migration, or need technical leadership for an AI-powered product? Send a direct message below.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4 pt-4 border-t border-[rgba(240,239,237,0.06)]">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#C9932E] uppercase tracking-wider block">
                DIRECT EMAIL:
              </span>
              <a
                href="mailto:tito@devwithtito.com"
                className="font-mono text-sm text-[#F0EFED] hover:text-[#C9932E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9932E]"
              >
                tito@devwithtito.com
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#C9932E] uppercase tracking-wider block">
                LOCATION & AVAILABILITY:
              </span>
              <p className="font-sans text-xs text-[#8A8A85]">
                Available for global remote engagements (US / LATAM / EU friendly timezones).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <form
          action="/api/send"
          method="POST"
          className="lg:col-span-7 space-y-4"
          aria-label="Direct message inquiry form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="font-mono text-xs text-[#F0EFED] block"
              >
                Name <span className="text-[#C9932E]">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded bg-[#0B0C0C] border border-[rgba(201,147,46,0.22)] text-sm text-[#F0EFED] placeholder-[#8A8A85]/50 focus-visible:outline-2 focus-visible:outline-[#C9932E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="font-mono text-xs text-[#F0EFED] block"
              >
                Email <span className="text-[#C9932E]">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded bg-[#0B0C0C] border border-[rgba(201,147,46,0.22)] text-sm text-[#F0EFED] placeholder-[#8A8A85]/50 focus-visible:outline-2 focus-visible:outline-[#C9932E] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-company"
                className="font-mono text-xs text-[#F0EFED] block"
              >
                Company / Project
              </label>
              <input
                type="text"
                id="contact-company"
                name="company"
                placeholder="Acme Corp"
                className="w-full px-3.5 py-2.5 rounded bg-[#0B0C0C] border border-[rgba(201,147,46,0.22)] text-sm text-[#F0EFED] placeholder-[#8A8A85]/50 focus-visible:outline-2 focus-visible:outline-[#C9932E] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-service"
                className="font-mono text-xs text-[#F0EFED] block"
              >
                Service of Interest
              </label>
              <select
                id="contact-service"
                name="service"
                defaultValue="react-native"
                className="w-full px-3.5 py-2.5 rounded bg-[#0B0C0C] border border-[rgba(201,147,46,0.22)] text-sm text-[#F0EFED] focus-visible:outline-2 focus-visible:outline-[#C9932E] transition-colors"
              >
                <option value="react-native">React Native Consulting</option>
                <option value="mobile-dev">Mobile Product Development</option>
                <option value="ai-dev">AI Product Development (RAG/Agents)</option>
                <option value="full-stack">Full Stack Engineering</option>
                <option value="arch-review">Architecture Review</option>
                <option value="fractional-lead">Fractional Technical Leadership</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-message"
              className="font-mono text-xs text-[#F0EFED] block"
            >
              Project Overview & Timeline <span className="text-[#C9932E]">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Tell me about your technical goals, timeline, and current system architecture..."
              className="w-full px-3.5 py-2.5 rounded bg-[#0B0C0C] border border-[rgba(201,147,46,0.22)] text-sm text-[#F0EFED] placeholder-[#8A8A85]/50 focus-visible:outline-2 focus-visible:outline-[#C9932E] transition-colors resize-y"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded border border-[#C9932E] bg-[#C9932E] text-[#0B0C0C] font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-transparent hover:text-[#F0EFED] focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2"
            >
              <span>Transmit Project Inquiry</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPanel;
