"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Fixed top progress bar showing scroll position.
 * Uses a single spring — cheap, no per-frame React state updates.
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) {
    return (
      <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-gradient-wa opacity-60" />
    );
  }

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-wa shadow-[0_0_12px_rgba(37,211,102,0.6)]"
    />
  );
}
