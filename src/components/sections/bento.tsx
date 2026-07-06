"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot, Users, BarChart3, Workflow, Send, Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";

export function BentoSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="bento"
      className="relative bg-background py-20 lg:py-28"
      aria-labelledby="bento-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why teams switch"
          title="Everything in one platform"
          description="Stop paying for 5 different tools. WA Automation replaces your broadcast software, chatbot builder, helpdesk, CRM sync and analytics dashboard."
        />

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-4">
          {/* Big tile - AI Reply */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-wa-green/10 to-card p-6 shadow-premium md:col-span-3 lg:col-span-2 lg:row-span-2"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-wa-green/15 text-wa-green-dark">
                <Bot className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-wa-green-dark">AI auto replies</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-foreground">
              Replies in 0.4 seconds, 24/7
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Train your AI on docs, FAQs and past tickets. It handles 70% of inbound queries automatically — and hands off to humans when stuck.
            </p>

            {/* Mini chat preview */}
            <div className="mt-5 space-y-2 rounded-2xl bg-[#0b141a] p-4">
              <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-[#005C4B] px-3 py-1.5 text-[11px] text-white">
                What are your pricing plans?
              </div>
              <div className="mr-auto flex max-w-[80%] items-center gap-2 rounded-lg rounded-tl-sm bg-[#202C33] px-3 py-1.5 text-[11px] text-white">
                <Bot className="h-3 w-3 text-wa-green" />
                3 plans: Starter ₹2,499, Professional ₹7,999, Enterprise custom. Want a demo?
              </div>
              <div className="flex items-center gap-1 pt-1 text-[9px] text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-wa-green animate-pulse" />
                AI replied in 0.4s
              </div>
            </div>
          </motion.div>

          {/* Multi-device */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-premium md:col-span-3 lg:col-span-2"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-wa-green/15 text-wa-green-dark">
                <Users className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-wa-green-dark">Team inbox</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">
              Whole team, one WhatsApp number
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Assign chats, mention teammates, leave internal notes. Collision detection prevents double-replies.
            </p>

            {/* Mini avatars */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {["AM", "SR", "DF", "IK"].map((i, idx) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-wa text-[10px] font-bold text-white ring-2 ring-card" style={{ zIndex: 10 - idx }}>
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">+ 6 more agents online</span>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-premium md:col-span-2 lg:col-span-1"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-wa-green/15 text-wa-green-dark">
              <BarChart3 className="h-5 w-5" />
            </span>
            <div className="mt-3 text-3xl font-bold text-foreground">97.3%</div>
            <div className="text-xs text-muted-foreground">Delivery rate</div>
            {/* Mini bar chart */}
            <div className="mt-4 flex h-12 items-end gap-1">
              {[60, 75, 65, 85, 78, 92, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? undefined : { height: 0 }}
                  whileInView={reduce ? undefined : { height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                  className="flex-1 rounded-t bg-gradient-wa"
                />
              ))}
            </div>
          </motion.div>

          {/* Workflow */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-premium md:col-span-2 lg:col-span-1"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-wa-green/15 text-wa-green-dark">
              <Workflow className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-base font-bold text-foreground">Visual workflow builder</h3>
            <p className="mt-1 text-xs text-muted-foreground">Drag, drop, automate. No code.</p>
            {/* Mini workflow */}
            <div className="mt-3 flex items-center gap-1">
              {[
                { icon: Zap, color: "#25D366" },
                { icon: Send, color: "#128C7E" },
                { icon: Bot, color: "#53BDEB" },
              ].map((n, i) => {
                const I = n.icon;
                return (
                  <div key={i} className="flex items-center gap-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: `${n.color}1a`, color: n.color }}>
                      <I className="h-3.5 w-3.5" />
                    </div>
                    {i < 2 && <div className="h-0.5 w-3 bg-border" />}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Broadcast */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative overflow-hidden rounded-3xl border border-wa-green/30 bg-gradient-to-br from-wa-green/10 to-card p-6 shadow-glow-wa md:col-span-3 lg:col-span-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-wa-green/15 text-wa-green-dark">
                  <Send className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  100K messages / hour
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Smart throttling, per-contact personalisation, delivery tracking.
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient-wa">10M+</div>
                <div className="text-xs text-muted-foreground">sent monthly</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
