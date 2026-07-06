"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { brandLogos } from "@/components/brand-logos";

export function TrustedByMarquee() {
  const reduce = useReducedMotion();
  // Duplicate list for seamless loop
  const doubled = [...brandLogos, ...brandLogos];

  return (
    <section
      aria-label="Trusted by leading brands"
      className="relative border-y border-border bg-subtle py-10"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-wa-green text-wa-green" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Integrates with the tools you already use ·{" "}
            <span className="font-semibold text-foreground">412+ teams</span> onboarded
          </p>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden mask-fade-x">
        <div
          className="flex w-max items-center gap-12 animate-marquee-fast"
          style={{ animationDuration: "36s" }}
        >
          {doubled.map((brand, i) => {
            const Logo = brand.Logo;
            return (
              <div
                key={`${brand.name}-${i}`}
                className="group flex items-center gap-2.5 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                title={brand.name}
              >
                <Logo className="h-7 w-7 opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-lg font-bold tracking-tight">{brand.name}</span>
              </div>
            );
          })}
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
