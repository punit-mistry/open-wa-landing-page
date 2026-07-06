"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site/content";

export function FounderNoteSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      aria-labelledby="founder-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wa-green/8 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border bg-card p-8 shadow-premium sm:p-12"
        >
          <Quote className="absolute right-8 top-8 h-12 w-12 text-wa-green/15" />

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-wa text-2xl font-bold text-white shadow-glow-wa">
                PM
              </div>
              <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-wa-green/30">
                <Sparkles className="h-3 w-3 text-wa-green" />
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-wa-green-dark">
                A note from the founder
              </div>
              <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                {siteConfig.founder}
              </h2>
              <p className="text-sm text-muted-foreground">Founder & CEO, WA Automation</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
            <p>
              I built WA Automation after watching 412+ Indian businesses struggle with the same problem — WhatsApp is where their customers actually are, but managing it at scale meant hiring more humans, copy-pasting the same messages, and missing leads after 7pm.
            </p>
            <p>
              So we built the platform I wished existed: enterprise-grade automation that runs 24/7, AI replies that actually understand context, and a workflow builder so simple my mom could use it. No code, no API keys to manage, no per-message markup.
            </p>
            <p>
              If you're reading this, I want to personally invite you to a free 1:1 demo. Fill the form below — it opens WhatsApp directly to me. I read every message myself, and we'll figure out together if automation is right for your business.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-6 flex items-end justify-between border-t border-border pt-6">
            <div>
              <div className="font-serif text-2xl italic text-foreground" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {siteConfig.founder}
              </div>
              <div className="text-xs text-muted-foreground">Personal WhatsApp: {siteConfig.phone}</div>
            </div>
            <Button asChild className="bg-gradient-wa font-semibold text-white shadow-glow-wa">
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message me
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
