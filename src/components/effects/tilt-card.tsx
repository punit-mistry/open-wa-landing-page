"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * 3D tilt card — tilts toward cursor on hover, with optional glare.
 * Uses CSS transform-style: preserve-3d. Disabled on touch / reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    ref.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    if (glare) {
      ref.current.style.setProperty("--glare-x", `${px * 100}%`);
      ref.current.style.setProperty("--glare-y", `${py * 100}%`);
    }
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "tilt-card relative",
        glare && "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        glare && "before:bg-[radial-gradient(circle_at_var(--glare-x,50%)_var(--glare-y,50%),rgba(255,255,255,0.18),transparent_60%)]",
        className
      )}
    >
      {children}
    </div>
  );
}
