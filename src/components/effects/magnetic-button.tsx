"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic button — element drifts slightly toward the cursor on hover.
 * Uses transform only (GPU). Disabled on touch / reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </Comp>
  );
}
