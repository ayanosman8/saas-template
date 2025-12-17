"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Code } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { features, Feature } from "@/data/features";

const iconMap = {
  zap: Zap,
  shield: Shield,
  code: Code,
};

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const IconComponent = iconMap[feature.icon];

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500`} />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-blue-500/5 to-indigo-500/5 backdrop-blur-xl rounded-2xl border border-blue-300/20 p-8 h-full">
        {/* Icon */}
        <div className={`bg-gradient-to-br ${feature.color} rounded-xl p-4 w-fit mb-6 border border-blue-300/30`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-medium text-white mb-3">
          {feature.name}
        </h3>
        <p className="text-white/60 font-light leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Features() {
  return (
    <section id="features" className="py-32 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight mb-6">
            <span className="text-white">{siteConfig.features.title} </span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              {siteConfig.features.titleAccent}
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            {siteConfig.features.subtitle}
          </p>
        </motion.div>

        {/* Features Grid - 3 columns */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
