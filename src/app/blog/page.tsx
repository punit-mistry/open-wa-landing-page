import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { blogPosts } from "@/lib/site/blog";
import { siteConfig } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Blog | WhatsApp Automation Tips & Guides",
  description:
    "Read the latest articles about WhatsApp automation, AI bots, bulk messaging, CRM integration, workflow automation, and marketing strategies by Punit Mistry.",
  openGraph: {
    title: "Blog | WhatsApp Automation Tips & Guides",
    description:
      "Read the latest articles about WhatsApp automation, AI bots, bulk messaging, CRM integration, and marketing strategies.",
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex min-h-screen flex-col pt-28 pb-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />
            Blog
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            WhatsApp Automation Guides
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Tips, strategies, and best practices for automating your WhatsApp business messaging, AI replies, CRM sync, and campaigns.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-premium transition-all hover:-translate-y-1 hover:shadow-glow-wa"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-wa-green/10 px-2 py-0.5 text-[10px] font-medium text-wa-green-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-base font-bold text-foreground group-hover:text-wa-green-dark transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
