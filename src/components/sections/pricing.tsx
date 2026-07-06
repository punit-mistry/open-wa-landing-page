"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { plans, siteConfig } from "@/lib/site/content";
import { SectionHeading } from "@/components/effects/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pricing"
      className="relative bg-background py-20 lg:py-28"
      aria-labelledby="pricing-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30 mask-fade-b" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent, scale-ready"
          description="Start free. Upgrade when you outgrow the limits. Cancel anytime. Indian businesses get GST invoices on every plan."
        />

        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const highlighted = plan.highlighted;
            return (
              <motion.div
                key={plan.name}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 sm:p-7",
                  highlighted
                    ? "border-2 border-wa-green/40 bg-gradient-to-b from-[#F0FDF4] to-white shadow-glow-wa lg:-translate-y-3"
                    : "border border-border bg-card shadow-premium hover:-translate-y-1 hover:shadow-glow-wa"
                )}
              >
                {highlighted && (
                  <>
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-wa px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </div>
                    <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-wa-green/10 blur-3xl" />
                  </>
                )}

                <div className="relative">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <Button
                    asChild
                    className={cn(
                      "mt-5 w-full font-semibold",
                      highlighted
                        ? "bg-gradient-wa text-white shadow-glow-wa hover:opacity-95"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    )}
                  >
                    <a href={highlighted ? "#contact" : "#contact"}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={cn(
                            "mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
                            highlighted ? "bg-wa-green/15 text-wa-green-dark" : "bg-accent text-foreground"
                          )}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">
          All plans include OpenWA core, multi-device support and standard security. Need a custom SLA?{" "}
          <a href="#contact" className="font-semibold text-wa-green-dark hover:underline">
            Talk to {siteConfig.founder}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
