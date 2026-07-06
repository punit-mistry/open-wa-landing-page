"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Lightweight scroll-reveal wrapper. Animates opacity + translate.
 * Falls back to instantly-visible when prefers-reduced-motion is set.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
