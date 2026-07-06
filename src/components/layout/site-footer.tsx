"use client";

import { MessageCircle, Twitter, Linkedin, Github, Instagram, Youtube, Phone, Mail, Globe } from "lucide-react";
import { siteConfig, navLinks, features } from "@/lib/site/content";

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Documentation", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

const socialLinks = [
  { label: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { label: "GitHub", href: siteConfig.social.github, icon: Github },
  { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  { label: "YouTube", href: siteConfig.social.youtube, icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-[#0b141a] text-white/80">
      {/* Top gradient line */}
      <div aria-hidden className="h-1 bg-gradient-wa" />

      <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-wa shadow-glow-wa">
                <MessageCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold text-white">WA Automation</span>
                <span className="text-[11px] text-white/60">by {siteConfig.founder}</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.description} Built for teams that want enterprise-grade WhatsApp automation without the enterprise-grade complexity.
            </p>

            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-wa-green"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-wa-green"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <span className="inline-flex items-center gap-2 text-white/70">
                <Globe className="h-4 w-4" />
                Mumbai, India · Serving globally
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-wa-green"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Capabilities</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {features.slice(0, 10).map((f) => (
                <li key={f.title}>
                  <a
                    href="#features"
                    className="text-sm text-white/70 transition-colors hover:text-wa-green"
                  >
                    {f.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. Built by {siteConfig.founder}. Powered by OpenWA.
          </p>
          <div className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all hover:bg-wa-green hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp chat button (text) */}
      <div className="border-t border-white/10 bg-black/30 px-4 py-3 text-center text-xs text-white/50">
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-wa-green transition-opacity hover:opacity-80"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Chat with {siteConfig.founder} on WhatsApp
        </a>
      </div>
    </footer>
  );
}
