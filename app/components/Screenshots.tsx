"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Lock, CreditCard, LayoutDashboard, Users, BarChart3, Settings, Bell, Search } from "lucide-react";

const screenshots = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Beautiful, responsive dashboard with analytics and user management",
    icon: Monitor,
  },
  {
    id: "auth",
    name: "Authentication",
    description: "Complete auth flow with social logins, magic links, and session management",
    icon: Lock,
  },
  {
    id: "payments",
    name: "Payments",
    description: "Stripe checkout, subscription management, and customer portal",
    icon: CreditCard,
  },
];

// Fake dashboard UI for placeholder
const DashboardPreview = () => (
  <div className="h-full bg-[#0a0a0f] p-4 flex">
    {/* Sidebar */}
    <div className="w-48 bg-white/5 rounded-xl p-3 mr-4 hidden sm:block">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500"></div>
        <span className="text-white/80 text-sm font-medium">ShipFast</span>
      </div>
      <div className="space-y-1">
        {[
          { icon: LayoutDashboard, label: "Dashboard", active: true },
          { icon: Users, label: "Users" },
          { icon: BarChart3, label: "Analytics" },
          { icon: CreditCard, label: "Billing" },
          { icon: Settings, label: "Settings" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              item.active ? "bg-blue-500/20 text-blue-400" : "text-white/40"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </div>
        ))}
      </div>
    </div>

    {/* Main content */}
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="h-3 w-24 bg-white/20 rounded mb-1"></div>
          <div className="h-2 w-32 bg-white/10 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Search className="w-4 h-4 text-white/30" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Bell className="w-4 h-4 text-white/30" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {["$12,450", "1,234", "89%"].map((stat, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3">
            <div className="text-lg font-medium text-white">{stat}</div>
            <div className="text-xs text-white/40">
              {["Revenue", "Users", "Growth"][i]}
            </div>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="bg-white/5 rounded-xl p-4 h-32">
        <div className="flex items-end justify-between h-full gap-2">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-blue-500/50 to-indigo-500/50 rounded-t"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AuthPreview = () => (
  <div className="h-full bg-[#0a0a0f] flex items-center justify-center p-4">
    <div className="w-full max-w-sm">
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 mx-auto mb-3"></div>
          <div className="h-3 w-24 bg-white/20 rounded mx-auto mb-2"></div>
          <div className="h-2 w-32 bg-white/10 rounded mx-auto"></div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="h-10 bg-white/5 rounded-lg border border-white/10"></div>
          <div className="h-10 bg-white/5 rounded-lg border border-white/10"></div>
        </div>

        <div className="h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mb-4"></div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-white/30">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["G", "🍎", "𝕏"].map((icon, i) => (
            <div key={i} className="h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PaymentsPreview = () => (
  <div className="h-full bg-[#0a0a0f] flex items-center justify-center p-4">
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        {/* Plan card */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
          <div className="text-xs text-white/40 mb-1">Pro Plan</div>
          <div className="text-2xl font-medium text-white mb-3">$99<span className="text-sm text-white/40">/mo</span></div>
          <div className="space-y-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                </div>
                <div className="h-2 bg-white/10 rounded flex-1"></div>
              </div>
            ))}
          </div>
          <div className="h-9 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"></div>
        </div>

        {/* Checkout form */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
          <div className="text-xs text-white/40 mb-3">Payment Details</div>
          <div className="space-y-2 mb-3">
            <div className="h-9 bg-white/5 rounded-lg border border-white/10"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-9 bg-white/5 rounded-lg border border-white/10"></div>
              <div className="h-9 bg-white/5 rounded-lg border border-white/10"></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/30 mb-3">
            <Lock className="w-3 h-3" />
            Secured by Stripe
          </div>
          <div className="h-9 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

const previews: Record<string, React.ComponentType> = {
  dashboard: DashboardPreview,
  auth: AuthPreview,
  payments: PaymentsPreview,
};

export default function Screenshots() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const activeScreenshot = screenshots.find((s) => s.id === activeTab);
  const PreviewComponent = previews[activeTab];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight mb-4">
            <span className="text-white">See it in </span>
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Production-ready screens you can customize and ship
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {screenshots.map((screenshot) => {
            const Icon = screenshot.icon;
            return (
              <button
                key={screenshot.id}
                onClick={() => setActiveTab(screenshot.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition duration-200 ${
                  activeTab === screenshot.id
                    ? "bg-white text-gray-900"
                    : "text-white/50 hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {screenshot.name}
              </button>
            );
          })}
        </div>

        {/* Screenshot Display */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>

          {/* Browser frame */}
          <div className="relative bg-[#111118] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Browser header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-black/30 rounded-lg px-4 py-1.5 text-xs text-white/40 max-w-xs mx-auto text-center flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" />
                  yourapp.com/{activeTab}
                </div>
              </div>
              <div className="w-16"></div>
            </div>

            {/* Screenshot content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="aspect-[16/9]"
              >
                <PreviewComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Description */}
        <motion.p
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white/50 mt-6"
        >
          {activeScreenshot?.description}
        </motion.p>
      </div>
    </section>
  );
}
