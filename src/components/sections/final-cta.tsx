"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site/content";

export function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      aria-labelledby="final-cta-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-wa px-6 py-16 text-center shadow-glow-wa-strong sm:px-12 sm:py-20 lg:py-24"
        >
          {/* Decorative blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl animate-blob" />
            <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#075E54]/40 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px, 28px 28px",
              }}
            />
          </div>

          <div className="relative">
            <motion.h2
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]"
              id="final-cta-heading"
            >
              Ready to Automate Your Business?
            </motion.h2>
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg"
            >
              Join 412 teams already growing with the WhatsApp Automation Platform. Book a free demo with {siteConfig.founder} today.
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="group bg-white font-semibold text-wa-green-dark shadow-xl hover:bg-white/95">
                <a href="#contact">
                  Book Your Free Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="group gap-2 border-white/40 bg-white/10 font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Now
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-white/80"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
