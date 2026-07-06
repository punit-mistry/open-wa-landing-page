"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` if the user has requested reduced motion.
 * Used to automatically simplify animations on accessibility-flagged devices.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update, { passive: true } as any);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
