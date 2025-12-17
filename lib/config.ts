/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SITE CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This is your one-stop shop for customizing this template.
 * Edit the values below to make it your own!
 *
 * No need to dig through component files - everything customizable is here.
 */

export const siteConfig = {
  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS INFO
  // ─────────────────────────────────────────────────────────────────────────
  name: "Ship",
  nameAccent: "Fast", // Second part of name (different color)
  tagline: "Build faster. Launch sooner. Scale effortlessly.",
  description: "The modern starter kit for developers who want to ship products fast. Authentication, payments, and beautiful UI out of the box.",
  foundedYear: 2024,

  // ─────────────────────────────────────────────────────────────────────────
  // HERO SECTION
  // ─────────────────────────────────────────────────────────────────────────
  hero: {
    // Words to highlight with gradient color (must match words in tagline exactly)
    highlightedWords: ["Build", "faster.", "Launch", "sooner.", "Scale", "effortlessly."],
    subtitle: "Stop rebuilding the same features. Start with auth, payments, and a stunning UI. Focus on what makes your product unique.",
    primaryCta: "Get Started",
    secondaryCta: "View Demo",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ABOUT SECTION
  // ─────────────────────────────────────────────────────────────────────────
  about: {
    title: "Why ShipFast?",
    subtitle: "Everything you need to go from idea to launch in record time",
    heading: "Built for developers who",
    headingAccent: "ship fast",
    paragraphs: [
      "We've built dozens of products and learned what slows teams down. Authentication, payments, email, database setup - it's always the same boilerplate eating up your first weeks.",
      "ShipFast gives you all of that out of the box. Production-ready code, best practices baked in, and a beautiful UI that works on every device. Just add your idea.",
    ],
    // Image for the about section (set to null to show placeholder)
    image: "/images/about/dashboard.jpg",
    imageAlt: "ShipFast dashboard preview",
    values: [
      { label: "Production Ready", icon: "zap" },
      { label: "Fully Typed", icon: "sparkles" },
      { label: "Best Practices", icon: "heart" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FEATURES SECTION
  // ─────────────────────────────────────────────────────────────────────────
  features: {
    title: "Everything",
    titleAccent: "Included",
    subtitle: "All the features you need to launch your next product",
    ctaText: "Ready to ship? Get lifetime access to all features and updates.",
    primaryCta: "Get Access",
    secondaryCta: "View Docs",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER SECTION
  // ─────────────────────────────────────────────────────────────────────────
  footer: {
    ctaHeading: "Ready to ship your",
    ctaHeadingAccent: "next big idea?",
    ctaText: "Join thousands of developers building faster with ShipFast. One-time purchase, lifetime updates.",
    ctaButton: "Get Started Now",
    copyright: "All rights reserved.",
    madeWithLove: true, // Show "Crafted with ♥ and creativity"
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────
  navigation: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER LINKS
  // ─────────────────────────────────────────────────────────────────────────
  footerLinks: {
    Product: ["Features", "Pricing", "Documentation"],
    Legal: ["Privacy", "Terms"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOCIAL MEDIA
  // ─────────────────────────────────────────────────────────────────────────
  social: {
    twitter: "#",
    email: "hello@shipfast.dev",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CTA BUTTONS (used throughout the site)
  // ─────────────────────────────────────────────────────────────────────────
  cta: {
    orderNow: "Get Access",
    viewFeatures: "View Features",
    getStarted: "Get Started",
    contactSales: "Contact Sales",
  },
};

// Type export for TypeScript users
export type SiteConfig = typeof siteConfig;
