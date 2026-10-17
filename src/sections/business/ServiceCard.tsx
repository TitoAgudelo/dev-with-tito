import React from "react";

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  return (
    <article
      id={`service-${service.id}`}
      aria-labelledby={`service-heading-${service.id}`}
      className={`relative p-6 sm:p-7 rounded border border-[rgba(201,147,46,0.2)] bg-[#141514]/80 flex flex-col justify-between space-y-5 hover:border-[rgba(201,147,46,0.45)] transition-colors ${className}`}
    >
      {/* Blueprint Top Marker */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[#C9932E] font-medium tracking-wider uppercase">
          {service.code}
        </span>
        <span
          className="font-mono text-xs text-[#C9932E]/40 select-none"
          aria-hidden="true"
        >
          +
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-3">
        <h3
          id={`service-heading-${service.id}`}
          className="font-display font-light text-2xl text-[#F0EFED] tracking-tight leading-snug"
        >
          {service.title}
        </h3>

        <p className="font-sans text-sm text-[#8A8A85] leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Target Audience */}
      <div className="pt-3 border-t border-[rgba(240,239,237,0.06)] space-y-1">
        <span className="font-mono text-[10px] text-[#C9932E] uppercase tracking-wider block">
          Target Audience:
        </span>
        <p className="font-sans text-xs text-[#F0EFED]/90 leading-normal">
          {service.idealFor}
        </p>
      </div>

      {/* Deliverables List */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] text-[#8A8A85] uppercase tracking-wider block">
          Core Focus & Deliverables:
        </span>
        <ul
          className="flex flex-wrap gap-1.5"
          aria-label={`Deliverables for ${service.title}`}
        >
          {service.deliverables.map((item) => (
            <li
              key={item}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#0B0C0C] text-[#8A8A85] border border-[rgba(240,239,237,0.08)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ServiceCard;
