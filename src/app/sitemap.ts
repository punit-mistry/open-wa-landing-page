import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const sections = [
    "",
    "#features",
    "#how-it-works",
    "#workflow",
    "#dashboard",
    "#integrations",
    "#analytics",
    "#comparison",
    "#testimonials",
    "#pricing",
    "#faq",
    "#contact",
  ];
  return sections.map((s) => ({
    url: `${siteConfig.url}/${s}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: s === "" ? 1 : 0.8,
  }));
}
