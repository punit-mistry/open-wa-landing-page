"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Starter",
    min: 0,
    max: 5000,
    basePrice: 2499,
    perMessage: 0,
    devices: 1,
    features: ["1 WhatsApp device", "Basic analytics", "2 workflows", "Email support"],
  },
  {
    name: "Professional",
    min: 5000,
    max: 50000,
    basePrice: 7999,
    perMessage: 0.12,
    devices: 3,
    features: ["3 WhatsApp devices", "AI auto replies", "HubSpot & Sheets sync", "Webhooks & API", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    min: 50000,
    max: 1000000,
    basePrice: 0,
    perMessage: 0,
    devices: 999,
    features: ["Unlimited devices", "Custom AI fine-tuning", "SSO & RBAC", "Dedicated CSM", "99.9% SLA"],
    custom: true,
  },
];

export function PricingCalculatorSection() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState(15000);

  const recommended = useMemo(() => {
    if (messages < 5000) return TIERS[0];
    if (messages < 50000) return TIERS[1];
    return TIERS[2];
  }, [messages]);

  const estimatedPrice = useMemo(() => {
    if (recommended.custom) return null;
    const base = recommended.basePrice;
    const extra = Math.max(0, messages - recommended.min) * recommended.perMessage;
    return Math.round(base + extra);
  }, [recommended, messages]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-subtle py-20 lg:py-28"
      aria-labelledby="calculator-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing calculator"
          title="Slide to your scale — see your price instantly"
          description="No hidden fees. Pick how many messages you send per month and we'll recommend the right plan in real time."
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
            {/* Slider section */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <label htmlFor="msg-slider" className="text-sm font-semibold text-foreground">
                  Messages per month
                </label>
                <div className="text-right">
                  <div className="text-3xl font-bold tabular-nums text-foreground">
                    {formatINR(messages)}
                  </div>
                  <div className="text-[11px] text-muted-foreground">messages / mo</div>
                </div>
              </div>

              <input
                id="msg-slider"
                type="range"
                min={500}
                max={100000}
                step={500}
                value={messages}
                onChange={(e) => setMessages(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-wa-green to-[#128C7E] outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-glow-wa [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-wa-green [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-card"
              />

              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>500</span>
                <span>25K</span>
                <span>50K</span>
                <span>75K</span>
                <span>100K+</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-wa-green/30 bg-gradient-to-br from-wa-green/10 to-card p-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-wa-green/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-wa-green-dark">
                    <Zap className="h-3 w-3" />
                    Recommended for you
                  </div>
                </div>
                <h3 className="mt-3 text-xl font-bold text-foreground">{recommended.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {recommended.custom
                    ? "For high-volume operations"
                    : `Up to ${formatINR(recommended.max)} messages / mo`}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  {recommended.custom ? (
                    <span className="text-3xl font-bold text-foreground">Custom</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold tabular-nums text-foreground">
                        ₹{formatINR(estimatedPrice ?? 0)}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </>
                  )}
                </div>

                <Button asChild className="mt-4 w-full bg-gradient-wa font-semibold text-white shadow-glow-wa">
                  <a href="#contact">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What's included
                </h4>
                <ul className="mt-3 space-y-2">
                  {recommended.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-wa-green-dark" strokeWidth={3} />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
                  <div>
                    <div className="font-bold text-foreground">{recommended.devices === 999 ? "Unlimited" : recommended.devices}</div>
                    <div className="text-muted-foreground">Devices</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{messages < 50000 ? "99.5%" : "99.9%"}</div>
                    <div className="text-muted-foreground">Uptime SLA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier indicator */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
              {TIERS.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setMessages(Math.floor((t.min + Math.min(t.max, t.min + 5000)) / 2));
                  }}
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                    recommended.name === t.name
                      ? "bg-gradient-wa text-white shadow-glow-wa"
                      : "bg-accent text-muted-foreground hover:bg-accent/80"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
