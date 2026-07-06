"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";

export function NewsletterSection() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate API call (replace with real endpoint in prod)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-subtle py-20 lg:py-28"
      aria-labelledby="newsletter-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-wa-green/30 bg-gradient-to-br from-wa-green/10 to-card p-8 shadow-premium sm:p-12"
        >
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-wa-green/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green-dark">
                <FileText className="h-3 w-3" />
                Free playbook
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                The WhatsApp Automation Playbook
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                42 pages of real workflows, scripts and ROI breakdowns from 412+ businesses. PDF drops into your inbox in 30 seconds.
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <li>✓ 14 ready-to-use workflow templates</li>
                <li>✓ ROI calculator spreadsheet (Excel + Sheets)</li>
                <li>✓ Compliance checklist for Indian businesses</li>
                <li>✓ Punit Mistry's personal onboarding playbook</li>
              </ul>
            </div>

            {/* Right: form */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl bg-card p-6 text-center shadow-premium"
                  >
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-wa-green/15 text-wa-green-dark">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-foreground">Check your inbox!</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      The PDF is on its way. (Check spam if you don't see it in 2 minutes.)
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 text-xs font-semibold text-wa-green-dark hover:underline"
                    >
                      Send to a different email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={reduce ? undefined : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={onSubmit}
                    className="space-y-3"
                  >
                    <div>
                      <label htmlFor="newsletter-email" className="text-xs font-semibold text-foreground">
                        Work email
                      </label>
                      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-wa-green/40 focus-within:ring-2 focus-within:ring-wa-green/20">
                        <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <input
                          id="newsletter-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder="you@company.com"
                          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                          required
                        />
                      </div>
                      {status === "error" && (
                        <p className="mt-1.5 text-[11px] font-medium text-red-600">
                          Please enter a valid email address.
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-wa px-4 py-3 text-sm font-semibold text-white shadow-glow-wa transition-all hover:opacity-95 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending PDF…
                        </>
                      ) : (
                        <>
                          Send me the playbook
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-muted-foreground">
                      No spam. Unsubscribe in one click. We never share your email.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
