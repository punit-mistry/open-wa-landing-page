"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated number counter.
 * - Triggers when element enters viewport (IntersectionObserver, passive).
 * - Falls back to final value when prefers-reduced-motion.
 * - Uses requestAnimationFrame and a single observer — cheap on CPU.
 */
export function useCountUp(
  target: number,
  {
    duration = 1600,
    decimals = 0,
    prefix = "",
    suffix = "",
    start = 0,
  }: { duration?: number; decimals?: number; prefix?: string; suffix?: string; start?: number } = {}
) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(start);
  const startedRef = useRef(false);

  // When reduced motion is on, snap to the final value.
  useEffect(() => {
    if (!reduce) return;
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setValue(target);
          }
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, target]);

  useEffect(() => {
    if (reduce) return;
    if (!ref.current) return;

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
              const next = start + (target - start) * eased;
              setValue(next);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, start, reduce]);

  const formatted = value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, display: `${prefix}${formatted}${suffix}` };
}
