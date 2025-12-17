"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Instagram, Twitter, Dribbble, Mail, Heart } from "lucide-react";
import { siteConfig } from "@/lib/config";

const socialIconMap = {
  instagram: Instagram,
  twitter: Twitter,
  dribbble: Dribbble,
  email: Mail,
};

export default function Footer() {
  const socialLinks = Object.entries(siteConfig.social).map(([key, href]) => ({
    icon: socialIconMap[key as keyof typeof socialIconMap],
    label: key.charAt(0).toUpperCase() + key.slice(1),
    href,
  }));

  return (
    <footer id="contact" className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
                <div className="absolute inset-0 bg-pink-400/20 blur-xl rounded-full"></div>
              </div>
              <span className="text-2xl font-serif font-medium tracking-tight">
                <span className="bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 bg-clip-text text-transparent">
                  {siteConfig.name}
                </span>
                <span className="text-white/90"> {siteConfig.nameAccent}</span>
              </span>
            </div>
            <p className="text-white/60 font-light leading-relaxed mb-6 max-w-sm">
              {siteConfig.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="relative group"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl rounded-lg border border-pink-300/20 p-3 hover:border-pink-300/40 transition duration-300">
                    <div className="text-pink-400/80 group-hover:text-pink-300 transition-colors">
                      <social.icon className="w-5 h-5" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(siteConfig.footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-light text-sm uppercase tracking-widest mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-pink-300 font-light transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="relative group mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-pink-300/20 p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-serif font-normal text-white mb-4">
              {siteConfig.footer.ctaHeading}{" "}
              <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                {siteConfig.footer.ctaHeadingAccent}
              </span>
            </h3>
            <p className="text-white/70 font-light mb-8 max-w-2xl mx-auto">
              {siteConfig.footer.ctaText}
            </p>
            <button className="relative group/btn overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full blur-lg opacity-60 group-hover/btn:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 rounded-full text-white font-light tracking-wide text-lg border-2 border-pink-400/60 hover:border-pink-300 transition duration-300 bg-transparent">
                {siteConfig.footer.ctaButton}
              </div>
            </button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm font-light">
              © {new Date().getFullYear()} {siteConfig.name} {siteConfig.nameAccent}. {siteConfig.footer.copyright}
            </p>
            {siteConfig.footer.madeWithLove && (
              <div className="flex items-center gap-2 text-white/40 text-sm font-light">
                <span>Crafted with</span>
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <span>and creativity</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
