"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Check, PlayCircle, Phone, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoDemoModal } from "@/components/effects/video-demo-modal";
import { AudioPlayer } from "@/components/effects/audio-player";
import { siteConfig } from "@/lib/site/content";

const floatVar = (delay: number, y: number) => ({
  hidden: { opacity: 0, y: y + 12, scale: 0.96 },
  show: {
    opacity: 1,
    y,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-mesh-wa pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28"
      aria-label="Hero"
    >
      {/* Floating gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#25D366]/20 blur-3xl animate-blob" />
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-[#128C7E]/15 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#53BDEB]/12 blur-3xl animate-blob" style={{ animationDelay: "9s" }} />
      </div>

      {/* Grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1.5 text-xs font-medium text-wa-green-dark"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-wa-green" />
              </span>
              Powered by OpenWA · Built by {siteConfig.founder}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Automate WhatsApp{" "}
              <span className="relative inline-block">
                <span className="text-gradient-wa">Like Never Before</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 320 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 11C70 4 250 2 318 8"
                    stroke="url(#hero-underline)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={reduce ? undefined : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="hero-underline" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#25D366" />
                      <stop offset="1" stopColor="#128C7E" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Automate conversations, campaigns, follow-ups, AI replies, CRM integrations, and customer engagement using{" "}
              <span className="font-semibold text-foreground">OpenWA</span>. The enterprise-grade WhatsApp automation platform purpose-built for 2026.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button asChild size="lg" className="group bg-gradient-wa font-semibold text-white shadow-glow-wa hover:opacity-95">
                <a href="#contact">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="group gap-2 font-medium">
                <a href="#contact">
                  <PlayCircle className="h-4 w-4 text-wa-green-dark" />
                  Book Demo
                </a>
              </Button>
              <VideoDemoModal>
                <span className="hidden sm:inline-flex">Watch 2-min demo</span>
                <span className="sm:hidden">Demo</span>
              </VideoDemoModal>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:max-w-md"
            >
              {[
                { v: "97%", l: "Delivery rate" },
                { v: "4.9★", l: "412 reviews" },
                { v: "10M+", l: "Messages / mo" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-foreground sm:text-2xl">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-6">
            <motion.div
              initial="hidden"
              animate="show"
              className="relative mx-auto aspect-square w-full max-w-xl"
            >
              {/* Glow */}
              <div aria-hidden className="absolute inset-6 rounded-[40px] bg-gradient-wa opacity-30 blur-3xl" />

              {/* Laptop dashboard mockup */}
              <motion.div variants={floatVar(0.1, 0)} className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2">
                <div className="glass rounded-2xl p-2 shadow-premium">
                  <div className="rounded-xl border border-border bg-card p-3">
                    {/* Window chrome */}
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                      <span className="ml-2 text-[10px] font-medium text-muted-foreground">wa-automation.app/dashboard</span>
                    </div>

                    <img
                      src="/images/dashboard-preview.png"
                      alt="OpenWA Dashboard Preview"
                      className="w-full rounded-lg"
                      loading="eager"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Phone mockup — bottom right */}
              <motion.div
                variants={floatVar(0.3, 90)}
                className="absolute bottom-2 right-0 w-[38%] sm:w-[36%] animate-float-soft"
              >
                <div className="relative rounded-[28px] border-[3px] border-[#075E54] bg-[#0b141a] p-2 shadow-glow-wa">
                  <div className="rounded-[20px] bg-[#0b141a] overflow-hidden">
                    {/* WA chat header */}
                    <div className="flex items-center gap-2 bg-[#075E54] px-2.5 py-2 text-white">
                      <div className="h-6 w-6 rounded-full bg-[#DCF8C6] flex items-center justify-center text-[9px] font-bold text-[#075E54]">AC</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-semibold truncate">Acme Corp</div>
                        <div className="text-[8px] text-white/70">online</div>
                      </div>
                      <Phone className="h-3 w-3 text-white/80" />
                    </div>
                    {/* Chat body */}
                    <div className="space-y-1.5 bg-[#0b141a] p-2" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "12px 12px" }}>
                      <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-[#005C4B] px-2 py-1 text-[9px] text-white">
                        Hi! Is the bulk sender live now?
                      </div>
                      <div className="mr-auto max-w-[80%] rounded-lg rounded-tl-sm bg-[#202C33] px-2 py-1 text-[9px] text-white">
                        Yes ✨ Campaign #1284 sent to 4,212 contacts.
                      </div>
                      <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-[#005C4B] px-2 py-1 text-[9px] text-white">
                        What about AI replies?
                      </div>
                      <div className="mr-auto flex items-center gap-1 rounded-lg rounded-tl-sm bg-[#202C33] px-2 py-1.5">
                        <span className="typing-dot h-1 w-1 rounded-full bg-white/70" style={{ animationDelay: "0s" }} />
                        <span className="typing-dot h-1 w-1 rounded-full bg-white/70" style={{ animationDelay: "0.2s" }} />
                        <span className="typing-dot h-1 w-1 rounded-full bg-white/70" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card top-left: AI Reply */}
              <motion.div
                variants={floatVar(0.5, -10)}
                className="absolute left-0 top-4 w-[42%] sm:w-[40%] animate-float-slow"
              >
                <div className="glass rounded-2xl p-3 shadow-premium">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-wa-green/15 text-wa-green-dark">
                      <Bot className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold text-foreground">AI Reply</div>
                      <div className="text-[9px] text-muted-foreground">Replied in 0.4s</div>
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-foreground/80">
                    "Your order #8821 ships today. Tracking link inside ✨"
                  </p>
                </div>
              </motion.div>

              {/* Floating card bottom-left: Campaign */}
              <motion.div
                variants={floatVar(0.7, 100)}
                className="absolute -left-2 bottom-12 w-[40%] sm:w-[36%]"
              >
                <div className="glass rounded-2xl p-3 shadow-premium">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-wa-green/15 text-wa-green-dark">
                      <Send className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold text-foreground">Campaign sent</div>
                      <div className="text-[9px] text-muted-foreground">4,212 / 4,300</div>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-wa-green/15 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-wa"
                      initial={reduce ? undefined : { width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1.2, delay: 1 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating notification top-right */}
              <motion.div
                variants={floatVar(0.9, -20)}
                className="absolute right-2 top-0 max-w-[180px]"
              >
                <div className="glass rounded-2xl p-2.5 shadow-premium">
                  <div className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wa-green" />
                    <div>
                      <div className="text-[10px] font-semibold text-foreground">New lead captured</div>
                      <div className="text-[9px] text-muted-foreground">Synced to HubSpot ✓</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Audio player */}
              <AudioPlayer />

              {/* Tick badge */}
              <motion.div
                variants={floatVar(1.1, 60)}
                className="absolute right-6 bottom-4"
              >
                <div className="inline-flex items-center gap-1 rounded-full bg-card px-2 py-1 text-[10px] font-semibold text-wa-green-dark shadow-premium">
                  <Check className="h-3 w-3" />
                  Delivered
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
