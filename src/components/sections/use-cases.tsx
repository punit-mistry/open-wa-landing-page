"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShoppingBag, Code2, HeartPulse, Building2, GraduationCap, Landmark,
  ArrowRight, Check as CheckIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UseCase = {
  id: string;
  label: string;
  icon: any;
  headline: string;
  description: string;
  stats: { value: string; label: string }[];
  features: string[];
  accent: string;
};

const useCases: UseCase[] = [
  {
    id: "ecom",
    label: "E-commerce",
    icon: ShoppingBag,
    headline: "Recover 35% more abandoned carts",
    description: "Trigger automated WhatsApp reminders 30 min after cart abandonment, with dynamic product images and one-tap checkout links. Sync order status, shipping updates and COD confirmations back to your store.",
    stats: [
      { value: "35%", label: "Cart recovery" },
      { value: "4.2x", label: "ROAS" },
      { value: "2.8s", label: "Order confirm" },
    ],
    features: [
      "Shopify & WooCommerce native sync",
      "Abandoned cart recovery workflows",
      "COD confirmation bot (saves 60% NDR)",
      "Post-purchase review automation",
    ],
    accent: "#25D366",
  },
  {
    id: "saas",
    label: "SaaS",
    icon: Code2,
    headline: "Onboard & retain users on autopilot",
    description: "Welcome new signups, nudge inactive users, and collect feature requests over WhatsApp — the channel they actually check. AI replies deflect 70% of support tickets before they hit your queue.",
    stats: [
      { value: "70%", label: "Tickets auto-resolved" },
      { value: "+18%", label: "Activation rate" },
      { value: "0.4s", label: "AI response" },
    ],
    features: [
      "AI KB-trained support bot",
      "Trial conversion workflows",
      "In-app event triggers via API",
      "Slack / HubSpot / Intercom sync",
    ],
    accent: "#128C7E",
  },
  {
    id: "health",
    label: "Healthcare",
    icon: HeartPulse,
    headline: "Cut no-shows by 60% with smart reminders",
    description: "Send HIPAA-friendly appointment reminders, intake forms and post-visit follow-ups. Patients reply to confirm, reschedule or cancel — all logged in your EHR automatically.",
    stats: [
      { value: "60%", label: "Fewer no-shows" },
      { value: "94%", label: "Reminder open rate" },
      { value: "12+", label: "Languages" },
    ],
    features: [
      "Appointment reminder workflows",
      "Intake form collection",
      "Prescription refill bot",
      "EHR integration via webhooks",
    ],
    accent: "#53BDEB",
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Building2,
    headline: "Qualify leads in seconds, not days",
    description: "AI bot greets every property enquiry, asks qualifying questions (budget, location, timeline), schedules site visits and routes hot leads to the right agent instantly. Never lose a lead to a slow response again.",
    stats: [
      { value: "8s", label: "Avg response" },
      { value: "3.2x", label: "Site visit rate" },
      { value: "92%", label: "Lead qualification" },
    ],
    features: [
      "Property enquiry auto-qualifier",
      "Site visit scheduling",
      "Agent routing by territory",
      "Brochure / video auto-send",
    ],
    accent: "#075E54",
  },
  {
    id: "edu",
    label: "Education",
    icon: GraduationCap,
    headline: "Engage students & parents in real time",
    description: "Send fee reminders, attendance alerts, exam schedules and result notifications. Two-way chat lets parents reply with queries — AI handles FAQs, escalates complex ones to admin.",
    stats: [
      { value: "98%", label: "Parent reach" },
      { value: "45%", label: "Faster fee collection" },
      { value: "24/7", label: "Query resolution" },
    ],
    features: [
      "Fee reminder drip campaigns",
      "Attendance alerts to parents",
      "Exam / result notifications",
      "Admission enquiry bot",
    ],
    accent: "#25D366",
  },
  {
    id: "finserv",
    label: "Financial Services",
    icon: Landmark,
    headline: "Compliant customer engagement at scale",
    description: "Send transaction alerts, EMI reminders, document requests and KYC updates with full audit logs. OTP and verification flows built-in. RBI-compliant opt-in / opt-out management out of the box.",
    stats: [
      { value: "100%", label: "Audit-trail" },
      { value: "97%", label: "Delivery rate" },
      { value: "OTP", label: "In 4 seconds" },
    ],
    features: [
      "Transaction & EMI alerts",
      "OTP / verification flows",
      "KYC document collection",
      "RBI-compliant opt-in mgmt",
    ],
    accent: "#128C7E",
  },
];

export function UseCasesSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(useCases[0].id);
  const current = useCases.find((u) => u.id === active)!;

  return (
    <section
      id="use-cases"
      className="relative bg-subtle py-20 lg:py-28"
      aria-labelledby="use-cases-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Use cases"
          title="Built for your industry"
          description="Whatever you sell, support or operate — WhatsApp Automation adapts to your workflow. Pick your industry to see exactly how."
        />

        {/* Tab chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            const isActive = uc.id === active;
            return (
              <button
                key={uc.id}
                onClick={() => setActive(uc.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  isActive
                    ? "bg-gradient-wa text-white shadow-glow-wa"
                    : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {uc.label}
              </button>
            );
          })}
        </div>

        {/* Active use case content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 max-w-5xl"
          >
            <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8 lg:grid-cols-12 lg:gap-8">
              {/* Left: copy */}
              <div className="lg:col-span-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${current.accent}1a`, color: current.accent }}>
                  <current.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                  {current.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {current.description}
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {current.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span
                        className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${current.accent}1a`, color: current.accent }}
                      >
                        <CheckIcon className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="mt-6 bg-gradient-wa font-semibold text-white shadow-glow-wa">
                  <a href="#contact">
                    Get started for {current.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Right: stats */}
              <div className="lg:col-span-5">
                <div className="grid h-full grid-cols-1 gap-3">
                  {current.stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={reduce ? undefined : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                    >
                      <div>
                        <div className="text-2xl font-bold tabular-nums text-foreground" style={{ color: current.accent }}>
                          {s.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                      <div className="h-12 w-12 rounded-full" style={{ background: `radial-gradient(circle, ${current.accent}33, transparent 70%)` }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
