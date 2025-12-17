"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { menuItems } from "@/data/menu";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample cart items from menu data (in a real app, this would come from state management)
const getInitialCartItems = (): CartItem[] => {
  const sampleItems = menuItems.filter(item => item.price).slice(0, 3);
  return sampleItems.map((item, index) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price!,
    quantity: index === 0 ? 2 : 1,
    image: item.image,
  }));
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCartItems);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * siteConfig.cart.taxRate;
  const total = subtotal + tax;
  const taxPercent = Math.round(siteConfig.cart.taxRate * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-l border-pink-300/20 shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-pink-300/20">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/10 to-rose-500/10 blur-xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6 text-pink-400" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-light">{cartItems.length}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-normal text-white">Your Order</h2>
                    <p className="text-xs text-white/60 font-light">{siteConfig.name} {siteConfig.nameAccent}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="relative group p-2 rounded-lg border border-pink-300/20 hover:border-pink-300/40 transition-colors"
                >
                  <X className="w-5 h-5 text-white/80 group-hover:text-pink-300 transition-colors" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="relative group"
                  >
                    {/* Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>

                    {/* Item Card */}
                    <div className="relative bg-gradient-to-br from-pink-500/5 to-rose-500/5 backdrop-blur-xl rounded-xl border border-pink-300/20 p-4">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <ShoppingBag className="w-8 h-8 text-pink-400/40" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-white font-light text-sm truncate">{item.name}</h3>
                              <p className="text-pink-300/60 text-xs font-light">{item.category}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-pink-500/10 rounded transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 text-white/40 hover:text-pink-400 transition-colors" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-lg border border-pink-300/20 flex items-center justify-center hover:bg-pink-500/10 transition-colors"
                              >
                                <Minus className="w-3 h-3 text-white/80" />
                              </button>
                              <span className="text-white font-light w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-lg border border-pink-300/20 flex items-center justify-center hover:bg-pink-500/10 transition-colors"
                              >
                                <Plus className="w-3 h-3 text-white/80" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-white font-light">{siteConfig.cart.currency}{(item.price * item.quantity).toFixed(2)}</div>
                              <div className="text-xs text-white/40">{siteConfig.cart.currency}{item.price.toFixed(2)} each</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cartItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <ShoppingBag className="w-16 h-16 text-pink-400/20 mb-4" />
                  <p className="text-white/60 font-light">Your cart is empty</p>
                  <p className="text-white/40 text-sm mt-2">Add some delicious pastries!</p>
                </motion.div>
              )}
            </div>

            {/* Footer - Totals & Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-pink-300/20 p-6 space-y-4">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-light">Subtotal</span>
                    <span className="text-white font-light">{siteConfig.cart.currency}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 font-light">Tax ({taxPercent}%)</span>
                    <span className="text-white font-light">{siteConfig.cart.currency}{tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-pink-300/20 to-transparent"></div>
                  <div className="flex justify-between">
                    <span className="text-white font-light">Total</span>
                    <span className="text-2xl font-serif font-medium bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                      {siteConfig.cart.currency}{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="relative group overflow-hidden w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative px-8 py-4 rounded-full text-white font-light tracking-wide text-lg border-2 border-pink-400/60 hover:border-pink-300 transition duration-300 bg-transparent flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>{siteConfig.cta.checkout}</span>
                  </div>
                </button>

                {/* Additional Info */}
                <p className="text-center text-xs text-white/40 font-light">
                  Pickup available in {siteConfig.cart.pickupTime}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
