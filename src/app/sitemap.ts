import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site/content";
import { blogPosts } from "@/lib/site/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    { url: siteConfig.url, priority: 1 },
    { url: `${siteConfig.url}/features`, priority: 0.9 },
    { url: `${siteConfig.url}/pricing`, priority: 0.9 },
    { url: `${siteConfig.url}/contact`, priority: 0.8 },
    { url: `${siteConfig.url}/blog`, priority: 0.9 },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  return [
    ...staticPages.map((p) => ({
      url: p.url,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: p.priority,
    })),
    ...blogPages,
  ];
}
