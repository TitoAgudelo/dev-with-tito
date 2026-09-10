import { Database, Search, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  label: string;
  detail: string;
}

const STEPS: ReadonlyArray<Step> = [
  {
    icon: Database,
    label: "Knowledge",
    detail: "A small curated corpus about my work, stack, and approach.",
  },
  {
    icon: Search,
    label: "Retrieve",
    detail: "Score documents against the query, return the top matches.",
  },
  {
    icon: MessageSquare,
    label: "Generate",
    detail: "Synthesize a grounded answer from the retrieved context.",
  },
];

export default function RAGExplainer() {
  return (
    <section className="py-16 lg:py-24">
      <div className="flex flex-col items-center text-center">
        <span className="section-label mb-4">RAG, in practice</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Why this demo <span className="gradient-text">exists</span>
        </h2>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Retrieval-Augmented Generation grounds an answer in trusted context
          instead of relying on a model&apos;s memory alone. The pipeline below
          runs entirely in this app — no external APIs — so you can read every
          line and see exactly how the data flows. The point isn&apos;t the
          novelty; it&apos;s the structure: deterministic retrieval, observable
          generation, typed boundaries between layers.
        </p>
      </div>

      <ol className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STEPS.map(({ icon: Icon, label, detail }, index) => (
          <li
            key={label}
            className="glass rounded-xl p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-md bg-elevated border border-border flex items-center justify-center text-accent">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted">
                Step {index + 1}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-primary">{label}</h3>
            <p className="text-xs text-secondary leading-relaxed">{detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
