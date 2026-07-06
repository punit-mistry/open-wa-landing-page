"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoDemoModal({ children }: { children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-glow-wa"
      >
        <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-wa text-white">
          <Play className="h-3 w-3 translate-x-px" fill="currentColor" />
        </span>
        {children || "Watch 2-min demo"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Product demo video"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-glow-wa-strong"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close demo video"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-video bg-black">
                <video
                  className="h-full w-full object-contain"
                  src="/video/demo-intro.mp4"
                  controls
                  autoPlay
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Footer */}
              <div className="flex flex-col items-center justify-between gap-3 p-5 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Want a personalized demo instead?
                </p>
                <Button
                  asChild
                  className="bg-gradient-wa font-semibold text-white shadow-glow-wa"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Book 1:1 with Punit
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
