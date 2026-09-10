import { Layers, Workflow, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FocusItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

const ITEMS: ReadonlyArray<FocusItem> = [
  {
    icon: Layers,
    title: "Architecture that survives",
    body: "Clear domain boundaries, small focused modules, and types that document intent — so the system is easy to change six months later, not just today.",
  },
  {
    icon: Workflow,
    title: "Systems thinking",
    body: "Treat data flow, failure modes, and observability as first-class concerns. The interesting bugs live between services, not inside them.",
  },
  {
    icon: Cpu,
    title: "Pragmatic problem solving",
    body: "Reach for the smallest tool that fits, ship a working slice, then harden where reality demands it. Avoid framework-driven architecture.",
  },
];

export default function RAGFocus() {
  return (
    <section className="py-16 lg:py-24">
      <div className="flex flex-col items-center text-center">
        <span className="section-label mb-4">Focus</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          What the work <span className="gradient-text">delivers</span>
        </h2>
        <p className="mt-4 text-secondary max-w-xl">
          Less buzzword bingo, more outcomes. The thread across my work is
          building software that ships, holds up under load, and stays
          maintainable.
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="glass rounded-2xl p-6 flex flex-col gap-3 hover:bg-elevated transition-colors duration-200"
          >
            <span className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <h3 className="text-base font-semibold text-primary">{title}</h3>
            <p className="text-sm text-secondary leading-relaxed">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
