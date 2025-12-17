"use client";

import React from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js 15", color: "from-white/20 to-white/5" },
  { name: "React 19", color: "from-cyan-500/20 to-blue-500/10" },
  { name: "TypeScript", color: "from-blue-500/20 to-blue-600/10" },
  { name: "Supabase", color: "from-emerald-500/20 to-green-500/10" },
  { name: "Stripe", color: "from-purple-500/20 to-indigo-500/10" },
  { name: "Tailwind CSS", color: "from-cyan-400/20 to-teal-500/10" },
  { name: "Framer Motion", color: "from-pink-500/20 to-purple-500/10" },
];

export default function TechStack() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-32 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm font-medium tracking-widest uppercase mb-8"
        >
          Built with
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${tech.color} rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300`} />

              <div className={`relative px-5 py-2.5 rounded-full bg-gradient-to-r ${tech.color} border border-white/[0.08] group-hover:border-white/20 transition-all duration-300`}>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
