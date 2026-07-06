import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { FeaturesSection } from "@/components/sections/features";
import { BentoSection } from "@/components/sections/bento";
import { siteConfig } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Features | WhatsApp Automation Platform",
  description:
    "Explore all features of OpenWA: Multi Device, Bulk Messaging, AI Auto Replies, CRM Integration, Campaign Scheduling, Team Inbox, Chat Labels, Analytics, API, Webhooks, Workflow Builder and more.",
  openGraph: {
    title: "Features | WhatsApp Automation Platform",
    description:
      "Explore all features of OpenWA: Multi Device, Bulk Messaging, AI Auto Replies, CRM Integration, Campaign Scheduling, Team Inbox, Chat Labels, Analytics, API, Webhooks, Workflow Builder and more.",
    url: `${siteConfig.url}/features`,
  },
};

export default function FeaturesPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex min-h-screen flex-col pt-24">
        <BentoSection />
        <FeaturesSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
