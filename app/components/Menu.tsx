"use client";

import React from "react";
import { motion } from "framer-motion";
import { Croissant, Cake, Coffee } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { menuItems, MenuItem } from "@/data/menu";

const iconMap = {
  croissant: Croissant,
  cake: Cake,
  coffee: Coffee,
};

const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => {
  const IconComponent = iconMap[item.icon];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl blur-lg opacity-15`} />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-pink-500/5 to-rose-500/5 backdrop-blur-xl rounded-xl border border-pink-300/20 overflow-hidden h-full">
        {/* Image or Icon section */}
        <div className="relative aspect-[3/2] bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className={`bg-gradient-to-br ${item.color} rounded-lg p-2.5 border border-pink-300/30`}>
              <div className="text-white">
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-rose-500/20" />
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-light text-pink-300/90 border border-pink-300/20 bg-pink-500/10 mb-2">
            {item.category}
          </span>
          <h3 className="text-base font-medium text-white mb-1">
            {item.name}
          </h3>
          <p className="text-xs text-white/60 font-light leading-relaxed">
            {item.description}
          </p>
          {item.price && (
            <p className="text-sm text-pink-300 font-light mt-2">
              {siteConfig.cart.currency}{item.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Menu() {
  return (
    <section id="menu" className="py-32 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>

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
            <span className="text-white">{siteConfig.menu.title} </span>
            <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
              {siteConfig.menu.titleAccent}
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            {siteConfig.menu.subtitle}
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {menuItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/60 font-light mb-6">
            {siteConfig.menu.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 rounded-full text-white font-light tracking-wide text-lg border-2 border-pink-400/60 hover:border-pink-300 transition duration-300 bg-transparent">
                {siteConfig.menu.primaryCta}
              </div>
            </button>

            <button className="relative group overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative backdrop-blur-sm px-8 py-4 rounded-full text-white/90 font-light tracking-wide text-lg border-2 border-pink-400/30 hover:border-pink-400/60 hover:text-white transition duration-300 bg-transparent">
                {siteConfig.menu.secondaryCta}
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
