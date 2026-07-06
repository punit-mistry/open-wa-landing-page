import { siteConfig, faqs, features, plans } from "@/lib/site/content";

function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: `${siteConfig.name} by ${siteConfig.founder}`,
    url: siteConfig.url,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: "Founder & CEO",
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    founderName: siteConfig.founder,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    logo: `${siteConfig.url}/logo.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        availableLanguage: ["English", "Hindi"],
        areaServed: ["IN", "Global"],
      },
    ],
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
  };
}

function LocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}/og`,
    priceRange: "₹₹",
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    founderName: siteConfig.founder,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "MH",
      addressLocality: "Mumbai",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "412",
    },
  };
}

function ProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    description: siteConfig.description,
    url: siteConfig.url,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} Plan`,
      price: plan.price.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "INR",
      description: plan.description,
    })),
    featureList: features.map((f) => f.title),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "412",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

function FaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function BreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "WhatsApp Automation Platform",
        item: `${siteConfig.url}/#features`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pricing",
        item: `${siteConfig.url}/#pricing`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${siteConfig.url}/#contact`,
      },
    ],
  };
}

function WebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function SiteJsonLd() {
  const schemas = [
    OrganizationSchema(),
    LocalBusinessSchema(),
    ProductSchema(),
    FaqSchema(),
    BreadcrumbSchema(),
    WebSiteSchema(),
  ];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
