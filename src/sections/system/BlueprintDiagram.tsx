import React from "react";

export interface SystemNode {
  id: string;
  category: string;
  name: string;
  role: string;
  specs: string[];
}

const ARCHITECTURE_NODES: SystemNode[] = [
  {
    id: "client-runtime",
    category: "EDGE CLIENT // 01",
    name: "Mobile & Web Runtime",
    role: "React Native / Expo / Next.js",
    specs: [
      "Deep Linking Engine",
      "Push Notification Lifecycle",
      "Offline Sync & State Store",
      "Feature Flag Client",
    ],
  },
  {
    id: "gateway-layer",
    category: "GATEWAY // 02",
    name: "API & Orchestration Layer",
    role: "GraphQL & REST Endpoints",
    specs: [
      "BFF (Backend for Frontend)",
      "Auth & Session Management",
      "Request Multiplexing",
      "Schema Validation (Zod)",
    ],
  },
  {
    id: "data-services",
    category: "DATA PIPELINE // 03",
    name: "Persistence & Event Bus",
    role: "PostgreSQL, Redis, OpenSearch",
    specs: [
      "High-Throughput Caching",
      "Search & Indexing Engine",
      "Event-Driven Workflows",
      "Vector Storage / Embeddings",
    ],
  },
  {
    id: "cloud-intelligence",
    category: "CLOUD & AI // 04",
    name: "Cloud Infra & AI Services",
    role: "AWS, Serverless, Python FastAPI",
    specs: [
      "Automated CI/CD Pipelines",
      "RAG Query & Agent Orchestration",
      "Observability & Telemetry",
      "Scalable Serverless Compute",
    ],
  },
];

export interface BlueprintDiagramProps {
  className?: string;
}

export function BlueprintDiagram({ className = "" }: BlueprintDiagramProps) {
  return (
    <div
      aria-label="System Architecture Blueprint Topology"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[rgba(201,147,46,0.2)] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C9932E]" aria-hidden="true" />
          <h3 className="font-mono text-xs sm:text-sm text-[#C9932E] tracking-wider uppercase font-medium">
            System Topology Blueprint // Data Flow & Integration
          </h3>
        </div>
        <span className="font-mono text-xs text-[#8A8A85]">
          ARCHITECTURE_MAP // V2.0
        </span>
      </div>

      {/* Blueprint Grid Diagram Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
        {ARCHITECTURE_NODES.map((node, index) => (
          <div
            key={node.id}
            className="relative p-5 sm:p-6 rounded border border-[rgba(201,147,46,0.22)] bg-[#141514]/80 flex flex-col justify-between space-y-4 hover:border-[rgba(201,147,46,0.45)] transition-colors"
          >
            {/* Top Coordinate Header */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#C9932E] tracking-wider uppercase font-medium">
                {node.category}
              </span>
              <span
                className="font-mono text-xs text-[#8A8A85]/50 select-none"
                aria-hidden="true"
              >
                [{String(index + 1).padStart(2, "0")}]
              </span>
            </div>

            {/* Node Title and Role */}
            <div className="space-y-1">
              <h4 className="font-display font-light text-xl sm:text-2xl text-[#F0EFED] tracking-tight">
                {node.name}
              </h4>
              <p className="font-mono text-xs text-[#C9932E]/90 font-medium">
                {node.role}
              </p>
            </div>

            {/* System Specifications */}
            <ul
              className="space-y-1.5 pt-3 border-t border-[rgba(240,239,237,0.06)]"
              aria-label={`Technical specifications for ${node.name}`}
            >
              {node.specs.map((spec) => (
                <li
                  key={spec}
                  className="font-mono text-[11px] sm:text-xs text-[#8A8A85] flex items-center gap-2"
                >
                  <span className="text-[#C9932E] select-none" aria-hidden="true">
                    ›
                  </span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            {/* Connector indicator for desktop */}
            {index < ARCHITECTURE_NODES.length - 1 && (
              <div
                className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 font-mono text-xs text-[#C9932E] select-none pointer-events-none"
                aria-hidden="true"
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Integration Flow Summary */}
      <div className="p-4 rounded border border-[rgba(240,239,237,0.08)] bg-[#0B0C0C] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8A8A85]">
        <div className="flex items-center gap-2">
          <span className="text-[#C9932E]">PIPELINE:</span>
          <span>CLIENT_EVENTS ⇄ GATEWAY_VALIDATION ⇄ PERSISTENCE ⇄ AI_INFERENCE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#C9932E]">SYNC_MODE:</span>
          <span>REACTIVE / EVENT-DRIVEN</span>
        </div>
      </div>
    </div>
  );
}

export default BlueprintDiagram;
