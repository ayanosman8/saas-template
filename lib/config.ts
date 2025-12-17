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
  name: "La Rose",
  nameAccent: "Pâtisserie", // Second part of name (different color)
  tagline: "Artisan Pastries. French Elegance. Sweet Perfection.",
  description: "Artisan French bakery crafting authentic pastries and breads with love, tradition, and the finest ingredients.",
  foundedYear: 2018,

  // ─────────────────────────────────────────────────────────────────────────
  // HERO SECTION
  // ─────────────────────────────────────────────────────────────────────────
  hero: {
    // Words to highlight with gradient color (must match words in tagline exactly)
    highlightedWords: ["Artisan", "Pastries.", "French", "Elegance.", "Perfection."],
    subtitle: "Handcrafted French pastries and artisan breads baked fresh daily with love, tradition, and the finest ingredients",
    primaryCta: "View Menu",
    secondaryCta: "Order Online",
    // Trust indicators shown below the hero
    trustIndicators: [
      { value: "Daily", label: "Fresh Baked" },
      { value: "Est. 2018", label: "Traditional" },
      { value: "5★", label: "Rated" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ABOUT SECTION
  // ─────────────────────────────────────────────────────────────────────────
  about: {
    title: "Our Story",
    subtitle: "Where French tradition meets local love, and passion becomes perfection",
    heading: "Baking traditions that",
    headingAccent: "taste like home",
    paragraphs: [
      "Founded in 2018, La Rose Pâtisserie was born from a passion for authentic French baking and a desire to bring traditional artisan pastries to our community. Our head baker, trained in the heart of Paris, brings generations of expertise to every croissant, macaron, and baguette.",
      "We rise before dawn each day to ensure everything is baked fresh, using only the finest ingredients—European butter, local organic eggs, and flour milled from heritage grains. Every bite tells a story of dedication, tradition, and the pure joy of handcrafted baking.",
    ],
    // Image for the about section (set to null to show placeholder)
    image: "/images/about/bakery-interior.jpg",
    imageAlt: "Inside our bakery",
    values: [
      { label: "Made with Love", icon: "heart" },
      { label: "Fresh Daily", icon: "sparkles" },
      { label: "Artisan Quality", icon: "zap" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MENU SECTION
  // ─────────────────────────────────────────────────────────────────────────
  menu: {
    title: "Our",
    titleAccent: "Creations",
    subtitle: "Fresh artisan pastries and custom creations baked with love every day",
    ctaText: "Can't decide? Try our tasting box with a selection of favorites",
    primaryCta: "Order Online",
    secondaryCta: "Custom Orders",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER SECTION
  // ─────────────────────────────────────────────────────────────────────────
  footer: {
    ctaHeading: "Visit us for something",
    ctaHeadingAccent: "delicious",
    ctaText: "Stop by our café for fresh pastries and artisan coffee, or place a custom order for your next celebration.",
    ctaButton: "Place an Order",
    copyright: "All rights reserved.",
    madeWithLove: true, // Show "Crafted with ♥ and creativity"
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────
  navigation: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Contact", href: "#contact" },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER LINKS
  // ─────────────────────────────────────────────────────────────────────────
  footerLinks: {
    Bakery: ["About Us", "Our Menu", "Contact", "Catering"],
    Products: ["Viennoiserie", "Custom Cakes", "Desserts", "Breads"],
    Info: ["Hours", "Location", "Gift Cards", "FAQ"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOCIAL MEDIA
  // ─────────────────────────────────────────────────────────────────────────
  social: {
    instagram: "#",
    twitter: "#",
    dribbble: "#", // Or replace with Facebook, TikTok, etc.
    email: "hello@example.com",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CART & CHECKOUT
  // ─────────────────────────────────────────────────────────────────────────
  cart: {
    taxRate: 0.08, // 8% tax
    currency: "$",
    pickupTime: "30-45 minutes",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CTA BUTTONS (used throughout the site)
  // ─────────────────────────────────────────────────────────────────────────
  cta: {
    orderNow: "Order Now",
    viewMenu: "View Menu",
    orderOnline: "Order Online",
    customOrders: "Custom Orders",
    checkout: "Proceed to Checkout",
  },
};

// Type export for TypeScript users
export type SiteConfig = typeof siteConfig;
