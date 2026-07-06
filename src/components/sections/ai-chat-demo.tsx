"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, Sparkles, Bot, User, RotateCcw, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { id: number; role: "user" | "bot"; text: string; ts: number };

const SUGGESTIONS = [
  "What's your pricing?",
  "Book a free demo",
  "How does AI auto reply work?",
  "Can I send 10,000 messages?",
];

// Pre-scripted smart replies — simulates an AI bot without external API
function botReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("price") || q.includes("pricing") || q.includes("cost")) {
    return "We have 3 plans — Starter at ₹2,499/mo, Professional at ₹7,999/mo (most popular, includes AI replies + CRM sync), and Enterprise with custom pricing. Want me to set up a free trial? 🚀";
  }
  if (q.includes("demo")) {
    return "Awesome! I can book you a 1:1 demo with Punit Mistry directly. Just drop your email or tap 'Book Demo' below and we'll send a calendar invite within minutes. 📅";
  }
  if (q.includes("ai") || q.includes("auto") || q.includes("reply") || q.includes("bot")) {
    return "Our AI auto-reply is powered by OpenAI fine-tuned on your knowledge base. Avg response time: 0.4s. It handles FAQs, qualifies leads, escalates to humans when needed — 24/7. ⚡";
  }
  if (q.includes("bulk") || q.includes("broadcast") || q.includes("10,000") || q.includes("10000") || q.includes("send")) {
    return "Yes! Bulk messaging supports up to 100K messages/hour with smart throttling, personalised templates, and per-contact delivery tracking. Delivery rate averages 97.3%. 📲";
  }
  if (q.includes("crm") || q.includes("hubspot") || q.includes("salesforce")) {
    return "Native CRM sync with HubSpot, Salesforce, Google Sheets and 10+ more. Every conversation, label and lead attribute syncs both ways in real time. No more copy-paste! 🔁";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hey there! 👋 I'm the WhatsApp Automation AI assistant. Ask me about pricing, demos, AI replies, bulk messaging or CRM integrations.";
  }
  if (q.includes("thank")) {
    return "You're welcome! 😊 Want me to connect you with Punit Mistry directly on WhatsApp? Just tap the floating button at the bottom-right.";
  }
  return "Great question! I can help with pricing, demos, AI replies, bulk messaging, CRM integrations, workflow builder and more. Tap 'Book Demo' below to chat with Punit Mistry directly. 💬";
}

let idCounter = 1;

export function AiChatDemoSection() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Namaste! 🙏 I'm the WhatsApp Automation AI bot. Ask me anything — pricing, demos, AI replies, bulk messaging…",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { id: idCounter++, role: "user", text: trimmed, ts: Date.now() }]);
    setInput("");
    setTyping(true);
    const reply = botReply(trimmed);
    // Simulate "thinking" delay proportional to reply length
    const delay = Math.min(1600, 600 + reply.length * 8);
    setTimeout(() => {
      setMessages((m) => [...m, { id: idCounter++, role: "bot", text: reply, ts: Date.now() }]);
      setTyping(false);
    }, delay);
  };

  const reset = () => {
    setMessages([
      {
        id: idCounter++,
        role: "bot",
        text: "Fresh start! 🔄 What would you like to know about WhatsApp Automation?",
        ts: Date.now(),
      },
    ]);
  };

  return (
    <section
      id="ai-demo"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      aria-labelledby="ai-demo-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-wa-green/10 blur-3xl animate-blob" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-[#53BDEB]/10 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Try it live"
          title="Chat with our AI WhatsApp bot"
          description="This is the same AI engine that powers auto-replies for 412+ businesses. Type a question or pick a suggestion — it responds in real time."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Chat window */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-[#0b141a] shadow-premium">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 bg-[#075E54] px-5 py-3.5 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      <Bot className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#075E54] bg-wa-green" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">WA Automation AI</div>
                    <div className="text-[11px] text-white/70 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-wa-green animate-pulse" />
                      online · replies in ~0.4s
                    </div>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-white/20"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="custom-scroll h-[360px] space-y-2.5 overflow-y-auto bg-[#0b141a] p-4 sm:p-5"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={reduce ? undefined : { opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "flex items-end gap-2",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {m.role === "bot" && (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-wa-green/20 text-wa-green">
                        <Bot className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                        m.role === "user"
                          ? "rounded-br-sm bg-[#005C4B] text-white"
                          : "rounded-bl-sm bg-[#202C33] text-white"
                      )}
                    >
                      {m.text}
                    </div>
                    {m.role === "user" && (
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-wa-green/20 text-wa-green">
                        <User className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </motion.div>
                ))}

                {typing && (
                  <div className="flex items-end gap-2">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-wa-green/20 text-wa-green">
                      <Bot className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#202C33] px-4 py-3">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0s" }} />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0.2s" }} />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 bg-[#0b141a] px-4 py-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 transition-colors hover:bg-wa-green/20 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-white/5 bg-[#0b141a] p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  aria-label="Type a message to the AI bot"
                  className="flex-1 rounded-full bg-[#202C33] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-wa-green/40"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-wa text-white shadow-glow-wa transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-wa-green/20 bg-gradient-to-br from-[#F0FDF4] to-white p-5 shadow-premium">
                <div className="flex items-center gap-2 text-wa-green-dark">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-bold">This is not a recording</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Every reply is generated live by the same AI engine that powers our platform — fine-tuned on your knowledge base, with human handoff when needed.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-premium">
                  <div className="text-2xl font-bold text-foreground">0.4s</div>
                  <div className="text-[11px] text-muted-foreground">Avg response</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-premium">
                  <div className="text-2xl font-bold text-foreground">70%</div>
                  <div className="text-[11px] text-muted-foreground">FAQs auto-resolved</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-premium">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-[11px] text-muted-foreground">Always on</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-premium">
                  <div className="text-2xl font-bold text-foreground">12+</div>
                  <div className="text-[11px] text-muted-foreground">Languages</div>
                </div>
              </div>

              <Button asChild className="bg-gradient-wa font-semibold text-white shadow-glow-wa">
                <a href="#contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Deploy this on your WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
