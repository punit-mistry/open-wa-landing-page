"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Lightweight Lenis smooth-scroll wrapper.
 * - Honours prefers-reduced-motion (disables smoothing entirely).
 * - Auto-disables on touch / coarse pointer for native momentum feel.
 * - Uses requestAnimationFrame only — no extra listeners on scroll.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (coarse) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth-scroll for in-page anchor clicks
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
    };
    document.addEventListener("click", handleAnchor, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchor);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
