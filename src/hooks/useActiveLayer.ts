"use client";

import { useState, useEffect } from "react";

export type LayerId =
  | "infrastructure"
  | "system"
  | "product"
  | "experience"
  | "business";

export interface LayerInfo {
  id: LayerId;
  index: number;
  code: string;
  label: string;
  hash: string;
}

export const LAYERS: LayerInfo[] = [
  {
    id: "infrastructure",
    index: 1,
    code: "01/05",
    label: "INFRASTRUCTURE",
    hash: "#infrastructure",
  },
  {
    id: "system",
    index: 2,
    code: "02/05",
    label: "SYSTEM",
    hash: "#system",
  },
  {
    id: "product",
    index: 3,
    code: "03/05",
    label: "PRODUCT",
    hash: "#product",
  },
  {
    id: "experience",
    index: 4,
    code: "04/05",
    label: "EXPERIENCE",
    hash: "#experience",
  },
  {
    id: "business",
    index: 5,
    code: "05/05",
    label: "BUSINESS",
    hash: "#business",
  },
];

export interface ActiveLayerState {
  activeLayer: LayerInfo;
  progress: number; // 0.0 to 1.0
  isScrolled: boolean;
}

export function useActiveLayer(): ActiveLayerState {
  const [activeLayer, setActiveLayer] = useState<LayerInfo>(LAYERS[0]);
  const [progress, setProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress =
        docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      setProgress(currentProgress);
      setIsScrolled(scrollY > 20);

      // Determine active layer by section bounding client rect
      const layerElements = LAYERS.map((layer) => ({
        layer,
        element: document.getElementById(layer.id),
      }));

      // Find the element whose top is closest to the upper third of viewport
      const threshold = window.innerHeight * 0.35;
      let currentActive = LAYERS[0];

      for (const { layer, element } of layerElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            currentActive = layer;
            break;
          }
        }
      }

      // If scrolled to very bottom, default to business
      if (currentProgress >= 0.96) {
        currentActive = LAYERS[LAYERS.length - 1];
      }

      setActiveLayer((prev) => (prev.id !== currentActive.id ? currentActive : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { activeLayer, progress, isScrolled };
}

export default useActiveLayer;
