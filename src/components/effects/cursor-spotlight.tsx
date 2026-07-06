"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Cursor spotlight — green aura follows the mouse.
 * Uses CSS variables + a single rAF-throttled mousemove listener.
 * Disabled on touch / reduced-motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${pendingX}px`);
          el.style.setProperty("--my", `${pendingY}px`);
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;
  return <div ref={ref} className="cursor-spotlight" aria-hidden />;
}
