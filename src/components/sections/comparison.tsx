"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X, Clock, Send, Users, BarChart3, Bot } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";

const manualRows = [
  { label: "Send 1,000 messages", manual: "~5 hours of copy-paste", auto: "8 seconds, single click", icon: Send },
  { label: "Reply outside business hours", manual: "Missed → lost leads", auto: "AI replies in 0.4s, 24/7", icon: Clock },
  { label: "Team collaboration", manual: "Phone passed around", auto: "Shared inbox, no collisions", icon: Users },
  { label: "Performance tracking", manual: "Manual spreadsheets", auto: "Real-time dashboards", icon: BarChart3 },
  { label: "Personalised follow-ups", manual: "Forget → never sent", auto: "Automated workflow triggers", icon: Bot },
];

export function ComparisonSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="comparison"
      className="relative bg-background py-20 lg:py-28"
      aria-labelledby="comparison-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why switch"
          title="Manual WhatsApp vs Automation Platform"
          description="Stop paying humans to copy-paste. See the difference across the workflows that matter most."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
          {/* Manual card */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: -20 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-premium"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <X className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">Manual WhatsApp</h3>
                <p className="text-xs text-muted-foreground">What teams do today</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {manualRows.map((row) => (
                <li key={row.label} className="flex items-start gap-3 rounded-xl bg-red-500/[0.04] p-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">{row.label}</div>
                    <div className="text-xs text-muted-foreground">{row.manual}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-red-500/[0.05] p-4 text-center">
              <div className="text-xs text-muted-foreground">Cost per 1,000 messages</div>
              <div className="mt-1 text-2xl font-bold text-foreground">₹2,400+ in labour</div>
            </div>
          </motion.div>

          {/* Automation card */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border-2 border-wa-green/40 bg-gradient-to-b from-wa-green/10 to-card p-6 shadow-glow-wa sm:p-8"
          >
            <div className="absolute right-4 top-4 rounded-full bg-gradient-wa px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Recommended
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-wa-green/15 text-wa-green-dark">
                <Check className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">Automation Platform</h3>
                <p className="text-xs text-muted-foreground">Built on OpenWA</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {manualRows.map((row) => (
                <li key={row.label} className="flex items-start gap-3 rounded-xl bg-wa-green/[0.06] p-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wa-green/20 text-wa-green-dark">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">{row.label}</div>
                    <div className="text-xs text-wa-green-dark">{row.auto}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-wa-green/[0.08] p-4 text-center">
              <div className="text-xs text-muted-foreground">Cost per 1,000 messages</div>
              <div className="mt-1 text-2xl font-bold text-wa-green-dark">₹160 · 94% cheaper</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
