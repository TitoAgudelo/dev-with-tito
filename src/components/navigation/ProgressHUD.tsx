"use client";

import React, { useState } from "react";
import { useActiveLayer, LAYERS, LayerInfo } from "@/hooks/useActiveLayer";
import { useLenisContext } from "@/components/providers/SmoothScrollProvider";

export interface ProgressHUDProps {
  className?: string;
}

export function ProgressHUD({ className = "" }: ProgressHUDProps) {
  const { activeLayer, progress, isScrolled } = useActiveLayer();
  const { scrollTo } = useLenisContext();
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  const percent = Math.round(progress * 100);

  const handleLayerClick = (layer: LayerInfo) => {
    scrollTo(layer.hash, { offset: -48, duration: 1.2 });
    setIsLayerMenuOpen(false);
  };

  return (
    <header
      role="navigation"
      aria-label="System Assembly Stratum Navigation and Telemetry"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#0B0C0C]/90 backdrop-blur-md border-b border-[rgba(201,147,46,0.2)]"
          : "bg-[#0B0C0C]/60 backdrop-blur-sm border-b border-[rgba(240,239,237,0.06)]"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-11 sm:h-12 flex items-center justify-between gap-3">
        {/* Left: Brand Identity & Title */}
        <div className="flex items-center gap-3">
          <a
            href="#infrastructure"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#infrastructure", { offset: 0 });
            }}
            className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2 rounded"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#C9932E] group-hover:scale-125 transition-transform"
              aria-hidden="true"
            />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#F0EFED] group-hover:text-[#C9932E] transition-colors">
              TITO AGUDELO
            </span>
            <span className="hidden md:inline font-mono text-[11px] text-[#8A8A85]">
              {"// STAFF & MOBILE ARCHITECT"}
            </span>
          </a>
        </div>

        {/* Center: Active Layer Telemetry Indicator */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLayerMenuOpen((prev) => !prev)}
            aria-expanded={isLayerMenuOpen}
            aria-controls="layer-quick-menu"
            className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#141514] border border-[rgba(201,147,46,0.25)] hover:border-[#C9932E] font-mono text-[11px] sm:text-xs text-[#F0EFED] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9932E]"
          >
            <span className="text-[#C9932E] font-medium hidden xs:inline">
              LAYER [{activeLayer.code}]
            </span>
            <span className="text-[#8A8A85]/50 hidden xs:inline">•</span>
            <span className="text-[#F0EFED] font-medium">
              {activeLayer.label}
            </span>
            <span className="text-[#C9932E] text-[10px] select-none ml-1" aria-hidden="true">
              {isLayerMenuOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Stratum Quick-Menu Dropdown */}
          {isLayerMenuOpen && (
            <div
              id="layer-quick-menu"
              className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-64 bg-[#141514] border border-[rgba(201,147,46,0.3)] rounded shadow-2xl p-1.5 space-y-1 font-mono text-xs z-50 backdrop-blur-xl"
            >
              <div className="px-2 py-1 text-[10px] text-[#8A8A85] uppercase tracking-wider border-b border-[rgba(240,239,237,0.06)]">
                System Strata Jump
              </div>
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleLayerClick(layer)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors ${
                    activeLayer.id === layer.id
                      ? "bg-[#C9932E]/15 text-[#C9932E] font-medium border border-[rgba(201,147,46,0.3)]"
                      : "text-[#F0EFED] hover:bg-[#0B0C0C] hover:text-[#C9932E]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] text-[#8A8A85]">
                      {layer.code}
                    </span>
                    <span>{layer.label}</span>
                  </span>
                  {activeLayer.id === layer.id && (
                    <span className="text-[10px] text-[#C9932E]" aria-hidden="true">
                      ACTIVE
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Progress Metric & Global Conversion CTA */}
        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-1 font-mono text-xs text-[#8A8A85]"
            aria-label={`Overall System Assembly: ${percent} percent complete`}
          >
            <span>{percent}%</span>
          </div>

          {/* Global CTA */}
          <a
            href="#business"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#business", { offset: -48 });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded border border-[#C9932E] bg-transparent text-[#F0EFED] font-mono text-xs tracking-wider uppercase transition-colors hover:bg-[#C9932E] hover:text-[#0B0C0C] focus-visible:outline-2 focus-visible:outline-[#C9932E] focus-visible:outline-offset-2 font-medium"
          >
            <span>Book Discovery</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Linear 1.5px Blueprint Progress Track */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[rgba(240,239,237,0.06)] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#C9932E] transition-all duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}

export default ProgressHUD;
