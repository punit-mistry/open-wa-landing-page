import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ContactSection } from "@/components/sections/contact";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Contact | WhatsApp Automation Platform",
  description:
    "Get in touch with Punit Mistry. Fill the form and we'll open WhatsApp with your details pre-filled. Reply in <2 min, AI bot 24/7, free demo call.",
  openGraph: {
    title: "Contact | WhatsApp Automation Platform",
    description: "Get in touch. Reply in <2 min. AI bot 24/7. Free demo call.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex min-h-screen flex-col pt-24">
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
