"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { howSteps } from "@/lib/site/content";
import { SectionHeading, DynamicIcon } from "@/components/effects/section-heading";

export function HowItWorksSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  // Animate width from 0% to 100% based on scroll
  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="how-it-works"
      className="relative bg-subtle py-20 lg:py-28"
      aria-labelledby="how-heading"
    >
      {/* Soft dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From zero to automated in 5 steps"
          description="Connect your WhatsApp number, scan a QR code, and launch your first automation in minutes — no engineering team required."
        />

        <div ref={ref} className="relative mt-16 lg:mt-20">
          {/* Desktop horizontal track */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden lg:block">
            {/* Track background (full dashed line) */}
            <div className="relative mx-auto h-1 max-w-6xl">
              <div className="absolute inset-0 h-1 rounded-full border-t-2 border-dashed border-border" />
              {/* Animated gradient fill — uses scaleX based on scroll */}
              <motion.div
                style={{ width: lineScale }}
                className="absolute left-0 top-0 h-1 rounded-full bg-gradient-wa shadow-[0_0_12px_rgba(37,211,102,0.5)]"
              />
            </div>
          </div>

          {/* Mobile vertical line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-12 bottom-12 w-0.5 bg-border lg:hidden"
          >
            <motion.div
              style={{ height: lineScale }}
              className="absolute left-0 top-0 w-0.5 bg-gradient-wa shadow-[0_0_8px_rgba(37,211,102,0.5)]"
            />
          </div>

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {howSteps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-20 lg:pl-0"
              >
                <div className="relative z-10 flex flex-col items-start">
                  {/* Step circle — desktop centered on line, mobile left of vertical line */}
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-premium ring-1 ring-wa-green/30 lg:mx-auto">
                    <DynamicIcon name={step.icon} className="h-5 w-5 text-wa-green-dark" />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-wa px-1 text-[10px] font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    {/* Connector dot to the line on desktop */}
                    <span aria-hidden className="absolute left-1/2 top-full hidden h-3 w-0.5 -translate-x-1/2 bg-border lg:block" />
                  </div>
                  <div className="mt-4 lg:mt-5 lg:text-center">
                    <h3 className="text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
