"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-serif font-normal text-white mb-4">
            {siteConfig.footer.ctaHeading}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {siteConfig.footer.ctaHeadingAccent}
            </span>
          </h3>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {siteConfig.footer.ctaText}
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition duration-200">
            {siteConfig.footer.ctaButton}
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-white/60 text-sm">
                {siteConfig.name} {siteConfig.nameAccent}
              </span>
            </div>
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} {siteConfig.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
