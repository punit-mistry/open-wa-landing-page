"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { workflowNodes } from "@/lib/site/content";
import { SectionHeading, DynamicIcon } from "@/components/effects/section-heading";
import { ArrowDown } from "lucide-react";

export function WorkflowSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

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

        <div ref={ref} className="mx-auto mt-16 max-w-3xl">
          {/* Track */}
          <div className="relative">
            {/* Vertical progress line */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[35px] top-2 bottom-2 w-[3px] rounded-full bg-border sm:left-1/2 sm:-translate-x-1/2"
            />
            <motion.div
              aria-hidden
              style={{ scaleY: progress }}
              className="pointer-events-none absolute left-[35px] top-2 bottom-2 w-[3px] origin-top rounded-full bg-gradient-wa sm:left-1/2 sm:-translate-x-1/2"
            />

            <ol className="space-y-5">
              {workflowNodes.map((node, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.li
                    key={node.title}
                    initial={reduce ? undefined : { opacity: 0, y: 20 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative flex items-start gap-4 sm:grid sm:grid-cols-2 sm:gap-8 ${isLeft ? "" : "sm:[direction:rtl]"}`}
                  >
                    {/* Node dot */}
                    <div className="relative z-10 mt-1 flex-shrink-0 sm:absolute sm:left-1/2 sm:top-1 sm:-translate-x-1/2 sm:mt-0">
                      <div
                        className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white shadow-premium ring-1 ring-border"
                        style={{ boxShadow: `0 0 0 4px rgba(255,255,255,0.9), 0 8px 24px ${node.color}33` }}
                      >
                        <DynamicIcon name={node.icon} className="h-7 w-7" style={{ color: node.color }} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 sm:[direction:ltr] ${isLeft ? "sm:col-start-1 sm:text-right" : "sm:col-start-2"}`}>
                      <div className="rounded-2xl border border-border bg-card p-4 shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-wa">
                        <div className="flex items-center gap-2 sm:inline-flex">
                          <span
                            className="inline-flex h-2 w-2 rounded-full"
                            style={{ backgroundColor: node.color }}
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
                      </div>
                    </div>
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
