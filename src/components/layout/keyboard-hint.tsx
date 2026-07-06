"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SHORTCUTS = [
  { keys: ["W"], label: "Open WhatsApp" },
  { keys: ["C"], label: "Contact form" },
  { keys: ["P"], label: "Pricing" },
  { keys: ["D"], label: "AI demo" },
];

export function KeyboardHint() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Show hint after 6 seconds if user hasn't dismissed
    const t = setTimeout(() => setShown(true), 6000);
    return () => clearTimeout(t);
  }, []);

  if (reduced) return null;

  return (
    <>
      {/* Floating keyboard button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Keyboard shortcuts"
        className="fixed bottom-24 right-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-premium backdrop-blur-md transition-all hover:scale-105 hover:bg-accent sm:bottom-28 sm:right-6"
      >
        <Keyboard className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-5 z-40 w-64 rounded-2xl border border-border bg-card p-4 shadow-premium sm:bottom-44 sm:right-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">Shortcuts</h4>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close shortcuts"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="space-y-2">
              {SHORTCUTS.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.label}</span>
                  <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 font-mono text-[10px] font-bold text-foreground shadow-sm">
                    {s.keys[0]}
                  </kbd>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial hint toast */}
      <AnimatePresence>
        {shown && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-40 right-5 z-40 max-w-[220px] rounded-2xl border border-border bg-card p-3 shadow-premium sm:bottom-44 sm:right-6"
          >
            <button
              onClick={() => setShown(false)}
              aria-label="Dismiss hint"
              className="absolute right-1.5 top-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="pr-4 text-xs text-muted-foreground">
              Press{" "}
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-bold text-foreground">
                W
              </kbd>{" "}
              to open WhatsApp instantly ⚡
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
