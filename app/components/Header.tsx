"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isSupabaseConfigured()) return;
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphic navbar container */}
        <div className="relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

          {/* Main navbar */}
          <nav className="relative bg-black/40 backdrop-blur-2xl rounded-2xl border border-blue-300/20 px-6 py-4 shadow-2xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-xl font-serif font-medium tracking-tight">
                  <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 bg-clip-text text-transparent">
                    {siteConfig.name}
                  </span>
                  <span className="text-white/90"> {siteConfig.nameAccent}</span>
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {siteConfig.navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-white/80 hover:text-blue-300 transition-colors duration-300 font-light text-sm tracking-wide"
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  href="/dashboard"
                  className="text-white/80 hover:text-blue-300 transition-colors duration-300 font-light text-sm tracking-wide"
                >
                  View Dashboard
                </Link>

                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="bg-blue-500/80 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition duration-200"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="text-white/80 hover:text-blue-300 transition-colors duration-300 font-light text-sm tracking-wide"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-blue-500/80 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition duration-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white/80 hover:text-blue-300 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="flex flex-col gap-4 pt-6 pb-2">
                    {siteConfig.navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleScroll(e, item.href)}
                        className="text-white/80 hover:text-blue-300 transition-colors duration-300 font-light text-sm tracking-wide"
                      >
                        {item.name}
                      </a>
                    ))}
                    <Link
                      href="/dashboard"
                      className="text-white/80 hover:text-blue-300 transition-colors duration-300 font-light text-sm tracking-wide"
                    >
                      View Dashboard
                    </Link>
                    {isLoggedIn ? (
                      <Link
                        href="/dashboard"
                        className="bg-blue-500/80 text-white w-full py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition duration-200 mt-2 text-center"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/signin"
                          className="text-white/80 hover:text-blue-300 transition-colors duration-300 font-light text-sm tracking-wide"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          className="bg-blue-500/80 text-white w-full py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition duration-200 mt-2 text-center"
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>

    </header>
  );
}
