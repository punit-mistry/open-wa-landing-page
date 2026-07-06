"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MessageCircle, CreditCard, Phone, Bot, Calculator,
  Workflow, BarChart3, Shield, Mail, ArrowRight, Home,
} from "lucide-react";
import { siteConfig } from "@/lib/site/content";

type Command = {
  id: string;
  label: string;
  hint: string;
  icon: any;
  action: () => void;
  group: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: "home", label: "Go to top", hint: "Scroll up", icon: Home, group: "Navigation", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { id: "features", label: "Features", hint: "14 capabilities", icon: Workflow, group: "Navigation", action: () => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "ai-demo", label: "Try AI Chat Demo", hint: "Live bot", icon: Bot, group: "Navigation", action: () => document.getElementById("ai-demo")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "pricing", label: "Pricing", hint: "3 plans", icon: CreditCard, group: "Navigation", action: () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "calculator", label: "Pricing Calculator", hint: "Estimate cost", icon: Calculator, group: "Navigation", action: () => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "roi", label: "ROI Calculator", hint: "Savings estimate", icon: BarChart3, group: "Navigation", action: () => document.getElementById("roi-calculator")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "api", label: "API Playground", hint: "Code samples", icon: Search, group: "Navigation", action: () => document.getElementById("api")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "security", label: "Security & Compliance", hint: "GDPR · SOC 2", icon: Shield, group: "Navigation", action: () => document.getElementById("security")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "contact", label: "Contact form", hint: "Send WhatsApp", icon: Mail, group: "Navigation", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    {
      id: "whatsapp",
      label: "Open WhatsApp",
      hint: `Message ${siteConfig.founder}`,
      icon: MessageCircle,
      group: "Actions",
      action: () => {
        const msg = encodeURIComponent(`Hello ${siteConfig.founder},\n\nI am interested in your WhatsApp Automation Platform. Please share more details.\n\nThank you.`);
        window.open(`${siteConfig.whatsappUrl}?text=${msg}`, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "call",
      label: "Call Punit Mistry",
      hint: siteConfig.phone,
      icon: Phone,
      group: "Actions",
      action: () => window.open(`tel:${siteConfig.phoneRaw}`, "_self"),
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.hint.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      // ESC closes
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
      // Arrow keys + Enter only when open
      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIdx((i) => (i + 1) % filtered.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIdx((i) => (i - 1 + filtered.length) % filtered.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const cmd = filtered[activeIdx];
          if (cmd) {
            cmd.action();
            setOpen(false);
            setQuery("");
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIdx]);

  // Focus input when opened + reset on close
  useEffect(() => {
    if (open) {
      setActiveIdx(0);
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Group filtered commands
  const groups = filtered.reduce<Record<string, Command[]>>((acc, c) => {
    if (!acc[c.group]) acc[c.group] = [];
    acc[c.group].push(c);
    return acc;
  }, {});

  let runningIdx = 0;

  return (
    <>
      {/* Trigger button (floating, bottom-left of viewport, hidden on small) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette (Cmd+K)"
        className="fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground shadow-premium backdrop-blur-md transition-all hover:bg-accent sm:inline-flex lg:bottom-6 lg:left-6"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Quick jump</span>
        <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold text-foreground">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-glow-wa-strong"
            >
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIdx(0);
                  }}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto custom-scroll p-2">
                {filtered.length === 0 ? (
                  <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No results for "{query}"
                  </div>
                ) : (
                  Object.entries(groups).map(([groupName, cmds]) => (
                    <div key={groupName} className="mb-2">
                      <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {groupName}
                      </div>
                      {cmds.map((cmd) => {
                        const idx = runningIdx++;
                        const isActive = idx === activeIdx;
                        const Icon = cmd.icon;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              setOpen(false);
                              setQuery("");
                            }}
                            onMouseEnter={() => setActiveIdx(idx)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                              isActive ? "bg-wa-green/10 text-foreground" : "text-foreground/80 hover:bg-accent"
                            }`}
                          >
                            <span className={`inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${isActive ? "bg-wa-green/20 text-wa-green-dark" : "bg-muted text-muted-foreground"}`}>
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                            <span className="text-xs text-muted-foreground">{cmd.hint}</span>
                            {isActive && <ArrowRight className="h-3 w-3 text-wa-green-dark" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono font-bold">↑</kbd>
                    <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono font-bold">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono font-bold">↵</kbd>
                    select
                  </span>
                </div>
                <span>WA Automation · by {siteConfig.founder}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
