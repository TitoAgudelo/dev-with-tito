import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { createPageMetadata } from "../../lib/metadata";

const AskTitoChat = dynamic(() => import("../components/ask-tito/AskTitoChat"), {
  loading: () => <div className="ask-console ask-console--loading" role="status">Preparing the career assistant…</div>,
});

export const metadata: Metadata = createPageMetadata({
  title: "Ask Tito AI — Career Assistant",
  description: "Ask grounded questions about Tito Agudelo's experience, projects, architecture work, technical leadership, and AI systems.",
  path: "/ask",
});

export default function AskTitoPage() {
  return (
    <div className="ask-page">
      <div className="ask-page__grid" aria-hidden="true" />
      <header className="experience-container ask-hero">
        <p className="experience-kicker">Grounded career intelligence · Local RAG</p>
        <h1>Ask Tito</h1>
        <p>Ask anything about my experience,<br />architecture work, AI projects,<br />or leadership background.</p>
        <div className="ask-hero__status"><i aria-hidden="true" /><span>Answers are restricted to retrieved career context</span></div>
      </header>
      <div className="experience-container ask-page__content">
        <AskTitoChat />
        <aside className="ask-disclosure" aria-label="How Ask Tito AI works">
          <span>Retrieval path</span>
          <ol>
            <li>Question embedding</li><li>Chroma search</li><li>Top-five context</li><li>Grounded Qwen response</li>
          </ol>
          <p>Ask Tito will say when the knowledge base does not contain an answer. It does not browse the web or answer general questions.</p>
        </aside>
      </div>
    </div>
  );
}
