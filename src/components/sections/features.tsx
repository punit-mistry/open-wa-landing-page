"use client";

import { motion, useReducedMotion } from "framer-motion";
import { features } from "@/lib/site/content";
import { SectionHeading, DynamicIcon } from "@/components/effects/section-heading";
import { TiltCard } from "@/components/effects/tilt-card";

export function FeaturesSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="relative bg-background py-20 lg:py-28"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Everything you need"
          title="A complete WhatsApp automation toolkit"
          description="Fourteen integrated capabilities that replace your patchwork of broadcast tools, chatbot builders, CRMs and analytics dashboards."
        />

        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((f, i) => (
            <motion.li
              key={f.title}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{
                duration: 0.55,
                delay: (i % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard
                max={6}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-premium transition-colors duration-300 hover:border-wa-green/40 hover:shadow-glow-wa"
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-wa-green/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-wa-green/10 text-wa-green-dark ring-1 ring-inset ring-wa-green/20 transition-colors duration-300 group-hover:bg-gradient-wa group-hover:text-white">
                    <DynamicIcon name={f.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
                {/* corner number */}
                <span className="absolute right-4 top-4 text-[10px] font-bold tabular-nums text-muted-foreground/40 transition-colors group-hover:text-wa-green/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
