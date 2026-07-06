"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Users, Send, CheckCheck, BarChart3, Activity, Inbox, MessageSquare, TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";
import { useCountUp } from "@/hooks/use-count-up";

function Stat({
  icon: Icon,
  label,
  target,
  decimals,
  prefix,
  suffix,
  accent,
  delay = 0,
}: {
  icon: any;
  label: string;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  accent: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, display } = useCountUp(target, { decimals, prefix, suffix });

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-border bg-card p-4 shadow-premium"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
          <div ref={ref} className="text-xl font-bold tabular-nums text-foreground">
            {display}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const reduce = useReducedMotion();
  const max = Math.max(...data);
  return (
    <div className="flex h-32 items-end gap-1.5">
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md"
          style={{ backgroundColor: color }}
          initial={reduce ? undefined : { height: 0 }}
          whileInView={reduce ? undefined : { height: `${(v / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function LiveChatRow({
  name,
  message,
  time,
  status,
  initials,
}: {
  name: string;
  message: string;
  time: string;
  status: "delivered" | "read" | "queued";
  initials: string;
}) {
  const statusColor =
    status === "read" ? "#53BDEB" : status === "delivered" ? "#25D366" : "#94A3B8";
  return (
    <div className="flex items-center gap-2.5 border-b border-border/60 py-2 last:border-0">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-wa text-[10px] font-bold text-white">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-foreground">{name}</span>
          <span className="text-[10px] text-muted-foreground">{time}</span>
        </div>
        <div className="truncate text-[11px] text-muted-foreground">{message}</div>
      </div>
      <span
        className="h-2 w-2 flex-shrink-0 rounded-full"
        style={{ backgroundColor: statusColor }}
        title={status}
      />
    </div>
  );
}

export function DashboardSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="dashboard"
      className="relative bg-[#F7FBF9] py-20 lg:py-28"
      aria-labelledby="dashboard-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dashboard"
          title="One command center for every conversation"
          description="Track active users, delivery rates, campaign performance, live chats and queue status in real time — without leaving the platform."
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-border bg-white shadow-premium"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-[#F8FAF9] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <div className="ml-3 flex-1">
              <div className="mx-auto max-w-xs rounded-md bg-white px-3 py-1 text-center text-[11px] text-muted-foreground ring-1 ring-border">
                app.wa-automation.dev/dashboard
              </div>
            </div>
            <span className="hidden text-[10px] font-medium text-wa-green-dark sm:inline">
              ● Live
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-12">
            {/* Stats grid */}
            <div className="lg:col-span-12">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                <Stat icon={Users} label="Active Users" target={4212} accent="#25D366" delay={0} />
                <Stat icon={Send} label="Sent Messages" target={84210} accent="#128C7E" delay={0.08} />
                <Stat icon={CheckCheck} label="Delivery Rate" target={97.3} decimals={1} suffix="%" accent="#075E54" delay={0.16} />
                <Stat icon={Inbox} label="Queue Status" target={12} suffix=" pending" accent="#53BDEB" delay={0.24} />
              </div>
            </div>

            {/* Chart panel */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-white p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Campaign reports</h3>
                  <p className="text-[11px] text-muted-foreground">Last 12 weeks · all campaigns</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-wa-green/10 px-2 py-1 text-[10px] font-medium text-wa-green-dark">
                  <TrendingUp className="h-3 w-3" />
                  +24% MoM
                </div>
              </div>
              <MiniBarChart data={[40, 65, 50, 80, 70, 95, 85, 110, 100, 130, 120, 145]} color="#25D366" />
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>W1</span><span>W6</span><span>W12</span>
              </div>
            </div>

            {/* Live chats */}
            <div className="lg:col-span-5 rounded-2xl border border-border bg-white p-4 sm:p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Live chats</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-wa-green/10 px-2 py-0.5 text-[10px] font-medium text-wa-green-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-wa-green animate-pulse" />
                  8 active
                </span>
              </div>
              <div className="max-h-[260px] overflow-y-auto custom-scroll pr-1">
                <LiveChatRow name="Aarav Mehta" message="Can you ship the bulk sender today?" time="2m" status="read" initials="AM" />
                <LiveChatRow name="Sofia Rao" message="Order #8821 — tracking please?" time="4m" status="delivered" initials="SR" />
                <LiveChatRow name="Daniel F." message="Bulk campaign for 5k contacts" time="6m" status="read" initials="DF" />
                <LiveChatRow name="Ishita K." message="Need a demo for team of 12" time="9m" status="queued" initials="IK" />
                <LiveChatRow name="Rahul V." message="Pricing for enterprise?" time="12m" status="read" initials="RV" />
                <LiveChatRow name="Maya I." message="Webhook signing question" time="14m" status="delivered" initials="MI" />
              </div>
            </div>

            {/* Footer KPIs */}
            <div className="lg:col-span-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-[#F6FBF8] p-3">
                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                  <Activity className="h-3 w-3" /> Throughput
                </div>
                <div className="mt-1 text-base font-bold text-foreground">1,240/min</div>
              </div>
              <div className="rounded-xl bg-[#F6FBF8] p-3">
                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                  <MessageSquare className="h-3 w-3" /> Avg. response
                </div>
                <div className="mt-1 text-base font-bold text-foreground">0.4s</div>
              </div>
              <div className="rounded-xl bg-[#F6FBF8] p-3">
                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                  <BarChart3 className="h-3 w-3" /> Open rate
                </div>
                <div className="mt-1 text-base font-bold text-foreground">94.1%</div>
              </div>
              <div className="rounded-xl bg-[#F6FBF8] p-3">
                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                  <CheckCheck className="h-3 w-3" /> Conversion
                </div>
                <div className="mt-1 text-base font-bold text-foreground">12.8%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
