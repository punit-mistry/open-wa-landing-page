"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site/content";
import { SectionHeading } from "@/components/effects/section-heading";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function TestimonialsSection() {
  const reduce = useReducedMotion();
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused, reducedMotion]);

  // Show 1 on mobile, 3 on desktop
  const visible = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 1;
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const onResize = () => setDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const items = desktop ? 3 : 1;
  const active = testimonials.slice(index, index + items).length === items
    ? testimonials.slice(index, index + items)
    : [...testimonials.slice(index), ...testimonials.slice(0, items - (testimonials.length - index))];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-mesh-wa py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by operators"
          title="412 teams already automated their WhatsApp"
          description="From D2C brands to fintech support teams, operators trust the platform to handle millions of conversations a month."
        />

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className={`grid gap-4 ${desktop ? "grid-cols-3" : "grid-cols-1"}`}
              >
                {active.map((t, i) => (
                  <figure
                    key={`${index}-${i}`}
                    className="glass relative flex h-full flex-col rounded-3xl p-6 shadow-premium"
                  >
                    <Quote className="absolute right-5 top-5 h-8 w-8 text-wa-green/20" />
                    <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-wa-green text-wa-green" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-wa text-xs font-bold text-white">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose slide">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={i === index}
                    role="tab"
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-gradient-wa" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonials"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
