export default function RAGHero() {
  return (
    <section className="relative pt-20 lg:pt-28 pb-16 lg:pb-20">
      {/* Background ambience — same vocabulary as the home hero, dialed down */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="section-label mb-6">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          Deterministic retrieval demo
        </span>

        <h1 className="type-h1">RAG Lab</h1>

        <p className="mt-3 text-base sm:text-lg font-mono text-muted tracking-wide">
          Lexical retrieval · extractive synthesis
        </p>

        <p className="mt-8 text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
          Explore a transparent, in-memory retrieval pipeline built in TypeScript.
          It scores a curated corpus, ranks matching sources, and assembles an
          answer from that evidence without an external model.
        </p>

        <p className="mt-4 text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
          This is an educational approximation of a RAG architecture, not an LLM,
          embedding model, or vector database.
        </p>
      </div>
    </section>
  );
}
