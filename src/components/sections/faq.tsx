"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, siteConfig } from "@/lib/site/content";
import { SectionHeading } from "@/components/effects/section-heading";
import { MessageCircle } from "lucide-react";

export function FaqSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative bg-[#F7FBF9] py-20 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: heading + CTA */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />
                FAQ
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Questions, answered.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Everything you need to know about the WhatsApp Automation Platform powered by OpenWA. Still curious? Message {siteConfig.founder} directly.
              </p>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-wa-green/30 bg-white px-4 py-3 text-sm font-semibold text-wa-green-dark shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-glow-wa"
              >
                <MessageCircle className="h-4 w-4" />
                Ask {siteConfig.founder} on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.5 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.question}
                    value={`item-${i}`}
                    className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-premium data-[state=open]:border-wa-green/30"
                  >
                    <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
