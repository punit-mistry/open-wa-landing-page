"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site/content";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
              scrolled
                ? "glass shadow-premium"
                : "border border-transparent"
            )}
          >
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2.5 shrink-0">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-wa shadow-glow-wa">
                <MessageCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-tight text-foreground">
                  WA Automation
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  by {siteConfig.founder}
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-2 sm:flex">
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm" className="font-medium">
                <a href="#contact">Book Demo</a>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-wa font-semibold text-white shadow-glow-wa hover:opacity-95"
              >
                <a href="#contact">Start Free</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 text-foreground sm:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col gap-1 bg-white p-6 pt-24 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  <a href="#contact">Book Demo</a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-wa font-semibold text-white shadow-glow-wa"
                  onClick={() => setMobileOpen(false)}
                >
                  <a href="#contact">Start Free</a>
                </Button>
              </div>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
              >
                <MessageCircle className="h-4 w-4 text-wa-green" />
                {siteConfig.phone}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
