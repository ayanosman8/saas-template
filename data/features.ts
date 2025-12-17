/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FEATURES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Core features displayed on the landing page.
 * Edit the values below to customize for your SaaS.
 *
 * ICON OPTIONS: "zap" | "shield" | "code"
 */

export interface Feature {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: "zap" | "shield" | "code";
  color: string;
}

export const features: Feature[] = [
  {
    id: "authentication",
    name: "Authentication",
    category: "Core",
    description: "Secure user authentication with Supabase. Social logins, magic links, and session management built-in.",
    icon: "shield",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "payments",
    name: "Payments",
    category: "Core",
    description: "Stripe integration for subscriptions and one-time payments. Webhooks, customer portal, and invoicing ready.",
    icon: "zap",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "ui",
    name: "Beautiful UI",
    category: "Core",
    description: "Stunning landing page and dashboard components. Dark mode, responsive design, and smooth animations.",
    icon: "code",
    color: "from-blue-600 to-indigo-600",
  },
];
