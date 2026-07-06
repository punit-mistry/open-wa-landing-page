import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { PricingSection } from "@/components/sections/pricing";
import { PricingCalculatorSection } from "@/components/sections/pricing-calculator";
import { RoiCalculatorSection } from "@/components/sections/roi-calculator";
import { ComparisonSection } from "@/components/sections/comparison";
import { FaqSection } from "@/components/sections/faq";
import { siteConfig } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Pricing | WhatsApp Automation Platform",
  description:
    "Choose the right plan for your business. Starter at ₹2,499/mo, Professional at ₹7,999/mo, or Enterprise with custom pricing. Compare plans and calculate your ROI.",
  openGraph: {
    title: "Pricing | WhatsApp Automation Platform",
    description:
      "Choose the right plan. Starter ₹2,499/mo, Professional ₹7,999/mo, or Enterprise. Compare plans and calculate your ROI.",
    url: `${siteConfig.url}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex min-h-screen flex-col pt-24">
        <PricingSection />
        <PricingCalculatorSection />
        <RoiCalculatorSection />
        <ComparisonSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
