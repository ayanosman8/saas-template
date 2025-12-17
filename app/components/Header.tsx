"use client";

import React, { useState } from "react";
import { Menu, X, Sparkles, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./Cart";
import { siteConfig } from "@/lib/config";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

          {/* Main navbar */}
          <nav className="relative bg-black/40 backdrop-blur-2xl rounded-2xl border border-pink-300/20 px-6 py-4 shadow-2xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
                  <div className="absolute inset-0 bg-pink-400/20 blur-xl rounded-full"></div>
                </div>
                <span className="text-2xl font-serif font-medium tracking-tight">
                  <span className="bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 bg-clip-text text-transparent">
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
                    className="text-white/80 hover:text-pink-300 transition-colors duration-300 font-light text-sm tracking-wide"
                  >
                    {item.name}
                  </a>
                ))}

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative group/cart p-2.5 rounded-full border border-pink-300/20 hover:border-pink-300/40 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-white/80 group-hover/cart:text-pink-300 transition-colors" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                    <span className="text-xs text-white font-light">3</span>
                  </div>
                </button>

                {/* CTA Button */}
                <button className="relative group/btn overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-pink-500/80 via-rose-500/80 to-pink-500/80 backdrop-blur-sm px-6 py-2 rounded-full border border-pink-300/30 text-white text-sm font-light tracking-wide hover:border-pink-300/50 transition duration-300">
                    {siteConfig.cta.orderNow}
                  </div>
                </button>
              </div>

              {/* Mobile menu and cart buttons */}
              <div className="md:hidden flex items-center gap-3">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative group/cart p-2 rounded-full border border-pink-300/20 hover:border-pink-300/40 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-white/80 group-hover/cart:text-pink-300 transition-colors" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                    <span className="text-xs text-white font-light">3</span>
                  </div>
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white/80 hover:text-pink-300 transition-colors"
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
                        className="text-white/80 hover:text-pink-300 transition-colors duration-300 font-light text-sm tracking-wide"
                      >
                        {item.name}
                      </a>
                    ))}
                    <button className="relative group/btn overflow-hidden w-full mt-2">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full blur opacity-60 group-hover/btn:opacity-100 transition duration-300"></div>
                      <div className="relative bg-gradient-to-r from-pink-500/80 via-rose-500/80 to-pink-500/80 backdrop-blur-sm px-6 py-2 rounded-full border border-pink-300/30 text-white text-sm font-light tracking-wide">
                        {siteConfig.cta.orderNow}
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
