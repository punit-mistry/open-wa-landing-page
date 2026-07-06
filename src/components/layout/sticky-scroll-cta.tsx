"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site/content";

export function StickyScrollCta() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      // Show after scrolling past 1.5x viewport height, hide near bottom (footer)
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const nearBottom = scrolled + vh > docH - 600;
      setVisible(scrolled > vh * 1.5 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 sm:bottom-6"
        >
          <div className="relative overflow-hidden rounded-2xl border border-wa-green/30 bg-card/95 p-3 shadow-glow-wa backdrop-blur-lg">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-wa-green/15 blur-2xl" />

            <div className="relative flex items-center gap-3">
              <div className="hidden flex-shrink-0 sm:block">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-wa text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-foreground">
                  Ready to automate your WhatsApp?
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  Free demo with {siteConfig.founder} · Reply in &lt;2 min
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-2">
                <Button asChild size="sm" className="bg-gradient-wa font-semibold text-white shadow-glow-wa">
                  <a href="#contact">
                    Start Free
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
                <button
                  onClick={() => setDismissed(true)}
                  aria-label="Dismiss"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
