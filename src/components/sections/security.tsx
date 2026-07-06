"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Shield, Lock, FileCheck, Globe, Server, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";

const badges = [
  {
    icon: FileCheck,
    title: "GDPR Compliant",
    description: "Full data subject rights, opt-in management and EU data residency available.",
    color: "#25D366",
  },
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description: "Audited annually by independent third-party. Reports available on request.",
    color: "#128C7E",
  },
  {
    icon: Lock,
    title: "ISO 27001",
    description: "Certified information security management system across all infrastructure.",
    color: "#075E54",
  },
  {
    icon: Globe,
    title: "End-to-end encryption",
    description: "Messages encrypted in transit and at rest. Keys rotated every 90 days.",
    color: "#53BDEB",
  },
];

export function SecuritySection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="security"
      className="relative overflow-hidden bg-[#0b141a] py-20 lg:py-28"
      aria-labelledby="security-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-wa-green/15 blur-3xl animate-blob" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-[#128C7E]/20 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green">
            <Shield className="h-3 w-3" />
            Security & Compliance
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:leading-[1.1]">
            Enterprise-grade security, built in
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Your customer conversations are sacred. We protect them with bank-grade encryption, third-party audits, and compliance certifications your enterprise security team will actually accept.
          </p>
        </div>

        {/* Badges grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
              >
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${b.color}1a`, color: b.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{b.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">{b.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Status row */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 grid max-w-5xl gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:grid-cols-3"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa-green opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-wa-green" />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">All systems operational</div>
              <div className="text-[11px] text-white/50">Updated 2 min ago · status.wa-automation.dev</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-6">
            <Server className="h-5 w-5 text-wa-green" />
            <div>
              <div className="text-sm font-semibold text-white">99.98% uptime</div>
              <div className="text-[11px] text-white/50">Last 90 days</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-6">
            <CheckCircle2 className="h-5 w-5 text-wa-green" />
            <div>
              <div className="text-sm font-semibold text-white">India data residency</div>
              <div className="text-[11px] text-white/50">Mumbai + Hyderabad regions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
