import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/site/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = siteConfig.url;
const OWNER_NAME = "Punit Mistry";
const OWNER_PHONE = "+91 82860 75880";
const BRAND_NAME = "WhatsApp Automation Platform";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#075E54" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WhatsApp Automation Platform | OpenWA Automation by Punit Mistry",
    template: "%s | WhatsApp Automation by Punit Mistry",
  },
  description:
    "Automate WhatsApp conversations, campaigns, follow-ups, AI replies, CRM integrations, and customer engagement using OpenWA. Bulk WhatsApp sender, AI WhatsApp bot, WhatsApp CRM and marketing software built by Punit Mistry.",
  keywords: [
    "WhatsApp Automation",
    "OpenWA",
    "WhatsApp API",
    "WhatsApp Marketing",
    "Bulk WhatsApp Sender",
    "WhatsApp CRM",
    "WhatsApp Business Automation",
    "AI WhatsApp Bot",
    "WhatsApp Chatbot",
    "WhatsApp Campaign Software",
    "WhatsApp Marketing India",
    "OpenWA Automation",
  ],
  authors: [{ name: OWNER_NAME, url: SITE_URL }],
  creator: OWNER_NAME,
  publisher: OWNER_NAME,
  applicationName: BRAND_NAME,
  category: "SaaS",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: "Automate WhatsApp Like Never Before | WhatsApp Automation Platform",
    description:
      "Automate conversations, campaigns, follow-ups, AI replies, CRM integrations, and customer engagement using OpenWA. Built by Punit Mistry.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "WhatsApp Automation Platform by Punit Mistry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automate WhatsApp Like Never Before",
    description:
      "OpenWA-powered WhatsApp Automation Platform by Punit Mistry. Bulk messaging, AI replies, CRM, campaigns, analytics.",
    images: ["/og"],
    creator: "@punitmistry",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "google-site-verification-token",
  },
  other: {
    "format-detection": "telephone=yes",
    "msapplication-TileColor": "#25D366",
    "theme-color": "#25D366",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <SiteJsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
