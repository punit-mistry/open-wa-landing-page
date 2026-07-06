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
    offset: ["start center", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      id="how-it-works"
      className="relative bg-[#F7FBF9] py-20 lg:py-28"
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
          {/* Desktop SVG connecting line */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-2 w-full lg:block"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
          >
            <line
              x1="80"
              y1="2"
              x2="920"
              y2="2"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <motion.line
              x1="80"
              y1="2"
              x2="920"
              y2="2"
              stroke="url(#how-line-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="how-line-grad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#25D366" />
                <stop offset="1" stopColor="#128C7E" />
              </linearGradient>
            </defs>
          </svg>

          {/* Mobile vertical line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-12 bottom-12 w-0.5 bg-border lg:hidden"
          />

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {howSteps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 lg:pl-0"
              >
                <div className="relative z-10 flex flex-col items-start">
                  {/* Step circle */}
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-premium ring-1 ring-wa-green/20">
                    <DynamicIcon name={step.icon} className="h-5 w-5 text-wa-green-dark" />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-wa px-1 text-[10px] font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
