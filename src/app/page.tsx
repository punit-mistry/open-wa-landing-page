import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { GlobalCounterBanner } from "@/components/layout/global-counter-banner";
import { KeyboardShortcuts } from "@/components/layout/keyboard-shortcuts";
import { KeyboardHint } from "@/components/layout/keyboard-hint";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";
import { LiveActivityFeed } from "@/components/sections/live-activity-feed";
import { HeroSection } from "@/components/sections/hero";
import { TrustedByMarquee } from "@/components/sections/trusted-by";
import { FeaturesSection } from "@/components/sections/features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { WorkflowSection } from "@/components/sections/workflow";
import { AiChatDemoSection } from "@/components/sections/ai-chat-demo";
import { DashboardSection } from "@/components/sections/dashboard";
import { IntegrationsSection } from "@/components/sections/integrations";
import { AnalyticsSection } from "@/components/sections/analytics";
import { ComparisonSection } from "@/components/sections/comparison";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { PricingCalculatorSection } from "@/components/sections/pricing-calculator";
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

      {/* Global effects */}
      <CursorSpotlight />
      <ScrollProgress />
      <KeyboardShortcuts />
      <KeyboardHint />
      <GlobalCounterBanner />
      <LiveActivityFeed />

      <SiteHeader />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <TrustedByMarquee />
        <FeaturesSection />
        <HowItWorksSection />
        <WorkflowSection />
        <AiChatDemoSection />
        <DashboardSection />
        <IntegrationsSection />
        <AnalyticsSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <PricingCalculatorSection />
        <FaqSection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
