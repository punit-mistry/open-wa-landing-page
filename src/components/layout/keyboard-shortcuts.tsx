"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site/content";

/**
 * Global keyboard shortcuts:
 *   - "w" → open WhatsApp (pre-filled)
 *   - "c" → scroll to contact form
 *   - "p" → scroll to pricing
 *   - "/" → focus first input on page (quick search/contact)
 *   - "Esc" → close any open mobile menu / modal
 *
 * Ignores shortcuts when typing in input/textarea/select.
 */
export function KeyboardShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable) {
        if (e.key !== "Escape") return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key.toLowerCase()) {
        case "w": {
          e.preventDefault();
          const msg = encodeURIComponent(
            `Hello ${siteConfig.founder},\n\nI am interested in your WhatsApp Automation Platform. Please share more details.\n\nThank you.`
          );
          window.open(`${siteConfig.whatsappUrl}?text=${msg}`, "_blank", "noopener,noreferrer");
          break;
        }
        case "c": {
          e.preventDefault();
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "p": {
          e.preventDefault();
          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "d": {
          e.preventDefault();
          document.getElementById("ai-demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
      }
    };

    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
