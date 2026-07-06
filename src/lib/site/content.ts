const SITE_URL = "https://openwaautomation.vercel.app";

export const siteConfig = {
  name: "WhatsApp Automation Platform",
  shortName: "WA Automation",
  founder: "Punit Mistry",
  phone: "+91 82860 75880",
  phoneRaw: "918286075880",
  whatsappUrl: "https://wa.me/918286075880",
  email: "hello@punitmistry.dev",
  url: SITE_URL,
  tagline: "Automate WhatsApp Like Never Before",
  description:
    "Automate conversations, campaigns, follow-ups, AI replies, CRM integrations, and customer engagement using OpenWA.",
  social: {
    twitter: "https://twitter.com/punitmistry",
    linkedin: "https://www.linkedin.com/in/punitmistry",
    github: "https://github.com/punitmistry",
    instagram: "https://instagram.com/punitmistry",
    youtube: "https://youtube.com/@punitmistry",
  },
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
};

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Workflow", href: "#workflow" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export const features: Feature[] = [
  {
    title: "Multi Device",
    description: "Connect unlimited WhatsApp devices under a single unified workspace with isolated sessions.",
    icon: "Smartphone",
  },
  {
    title: "Bulk Messaging",
    description: "Send personalised broadcasts to thousands of contacts with smart throttling and queue control.",
    icon: "Send",
  },
  {
    title: "AI Auto Replies",
    description: "Train AI replies on your knowledge base so customers always get an instant, contextual answer.",
    icon: "Sparkles",
  },
  {
    title: "CRM Integration",
    description: "Sync every conversation, lead and label back to HubSpot, Salesforce or your custom CRM.",
    icon: "Database",
  },
  {
    title: "Campaign Scheduling",
    description: "Plan drip campaigns with date, time and timezone aware scheduling across audience segments.",
    icon: "CalendarClock",
  },
  {
    title: "Team Inbox",
    description: "Assign conversations, mention teammates and resolve tickets together in a shared inbox.",
    icon: "Inbox",
  },
  {
    title: "Chat Labels",
    description: "Tag, filter and segment contacts with custom labels for instant context and routing.",
    icon: "Tags",
  },
  {
    title: "Analytics",
    description: "Track delivery, read, response and conversion rates across every campaign in real time.",
    icon: "BarChart3",
  },
  {
    title: "API Integration",
    description: "Drop a single SDK call into your stack to trigger WhatsApp messages from any backend.",
    icon: "Plug",
  },
  {
    title: "Webhooks",
    description: "Subscribe to message, status and trigger events with signed, retry-safe webhooks.",
    icon: "Webhook",
  },
  {
    title: "Contact Management",
    description: "Unified contact graph with attributes, opt-in status and lifecycle history at your fingertips.",
    icon: "Contact",
  },
  {
    title: "Broadcast",
    description: "Reach segmented audiences with templated, media-rich broadcasts in a single click.",
    icon: "Megaphone",
  },
  {
    title: "Workflow Builder",
    description: "Drag, drop and chain triggers, conditions and AI actions into no-code automations.",
    icon: "Workflow",
  },
  {
    title: "WhatsApp Business Automation",
    description: "End-to-end automation layer purpose-built for the WhatsApp Business ecosystem.",
    icon: "Bot",
  },
];

export type HowStep = {
  title: string;
  description: string;
  icon: string;
};

export const howSteps: HowStep[] = [
  {
    title: "Connect WhatsApp",
    description: "Link your WhatsApp number through OpenWA with a single secure connection.",
    icon: "Link2",
  },
  {
    title: "Scan QR",
    description: "Authenticate instantly by scanning a QR code from your phone — no API keys to manage.",
    icon: "QrCode",
  },
  {
    title: "Create Automation",
    description: "Visually build your first workflow with triggers, conditions and AI replies.",
    icon: "Workflow",
  },
  {
    title: "Launch",
    description: "Go live in one click. Messages, follow-ups and campaigns start instantly.",
    icon: "Rocket",
  },
  {
    title: "Analyze",
    description: "Track every metric that matters and optimise with real-time analytics.",
    icon: "LineChart",
  },
];

export type WorkflowNode = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export const workflowNodes: WorkflowNode[] = [
  { title: "Trigger", description: "Keyword, schedule, webhook or inbound message", icon: "Zap", color: "#25D366" },
  { title: "Condition", description: "Branch on contact attribute or AI intent", icon: "GitBranch", color: "#128C7E" },
  { title: "Send Message", description: "Text, media, template or interactive button", icon: "Send", color: "#075E54" },
  { title: "Delay", description: "Wait seconds, minutes, days or until a window", icon: "Clock", color: "#25D366" },
  { title: "AI Reply", description: "OpenWA + LLM generates contextual response", icon: "Sparkles", color: "#53BDEB" },
  { title: "CRM Update", description: "Sync contact, lead and deal state to CRM", icon: "Database", color: "#128C7E" },
  { title: "Analytics", description: "Emit event to analytics and dashboards", icon: "BarChart3", color: "#075E54" },
];

export type Integration = {
  name: string;
  logo: string; // key into brandLogos
  category: string;
};

export const integrations: Integration[] = [
  { name: "OpenAI", logo: "OpenAI", category: "AI" },
  { name: "Google Sheets", logo: "Google", category: "Data" },
  { name: "HubSpot", logo: "HubSpot", category: "CRM" },
  { name: "Zapier", logo: "Zapier", category: "Automation" },
  { name: "Slack", logo: "Slack", category: "Comms" },
  { name: "Shopify", logo: "Shopify", category: "Commerce" },
  { name: "WooCommerce", logo: "WooCommerce", category: "Commerce" },
  { name: "Notion", logo: "Notion", category: "Docs" },
  { name: "Stripe", logo: "Stripe", category: "Payments" },
  { name: "Salesforce", logo: "Salesforce", category: "CRM" },
  { name: "Twilio", logo: "Twilio", category: "SMS" },
  { name: "Mailchimp", logo: "Mailchimp", category: "Email" },
];

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Head of Growth",
    company: "Nova Commerce",
    quote: "We replaced three tools with this platform. Bulk campaigns land on time, AI replies handle 70% of FAQs, and our response rate tripled in two weeks.",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Sofia Rao",
    role: "Founder",
    company: "Bloom Beauty",
    quote: "Punit's team shipped our entire WhatsApp funnel in a weekend. The workflow builder is genuinely the best I've used — felt like Notion for automations.",
    rating: 5,
    initials: "SR",
  },
  {
    name: "Daniel Fernandes",
    role: "VP Marketing",
    company: "Pulse Fintech",
    quote: "Delivery rate went from 82% to 97% after switching. The analytics tab is now the first thing I open every morning.",
    rating: 5,
    initials: "DF",
  },
  {
    name: "Ishita Kapoor",
    role: "Operations Lead",
    company: "MediExpress",
    quote: "We handle 4,000 patient queries a day with AI replies + team inbox. The CRM sync means no more copy-pasting into HubSpot.",
    rating: 5,
    initials: "IK",
  },
  {
    name: "Rahul Verma",
    role: "CEO",
    company: "FitFuel",
    quote: "Booked 280 demos in our first month from a single broadcast. The border-beam contact form actually made people message us.",
    rating: 5,
    initials: "RV",
  },
  {
    name: "Maya Iyer",
    role: "CX Director",
    company: "Stellar Travel",
    quote: "Multi-device support means our entire team replies from one number without collisions. It just works, on low-end phones too.",
    rating: 5,
    initials: "MI",
  },
];

export type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "₹2,499",
    period: "/mo",
    description: "Perfect for solopreneurs and small teams getting started with WhatsApp automation.",
    features: [
      "1 WhatsApp device",
      "Up to 5,000 messages / mo",
      "2 workflows",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free",
  },
  {
    name: "Professional",
    price: "₹7,999",
    period: "/mo",
    description: "For growing teams that need AI replies, CRM sync and unlimited campaigns.",
    features: [
      "3 WhatsApp devices",
      "Up to 50,000 messages / mo",
      "Unlimited workflows",
      "AI auto replies (OpenAI)",
      "HubSpot & Google Sheets sync",
      "Priority support",
      "Webhooks & REST API",
    ],
    highlighted: true,
    cta: "Book Demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For high-volume businesses that need dedicated infra, SSO and compliance.",
    features: [
      "Unlimited devices",
      "Unlimited messages",
      "Custom AI fine-tuning",
      "SSO & RBAC",
      "Dedicated success manager",
      "99.9% uptime SLA",
      "On-prem option",
    ],
    cta: "Talk to Sales",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Is WhatsApp automation with OpenWA safe and compliant?",
    answer: "Yes. The platform runs on OpenWA, an established open-source library, and follows WhatsApp's anti-spam best practices including opt-in management, rate limiting and template compliance. We never store your messages outside your workspace and you can export or delete data at any time.",
  },
  {
    question: "Do I need a WhatsApp Business API account to get started?",
    answer: "No. You can connect a regular WhatsApp number via the QR code flow. For high-volume use cases we recommend migrating to the official WhatsApp Business API, and the platform supports both modes seamlessly.",
  },
  {
    question: "How fast can I launch my first campaign?",
    answer: "Most customers go live in under 10 minutes. Connect your number, scan the QR, pick a template and schedule a broadcast. The visual workflow builder means no engineering time is required.",
  },
  {
    question: "What does AI auto reply cost?",
    answer: "AI replies are powered by OpenAI and billed per token at cost. On the Professional plan you get $20 of AI usage included every month, which typically covers 30,000+ AI replies for an average support use case.",
  },
  {
    question: "Can my whole team use one WhatsApp number?",
    answer: "Yes. The shared Team Inbox lets multiple agents reply from a single number with assignment, mentions and internal notes. Collision detection prevents two agents from replying to the same conversation at the same time.",
  },
  {
    question: "How does Punit Mistry support onboarding?",
    answer: "Every Professional and Enterprise customer gets a 1:1 onboarding call with Punit Mistry directly. You can also book a free demo before signing up using the contact form on this page — it opens WhatsApp pre-filled with your details.",
  },
];

export const businessTypes = [
  "E-commerce / Retail",
  "SaaS / Technology",
  "Healthcare",
  "Education",
  "Real Estate",
  "Financial Services",
  "Travel & Hospitality",
  "Agency / Marketing",
  "Other",
];
