"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/effects/section-heading";
import { useCountUp } from "@/hooks/use-count-up";
import { TrendingUp, TrendingDown } from "lucide-react";

function MetricCard({
  label,
  value,
  suffix,
  decimals,
  change,
  up = true,
  color,
  delay,
}: {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  change: string;
  up?: boolean;
  color: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const { ref, display } = useCountUp(value, { suffix, decimals });

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-premium"
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div ref={ref} className="mt-1 text-3xl font-bold tabular-nums text-foreground">
          {display}
        </div>
        <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium" style={{ color: up ? "#128C7E" : "#DC2626" }}>
          {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {change}
        </div>
      </div>
    </motion.div>
  );
}

function RadialGauge({
  value,
  label,
  color,
  size = 140,
  delay = 0,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const radius = (size - 18) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  const { ref, display } = useCountUp(value, { suffix: "%", duration: 1800 });

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={reduce ? undefined : { strokeDashoffset: circumference }}
            whileInView={reduce ? undefined : { strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span ref={ref} className="text-xl font-bold text-foreground">{display}</span>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function AnalyticsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="analytics"
      className="relative overflow-hidden bg-[#0b141a] py-20 lg:py-28"
      aria-labelledby="analytics-heading"
    >
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-wa-green/15 blur-3xl animate-blob" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-[#128C7E]/20 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green">
            <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />
            Analytics
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Numbers that actually move the needle
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Every message, click, reply and conversion tracked in real time — so you know exactly what to scale next.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Messages Sent" value={2841920} change="+38% MoM" color="#25D366" delay={0} />
            <MetricCard label="Delivery Rate" value={97.3} decimals={1} suffix="%" change="+1.4%" color="#128C7E" delay={0.08} />
            <MetricCard label="Open Rate" value={94.1} decimals={1} suffix="%" change="+6.2%" color="#53BDEB" delay={0.16} />
            <MetricCard label="Click Rate" value={42.8} decimals={1} suffix="%" change="+9.1%" color="#075E54" delay={0.24} />
          </div>

          {/* Radial gauges */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8"
          >
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              <RadialGauge value={97} label="Delivery" color="#25D366" delay={0.1} />
              <RadialGauge value={94} label="Open Rate" color="#53BDEB" delay={0.2} />
              <RadialGauge value={68} label="Response Rate" color="#128C7E" delay={0.3} />
              <RadialGauge value={43} label="Response Rate" color="#075E54" delay={0.4} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">12.8%</div>
                <div className="text-xs text-white/60">Conversion Rate</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">0.4s</div>
                <div className="text-xs text-white/60">Avg. AI Reply Time</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">₹4.2 Cr</div>
                <div className="text-xs text-white/60">Revenue Attributed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
