"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send, Bot, Database, Sparkles, X, TrendingUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Activity = {
  id: number;
  name: string;
  city: string;
  action: string;
  value: string;
  icon: "send" | "bot" | "sync" | "lead" | "revenue";
  color: string;
};

const NAMES = [
  ["Aarav", "Mumbai"], ["Sofia", "Bangalore"], ["Daniel", "Goa"],
  ["Ishita", "Pune"], ["Rahul", "Delhi"], ["Maya", "Chennai"],
  ["Karthik", "Hyderabad"], ["Priya", "Kolkata"], ["Arjun", "Jaipur"],
  ["Neha", "Surat"], ["Vikram", "Lucknow"], ["Anjali", "Indore"],
  ["Rohan", "Chandigarh"], ["Meera", "Bhopal"], ["Aditya", "Patna"],
  ["Sneha", "Nagpur"], ["Karan", "Coimbatore"], ["Pooja", "Vadodara"],
];

const ACTIONS: Activity[] = [
  { id: 0, name: "", city: "", action: "sent a campaign to", value: "5,200 contacts", icon: "send", color: "#25D366" },
  { id: 0, name: "", city: "", action: "booked a demo via", value: "AI auto-reply", icon: "bot", color: "#53BDEB" },
  { id: 0, name: "", city: "", action: "synced", value: "412 leads to HubSpot", icon: "sync", color: "#128C7E" },
  { id: 0, name: "", city: "", action: "captured a new lead worth", value: "₹2.4L", icon: "lead", color: "#25D366" },
  { id: 0, name: "", city: "", action: "generated", value: "₹84,000 revenue", icon: "revenue", color: "#128C7E" },
  { id: 0, name: "", city: "", action: "automated", value: "1,240 replies", icon: "bot", color: "#53BDEB" },
  { id: 0, name: "", city: "", action: "launched workflow", value: "Diwali Sale Drip", icon: "send", color: "#25D366" },
  { id: 0, name: "", city: "", action: "delivered", value: "12K messages · 98% rate", icon: "send", color: "#075E54" },
];

const ICONS = {
  send: Send,
  bot: Bot,
  sync: Database,
  lead: Sparkles,
  revenue: TrendingUp,
};

let counter = 1;

function randomActivity(): Activity {
  const [name, city] = NAMES[Math.floor(Math.random() * NAMES.length)];
  const base = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  return { ...base, id: counter++, name, city };
}

export function LiveActivityFeed() {
  const reduced = usePrefersReducedMotion();
  const [current, setCurrent] = useState<Activity | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (reduced || dismissed) return;

    let timeoutShow: ReturnType<typeof setTimeout>;
    let timeoutHide: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setCurrent(randomActivity());
      setVisible(true);
      timeoutHide = setTimeout(() => {
        setVisible(false);
        timeoutShow = setTimeout(cycle, 2500 + Math.random() * 2500);
      }, 5000);
    };

    // Start first toast after a short delay
    timeoutShow = setTimeout(cycle, 4000);

    return () => {
      clearTimeout(timeoutShow);
      clearTimeout(timeoutHide);
    };
  }, [reduced, dismissed]);

  if (reduced || dismissed) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-40 sm:bottom-28 sm:left-6">
      <AnimatePresence>
        {visible && current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -120, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -120, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto glass relative max-w-[280px] rounded-2xl p-3 pr-8 shadow-premium"
          >
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss activity notifications"
              className="absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-start gap-2.5">
              <span
                className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: current.color }}
              >
                {(() => {
                  const Icon = ICONS[current.icon];
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] leading-snug text-foreground">
                  <span className="font-semibold">{current.name}</span>{" "}
                  <span className="text-muted-foreground">from {current.city}</span>
                </p>
                <p className="text-[11px] leading-snug text-muted-foreground">
                  {current.action}{" "}
                  <span className="font-semibold text-foreground">{current.value}</span>
                </p>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-wa-green-dark">
                  <span className="h-1 w-1 rounded-full bg-wa-green animate-pulse" />
                  Live · just now
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
