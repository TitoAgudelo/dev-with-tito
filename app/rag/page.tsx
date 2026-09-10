import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";
import ContactCTA from "../components/content/ContactCTA";
import RAGHero from "./_components/RAGHero";
import RAGAbout from "./_components/RAGAbout";
import RAGFocus from "./_components/RAGFocus";
import RAGExplainer from "./_components/RAGExplainer";
import RAGDemo from "./_components/RAGDemo";

export const metadata: Metadata = createPageMetadata({
  title: "TypeScript Retrieval and RAG Lab",
  description:
    "A transparent TypeScript demo of deterministic lexical retrieval, ranked sources, and extractive synthesis. No external model or API.",
  path: "/rag",
});

export default function RAGPage() {
  return (
    <>
      <div className="container-main relative">
        <div className="mx-auto max-w-3xl">
          <RAGHero />
          <RAGAbout />
          <RAGFocus />
          <RAGExplainer />
          <RAGDemo />
        </div>
      </div>
      <ContactCTA
        title="Evaluating applied AI or retrieval architecture?"
        description="Explore the broader AI-assisted engineering approach, or start a conversation about the constraints in your own system."
      />
    </>
  );
}
