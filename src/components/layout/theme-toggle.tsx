"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Theme toggle — adds/removes `dark` class on <html>.
 * Persists to localStorage. Defaults to light.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      // Apply class directly first (no React state needed for the side effect)
      document.documentElement.classList.add("dark");
      // Then sync state via microtask to avoid synchronous setState in effect
      Promise.resolve().then(() => setDark(true));
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/80 text-foreground shadow-sm transition-all hover:scale-105 hover:bg-accent",
        className
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
