"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Raspberry Rose Macarons",
      category: "Signature Pastry",
      description: "Delicate French macarons filled with raspberry rose buttercream, garnished with edible rose petals and gold leaf.",
      tags: ["Bestseller", "Wedding Favorite"],
    },
    {
      title: "Chocolate Hazelnut Tart",
      category: "Artisan Dessert",
      description: "Rich dark chocolate ganache tart with caramelized hazelnuts on a buttery shortbread crust.",
      tags: ["Chocolate", "Seasonal"],
    },
    {
      title: "Croissant Collection",
      category: "Morning Pastries",
      description: "Our signature butter croissants, pain au chocolat, and almond croissants baked fresh every morning.",
      tags: ["Daily Fresh", "Traditional"],
    },
    {
      title: "Custom Wedding Cake",
      category: "Special Occasion",
      description: "Three-tier vanilla rose cake with handcrafted sugar flowers and Swiss meringue buttercream.",
      tags: ["Custom", "Celebration"],
    },
  ];

  return (
    <section id="portfolio" className="py-32 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5"></div>
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mb-6">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
              Creations
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            A showcase of our most beloved pastries and custom creations
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-2xl blur-xl opacity-20"></div>

              {/* Card */}
              <div className="relative bg-gradient-to-br from-pink-500/5 to-rose-500/5 backdrop-blur-xl rounded-2xl border border-pink-300/20 overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative aspect-[2/1] bg-gradient-to-br from-pink-500/20 to-rose-500/20 overflow-hidden">
                  {/* Placeholder Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-pink-400/30" />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/40 via-transparent to-rose-500/40"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-pink-500/80 to-rose-500/80 backdrop-blur-md rounded-full px-3 py-1 border border-pink-300/30">
                      <span className="text-xs font-light text-white tracking-wide">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-extralight text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-xs font-light text-pink-300/80 border border-pink-300/20 bg-pink-500/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <button className="group flex items-center gap-3 mx-auto text-pink-400 hover:text-pink-300 transition-colors">
            <span className="font-light text-lg">View Full Gallery</span>
            <div className="relative">
              <div className="absolute -inset-1 bg-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-sm rounded-full p-2 border border-pink-300/30 group-hover:border-pink-300/50 transition duration-300">
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
