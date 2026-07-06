"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/lib/site/content";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Floating WhatsApp action button (fixed bottom-right).
 * - Pulse ring respects reduced motion.
 * - Tooltip appears after a short delay.
 */
export function FloatingWhatsApp() {
  const reduced = usePrefersReducedMotion();
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 2500);
    const t2 = setTimeout(() => setShowTip(false), 11000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const prefilled = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(
    `Hello ${siteConfig.founder},\n\nI am interested in your WhatsApp Automation Platform. Please share more details.\n\nThank you.`
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="glass relative max-w-[240px] rounded-2xl p-3 pr-8 shadow-premium"
          >
            <button
              type="button"
              onClick={() => setShowTip(false)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="text-xs font-semibold text-foreground">
              Chat with {siteConfig.founder}
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              Get a free demo of the WhatsApp Automation Platform.
            </p>
            <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={prefilled}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.founder} on WhatsApp`}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-wa shadow-glow-wa-strong transition-transform hover:scale-105 active:scale-95"
      >
        {!reduced && (
          <span className="absolute inset-0 -z-10 rounded-full animate-pulse-ring" />
        )}
        <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.4} />
      </a>
    </div>
  );
}
