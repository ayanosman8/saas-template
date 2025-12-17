"use client";

import React, { useState } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";

// Check if Stripe is configured (client-side check)
const stripeConfigured = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const plans = [
  {
    name: "Starter",
    price: "$49",
    priceId: "starter", // Maps to PRICES.starter in server
    description: "Perfect for side projects and MVPs",
    features: [
      "Next.js 14 + TypeScript",
      "Supabase Authentication",
      "Basic UI Components",
      "Landing Page Template",
      "Email Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    priceId: "pro", // Maps to PRICES.pro in server
    description: "Everything you need to ship fast",
    features: [
      "Everything in Starter",
      "Stripe Payments Integration",
      "User Dashboard",
      "Admin Panel",
      "Priority Support",
      "Lifetime Updates",
    ],
    cta: "Get Pro",
    popular: true,
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (!stripeConfigured) {
      alert("Demo Mode: Stripe is not configured. Add your Stripe keys to .env.local to enable payments.");
      return;
    }

    setLoading(priceId);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          mode: "payment", // Use "subscription" for recurring
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error("Checkout error:", error);
        alert("Failed to start checkout. Please try again.");
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-4">
            <span className="text-white">Simple </span>
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-lg text-white/50">
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </div>

        {/* Configuration notice */}
        {!stripeConfigured && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 max-w-lg mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-200 text-sm font-medium">Demo Mode</p>
                <p className="text-amber-200/70 text-xs mt-1">
                  Stripe is not configured. Add your API keys to .env.local to enable payments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group rounded-2xl border p-8 transition duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-blue-500/10 to-indigo-500/5 border-blue-400/30 hover:border-blue-400/50"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-medium text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">USD</span>
                </div>
                <p className="text-white/40 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-white/60 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-full font-medium transition duration-200 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 disabled:opacity-70"
                    : "bg-white/10 text-white hover:bg-white/15 disabled:opacity-70"
                }`}
              >
                {loading === plan.priceId ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  plan.cta
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <p className="text-center text-white/30 text-sm mt-10">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
}
