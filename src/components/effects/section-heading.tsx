"use client";

import { type LucideIcon } from "lucide-react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? `mx-auto max-w-3xl text-center ${className ?? ""}`
          : `max-w-3xl ${className ?? ""}`
      }
    >
      {eyebrow && (
        <div
          className={
            align === "center"
              ? "mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green-dark"
              : "mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green-dark"
          }
        >
          <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/** Icon registry to avoid dynamic lookups */
import {
  Smartphone, Send, Sparkles, Database, CalendarClock, Inbox, Tags,
  BarChart3, Plug, Webhook, Contact, Megaphone, Workflow, Bot,
  Link2, QrCode, Rocket, LineChart, Zap, GitBranch, Clock,
  MessageCircle, Sheet, Briefcase, Hash, ShoppingBag, ShoppingCart, Code,
  Check, X, ArrowRight, Phone, Mail, Building2, User, Globe,
  type LucideProps,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Smartphone, Send, Sparkles, Database, CalendarClock, Inbox, Tags,
  BarChart3, Plug, Webhook, Contact, Megaphone, Workflow, Bot,
  Link2, QrCode, Rocket, LineChart, Zap, GitBranch, Clock,
  MessageCircle, Sheet, Briefcase, Hash, ShoppingBag, ShoppingCart, Code,
  Check, X, ArrowRight, Phone, Mail, Building2, User, Globe,
};

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp {...props} />;
}
