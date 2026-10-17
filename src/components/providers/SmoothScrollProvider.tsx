"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";

export interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
    }
  ) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenisContext() {
  return useContext(LenisContext);
}

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Guard against prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // 2. Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 3. Start Request Animation Frame Loop
    function raf(time: number) {
      lenis.raf(time);
      rafHandleRef.current = requestAnimationFrame(raf);
    }
    rafHandleRef.current = requestAnimationFrame(raf);

    // 4. Global Hash Link Interception for Smooth Anchoring
    const handleHashClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -48, // Offset for top HUD height
            duration: 1.2,
          });

          // Update URL hash without jump
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleHashClick);

    // 5. Cleanup
    return () => {
      document.removeEventListener("click", handleHashClick);
      if (rafHandleRef.current) {
        cancelAnimationFrame(rafHandleRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
    }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -48,
        duration: options?.duration ?? 1.2,
        easing: options?.easing,
        immediate: options?.immediate ?? false,
      });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export default SmoothScrollProvider;
