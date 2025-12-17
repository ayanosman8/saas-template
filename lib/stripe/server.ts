import Stripe from "stripe";

// Lazy initialization to avoid build errors when env vars aren't set
let stripeInstance: Stripe | null = null;

export function getStripeServer(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "Missing STRIPE_SECRET_KEY environment variable. Please add it to your .env.local file."
      );
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    });
  }
  return stripeInstance;
}

// For backwards compatibility
export const stripe = {
  get checkout() {
    return getStripeServer().checkout;
  },
  get billingPortal() {
    return getStripeServer().billingPortal;
  },
  get webhooks() {
    return getStripeServer().webhooks;
  },
};

// Price IDs from your Stripe Dashboard
export const PRICES = {
  starter: process.env.STRIPE_STARTER_PRICE_ID || "",
  pro: process.env.STRIPE_PRO_PRICE_ID || "",
};
