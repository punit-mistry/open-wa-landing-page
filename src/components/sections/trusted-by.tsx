"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const COMPANIES = [
  "Nova Commerce",
  "Bloom Beauty",
  "Pulse Fintech",
  "MediExpress",
  "FitFuel",
  "Stellar Travel",
  "Acme Retail",
  "UrbanCart",
  "GreenLeaf",
  "BookMySlot",
  "QuickSend",
  "ZenDesk+",
];

export function TrustedByMarquee() {
  const reduce = useReducedMotion();
  // Duplicate list for seamless loop
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <section
      aria-label="Trusted by leading brands"
      className="relative border-y border-border bg-[#F7FBF9] py-10"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-wa-green text-wa-green" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="font-semibold text-foreground">412+ teams</span> across India and 14 countries
          </p>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden mask-fade-x">
        <div
          className="flex w-max items-center gap-12 animate-marquee-fast"
          style={{ animationDuration: "32s" }}
        >
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap text-lg font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-wa text-xs font-bold text-white">
                {name.charAt(0)}
              </span>
              {name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mask-fade-x {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
