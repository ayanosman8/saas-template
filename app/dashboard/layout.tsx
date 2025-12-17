"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { User as SupabaseUser } from "@supabase/supabase-js";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  // Get user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#0d0d16] to-[#0a0a10]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-[#0c0c14] via-[#0a0a12] to-[#08080e] backdrop-blur-xl border-r border-blue-400/[0.08] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Decorative gradient orb */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-blue-500/[0.08] to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col h-full relative">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-blue-400/[0.08]">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-xl font-serif font-medium tracking-tight">
                <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 bg-clip-text text-transparent">
                  {siteConfig.name}
                </span>
                <span className="text-white/90"> {siteConfig.nameAccent}</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/15 text-white border border-blue-400/20 shadow-lg shadow-blue-500/5"
                      : "text-white/50 hover:text-white hover:bg-blue-500/[0.08] border border-transparent hover:border-blue-400/10"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-xl" />
                  )}
                  <item.icon className={`w-5 h-5 flex-shrink-0 relative ${isActive ? "text-blue-400" : "group-hover:text-blue-400/70"}`} />
                  <span className="relative">{item.name}</span>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full shadow-lg shadow-blue-500/50" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-3 border-t border-blue-400/[0.08]">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-white/[0.03] to-blue-500/[0.05] border border-blue-400/10">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <span className="text-white text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-white/40 text-xs truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-3 py-2.5 mt-2 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64 relative">
        {/* Animated ambient glow effects */}
        <motion.div
          className="fixed top-20 right-20 w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-3xl pointer-events-none"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed bottom-20 left-1/3 w-[600px] h-[400px] bg-indigo-500/[0.05] rounded-full blur-3xl pointer-events-none"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-3xl pointer-events-none"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-blue-400/[0.06]">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white/60 hover:text-white p-2 hover:bg-blue-500/[0.08] rounded-xl transition"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/[0.04] rounded-xl border border-white/[0.06] focus-within:border-blue-500/30 focus-within:bg-blue-500/[0.05] w-64 transition-all duration-200">
                <Search className="w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white text-sm placeholder:text-white/40 focus:outline-none w-full"
                />
                <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.08] rounded text-white/40 text-xs">
                  ⌘K
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="relative p-2 text-white/60 hover:text-white hover:bg-blue-500/[0.08] rounded-xl transition group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
              </button>

              {/* User avatar - mobile */}
              <Link
                href="/dashboard/settings"
                className="lg:hidden w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20"
              >
                <span className="text-white text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
