"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";
import { siteConfig } from "@/lib/config";

// Pre-defined particle positions to avoid Math.random() during render
const PARTICLE_POSITIONS = [
  { left: 15, top: 20, duration: 4.5, delay: 0.5 },
  { left: 85, top: 35, duration: 5.2, delay: 1.2 },
  { left: 25, top: 70, duration: 4.8, delay: 0.8 },
  { left: 75, top: 15, duration: 5.5, delay: 1.8 },
  { left: 45, top: 85, duration: 4.2, delay: 0.3 },
  { left: 90, top: 60, duration: 5.0, delay: 1.5 },
];

export default function Hero() {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring for scroll - prevents jittery movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Pre-define transforms at top level (not in JSX)
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, -50]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [0, 50]);
  const orb3Y = useTransform(smoothProgress, [0, 1], [0, -30]);
  const orb3Opacity = useTransform(smoothProgress, [0, 0.5], [0.3, 0]);

  // Split the tagline into words
  const words = siteConfig.tagline.split(" ");

  // Define gradient for the highlighted text on a dark background
  const colorfulGradientClasses =
    "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400";

  return (
    <section
      ref={containerRef}
      id="home"
      className="pt-32 pb-20 w-full min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background Effects - pink/rose gradient theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5"></div>

      {/* Animated gradient orbs - GPU accelerated */}
      <motion.div
        style={{ y: orb1Y, willChange: "transform" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: orb2Y, willChange: "transform" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl"
      />

      {/* Additional decorative orb */}
      <motion.div
        style={{ y: orb3Y, opacity: orb3Opacity, willChange: "transform, opacity" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLE_POSITIONS.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 && <Sparkles className="w-4 h-4 text-blue-400/40" />}
              {i % 3 === 1 && <Heart className="w-3 h-3 text-indigo-400/40" />}
              {i % 3 === 2 && <Star className="w-4 h-4 text-blue-400/40" />}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 px-4">
        {/* Main heading */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight text-center tracking-tight">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block ${
                  siteConfig.hero.highlightedWords.includes(word)
                    ? colorfulGradientClasses
                    : "text-white"
                }`}
              >
                {word}
                {index !== words.length - 1 && "\u00A0"}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {siteConfig.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="relative group overflow-hidden rounded-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative px-8 py-4 rounded-full text-white font-light tracking-wide text-lg border-2 border-blue-400/60 hover:border-blue-300 transition duration-300 bg-transparent">
              {siteConfig.hero.primaryCta}
            </div>
          </button>

          <button className="relative group overflow-hidden rounded-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative backdrop-blur-sm px-8 py-4 rounded-full text-white/90 font-light tracking-wide text-lg border-2 border-blue-400/30 hover:border-blue-400/60 hover:text-white transition duration-300 bg-transparent">
              {siteConfig.hero.secondaryCta}
            </div>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-blue-300/30 rounded-full flex justify-center p-1 backdrop-blur-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-1.5 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
