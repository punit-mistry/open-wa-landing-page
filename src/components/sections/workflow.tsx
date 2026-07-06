"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { workflowNodes } from "@/lib/site/content";
import { SectionHeading, DynamicIcon } from "@/components/effects/section-heading";
import { ArrowDown, ChevronDown } from "lucide-react";

export function WorkflowSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      aria-labelledby="workflow-heading"
    >
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-wa-green/10 blur-3xl" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Workflow builder"
          title="Drag, drop, automate — no code required"
          description="Chain triggers, conditions, AI replies and CRM actions into visual automations that run 24/7 across every conversation."
        />

        <div ref={ref} className="mx-auto mt-16 max-w-2xl">
          {/* Track */}
          <div className="relative">
            {/* Vertical track background */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[34px] top-0 bottom-0 w-1 rounded-full bg-border sm:left-1/2 sm:-translate-x-1/2"
            />
            {/* Animated gradient progress line */}
            <motion.div
              aria-hidden
              style={{ height: lineScale }}
              className="pointer-events-none absolute left-[34px] top-0 w-1 rounded-full bg-gradient-wa shadow-[0_0_12px_rgba(37,211,102,0.6)] sm:left-1/2 sm:-translate-x-1/2"
            />

            <ol className="space-y-4 sm:space-y-2">
              {workflowNodes.map((node, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.li
                    key={node.title}
                    initial={reduce ? undefined : { opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative"
                  >
                    {/* Node circle — fixed to the line on desktop, left side on mobile */}
                    <div className="absolute left-0 top-3 z-10 sm:left-1/2 sm:-translate-x-1/2">
                      <motion.div
                        whileHover={reduce ? undefined : { scale: 1.08 }}
                        className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-card shadow-premium ring-2 ring-wa-green/20"
                        style={{ boxShadow: `0 0 0 4px var(--background), 0 8px 24px ${node.color}40` }}
                      >
                        <DynamicIcon name={node.icon} className="h-7 w-7" style={{ color: node.color }} />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <div className={`pl-[88px] sm:pl-0 ${isLeft ? "sm:pr-[calc(50%+44px)] sm:text-right" : "sm:pl-[calc(50%+44px)]"}`}>
                      <motion.div
                        whileHover={reduce ? undefined : { y: -2 }}
                        className="rounded-2xl border border-border bg-card p-4 shadow-premium transition-shadow hover:shadow-glow-wa"
                      >
                        <div className={`flex items-center gap-2 ${isLeft ? "sm:justify-end" : ""}`}>
                          <span
                            className="inline-flex h-2 w-2 rounded-full"
                            style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}` }}
                          />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Step {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-1 text-base font-semibold text-foreground">
                          {node.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {node.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Down arrow between nodes (mobile only) */}
                    {i < workflowNodes.length - 1 && (
                      <div className="flex justify-center py-1 sm:hidden">
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Footnote */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-full bg-wa-green/10 px-4 py-2 text-sm font-medium text-wa-green-dark"
        >
          <ArrowDown className="h-4 w-4" />
          Save, publish and watch it run in real time
        </motion.div>
      </div>
    </section>
  );
}
