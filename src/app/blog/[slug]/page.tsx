import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { blogPosts } from "@/lib/site/blog";
import { siteConfig } from "@/lib/site/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | WhatsApp Automation Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex min-h-screen flex-col pt-28 pb-20">
        <article className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Blog
          </Link>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-wa-green/10 px-2 py-0.5 text-[10px] font-medium text-wa-green-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{post.date}</span>
          </div>

          <div className="mt-8 prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.trim().startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-8 mb-4 text-xl font-bold text-foreground">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.trim().startsWith("### ")) {
                return (
                  <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-foreground">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.trim().startsWith("**")) {
                return (
                  <p key={i} className="my-2 font-semibold text-foreground">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.trim().startsWith("- ")) {
                return (
                  <li key={i} className="ml-4 text-muted-foreground">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim().startsWith("|")) {
                return (
                  <p key={i} className="my-1 text-xs text-muted-foreground font-mono">
                    {line}
                  </p>
                );
              }
              if (line.trim() === "") {
                return <div key={i} className="h-2" />;
              }
              return (
                <p key={i} className="my-2 text-muted-foreground leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-wa-green-dark hover:underline"
            >
              ← All Articles
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
