"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

const iconMap = {
  heart: Heart,
  sparkles: Sparkles,
  zap: Zap,
};

export default function About() {
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-normal tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              {siteConfig.about.title}
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            {siteConfig.about.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl border border-blue-300/20 overflow-hidden aspect-[4/3]">
              {siteConfig.about.image ? (
                <Image
                  src={siteConfig.about.image}
                  alt={siteConfig.about.imageAlt || "About us"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Sparkles className="w-16 h-16 text-blue-400/40 mx-auto" />
                    <p className="text-white/40 font-light">Add your image</p>
                  </div>
                </div>
              )}
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-indigo-500/20 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-normal text-white">
              {siteConfig.about.heading}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {siteConfig.about.headingAccent}
              </span>
            </h3>
            {siteConfig.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-white/70 font-light leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Mission Statement Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {siteConfig.about.values.map((value, index) => {
                const IconComponent = iconMap[value.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-500 to-indigo-500' : 'from-indigo-500 to-blue-500'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                    <div className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-500/10 to-indigo-500/10' : 'from-indigo-500/10 to-blue-500/10'} backdrop-blur-xl rounded-2xl border border-blue-300/20 p-6 text-center`}>
                      <IconComponent className={`w-8 h-8 ${index % 2 === 0 ? 'text-blue-400' : 'text-indigo-400'} mx-auto mb-3`} />
                      <h4 className="text-sm font-light text-white/90 uppercase tracking-wider">{value.label}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
