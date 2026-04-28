import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RAGHero from "./_components/RAGHero";
import RAGAbout from "./_components/RAGAbout";
import RAGFocus from "./_components/RAGFocus";
import RAGExplainer from "./_components/RAGExplainer";
import RAGDemo from "./_components/RAGDemo";

export const metadata: Metadata = {
  title: "RAG Demo · Tito Agudelo",
  description:
    "An end-to-end Retrieval-Augmented Generation demo built in TypeScript — typed pipeline, deterministic retrieval, observable generation. No external APIs.",
  openGraph: {
    title: "RAG Demo · Tito Agudelo",
    description:
      "End-to-end RAG pipeline in TypeScript. Senior engineer's take on grounded LLM patterns.",
    url: "https://devwithtito.com/rag",
    siteName: "Dev With Tito",
    type: "website",
  },
};

export default function RAGPage() {
  return (
    <main className="relative">
      <Navbar />
      <div className="container-main relative">
        <div className="mx-auto max-w-3xl">
          <RAGHero />
          <RAGAbout />
          <RAGFocus />
          <RAGExplainer />
          <RAGDemo />
        </div>
      </div>
      <Footer />
    </main>
  );
}
