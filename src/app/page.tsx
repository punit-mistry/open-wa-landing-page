import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { WorkflowSection } from "@/components/sections/workflow";
import { DashboardSection } from "@/components/sections/dashboard";
import { IntegrationsSection } from "@/components/sections/integrations";
import { AnalyticsSection } from "@/components/sections/analytics";
import { ComparisonSection } from "@/components/sections/comparison";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { FinalCtaSection } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <SmoothScroll>
      <a
        href="#features"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-wa-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WorkflowSection />
        <DashboardSection />
        <IntegrationsSection />
        <AnalyticsSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
