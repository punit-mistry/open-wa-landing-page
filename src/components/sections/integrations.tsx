"use client";

import { motion, useReducedMotion } from "framer-motion";
import { integrations } from "@/lib/site/content";
import { SectionHeading } from "@/components/effects/section-heading";
import { brandLogos } from "@/components/brand-logos";
import { Plug } from "lucide-react";

// Build a quick lookup map for brand logos
const logoMap = Object.fromEntries(brandLogos.map((b) => [b.name, b.Logo]));

export function IntegrationsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="integrations"
      className="relative bg-background py-20 lg:py-28"
      aria-labelledby="integrations-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Integrations"
          title="Connects with the tools you already use"
          description="Pipe conversations, contacts and events into your existing stack with native integrations, webhooks and a typed REST API."
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Center hub */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={reduce ? undefined : { scale: 0.8, opacity: 0 }}
              whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="relative z-20 inline-flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-wa shadow-glow-wa-strong"
            >
              <Plug className="h-10 w-10 text-white" strokeWidth={2.4} />
              {/* pulse rings */}
              {!reduce && (
                <>
                  <span className="absolute inset-0 -z-10 rounded-3xl bg-wa-green/40 animate-ping" style={{ animationDuration: "3s" }} />
                  <span className="absolute inset-0 -z-10 rounded-3xl bg-wa-green/30 animate-ping" style={{ animationDuration: "3s", animationDelay: "1.5s" }} />
                </>
              )}
            </motion.div>
          </div>

          {/* SVG connection lines (absolute, hidden on mobile) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            {integrations.map((_, i) => {
              const angle = (i / integrations.length) * Math.PI * 2;
              const cx = 400 + Math.cos(angle) * 280;
              const cy = 300 + Math.sin(angle) * 220;
              return (
                <motion.line
                  key={i}
                  x1="400"
                  y1="300"
                  x2={cx}
                  y2={cy}
                  stroke="url(#int-line-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                  whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
                />
              );
            })}
            <defs>
              <linearGradient id="int-line-grad" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#25D366" stopOpacity="0.8" />
                <stop offset="1" stopColor="#128C7E" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Integration chips with real brand logos */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {integrations.map((int, i) => {
              const Logo = logoMap[int.logo];
              return (
                <motion.div
                  key={int.name}
                  initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
                  whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-wa-green/40 hover:shadow-glow-wa"
                >
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-foreground ring-1 ring-inset ring-border transition-colors group-hover:bg-wa-green/10">
                    {Logo ? <Logo className="h-6 w-6" /> : null}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">{int.name}</div>
                    <div className="text-[10px] text-muted-foreground">{int.category}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
