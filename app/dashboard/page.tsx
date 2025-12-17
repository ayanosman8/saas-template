"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Plus,
  Zap,
} from "lucide-react";

const stats = [
  { name: "Total Revenue", value: "$12,450", change: "+12.5%", trend: "up", icon: CreditCard },
  { name: "Active Users", value: "1,234", change: "+8.2%", trend: "up", icon: Users },
  { name: "Conversion Rate", value: "3.2%", change: "-0.4%", trend: "down", icon: TrendingUp },
  { name: "Active Sessions", value: "456", change: "+24.5%", trend: "up", icon: Activity },
];

const recentActivity = [
  { id: 1, user: "John Doe", action: "Upgraded to Pro", time: "2m ago", amount: "+$99" },
  { id: 2, user: "Sarah Smith", action: "New signup", time: "15m ago", amount: null },
  { id: 3, user: "Mike Johnson", action: "Payment received", time: "1h ago", amount: "+$49" },
  { id: 4, user: "Emma Wilson", action: "New signup", time: "2h ago", amount: null },
  { id: 5, user: "Alex Brown", action: "Upgraded to Pro", time: "3h ago", amount: "+$99" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1
            className="text-2xl font-medium text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome back{user?.email ? <>, <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">{user.email.split("@")[0]}</span></> : ""}
          </motion.h1>
          <p className="text-white/40 mt-1 text-sm">
            Here&apos;s what&apos;s happening today
          </p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          New Project
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-gradient-to-br from-white/[0.03] to-blue-500/[0.04] hover:from-white/[0.04] hover:to-blue-500/[0.06] border border-blue-400/10 hover:border-blue-400/20 rounded-2xl p-5 transition-all duration-300"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-400/10">
                  <stat.icon className="w-4 h-4 text-blue-400/80" strokeWidth={1.5} />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.trend === "up"
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-red-400 bg-red-500/10"
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-white tracking-tight">{stat.value}</p>
              <p className="text-white/40 text-sm mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-gradient-to-br from-white/[0.02] to-blue-500/[0.02] border border-blue-400/10 rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-blue-400/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
              <h2 className="text-sm font-medium text-white">Recent Activity</h2>
            </div>
            <button className="text-xs text-blue-400/70 hover:text-blue-400 transition flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-blue-400/[0.06]">
            {recentActivity.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-blue-500/[0.04] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center text-white/80 text-xs font-medium">
                    {item.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm text-white">{item.user}</p>
                    <p className="text-xs text-white/40">{item.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  {item.amount && <p className="text-sm text-emerald-400 font-medium">{item.amount}</p>}
                  <p className="text-xs text-white/30">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-br from-white/[0.02] to-blue-500/[0.03] border border-blue-400/10 rounded-2xl p-5"
          >
            <h2 className="text-sm font-medium text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {["Create Project", "Invite Member", "View Analytics", "Export Data"].map((action, i) => (
                <button
                  key={action}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm text-left transition ${
                    i === 0
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-400 hover:to-indigo-400 shadow-lg shadow-blue-500/20"
                      : "text-white/70 hover:text-white hover:bg-blue-500/[0.08] border border-transparent hover:border-blue-400/10"
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">Pro Tip</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Connect Stripe to start accepting payments in minutes.
              </p>
              <button className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
                Learn more <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
