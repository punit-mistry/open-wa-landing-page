"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Confetti burst — fires when `trigger` becomes true.
 * Lightweight: pure CSS animation, no library. Auto-cleans after 2.5s.
 */
export function Confetti({ trigger }: { trigger: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; dx: number; dy: number; color: string; rot: number; delay: number }>>([]);

  useEffect(() => {
    if (!trigger || reduced) return;
    const colors = ["#25D366", "#128C7E", "#53BDEB", "#DCF8C6", "#075E54"];
    const newPieces = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      dx: (Math.random() - 0.5) * 400,
      dy: window.innerHeight + 100,
      color: colors[i % colors.length],
      rot: Math.random() * 360,
      delay: Math.random() * 0.3,
    }));
    // Defer state update outside the synchronous effect body to avoid cascading renders
    const raf = requestAnimationFrame(() => {
      setPieces(newPieces);
    });
    const t = setTimeout(() => setPieces([]), 2800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [trigger, reduced]);

  if (reduced || pieces.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            // CSS custom props for the keyframe
            ["--dx" as any]: `${p.dx}px`,
            ["--dy" as any]: `${p.dy}px`,
            animationDelay: `${p.delay}s`,
            borderRadius: p.id % 3 === 0 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
