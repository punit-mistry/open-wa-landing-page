"use client";

import { useEffect, useState } from "react";
import { Send, TrendingUp, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const START_COUNT = 4_842_317;
const PER_SECOND = 18; // ~1.5M/day

export function GlobalCounterBanner() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(START_COUNT);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show after 3s
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Tick up every second
  useEffect(() => {
    if (reduced || dismissed || !visible) return;
    const id = setInterval(() => {
      setCount((c) => c + PER_SECOND + Math.floor(Math.random() * 8));
    }, 1000);
    return () => clearInterval(id);
  }, [reduced, dismissed, visible]);

  if (dismissed) return null;

  const formatted = count.toLocaleString("en-IN");

  return (
    <div
      className={`fixed left-1/2 top-20 z-40 -translate-x-1/2 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="glass flex items-center gap-3 rounded-full px-4 py-2 shadow-premium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa-green opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-wa-green" />
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <Send className="h-3 w-3 text-wa-green-dark" />
          <span className="font-semibold tabular-nums text-foreground">{formatted}</span>
          <span className="text-muted-foreground">messages sent today</span>
        </div>
        <div className="hidden items-center gap-1 border-l border-border pl-3 text-[10px] font-medium text-wa-green-dark sm:flex">
          <TrendingUp className="h-3 w-3" />
          +18/sec
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss counter"
          className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
