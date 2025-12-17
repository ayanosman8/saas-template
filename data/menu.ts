/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MENU ITEMS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Add, remove, or edit menu items here.
 * Changes will automatically reflect on the Menu page.
 *
 * ICON OPTIONS: "croissant" | "cake" | "coffee"
 * (These map to Lucide icons - used as fallback when no image is provided)
 *
 * IMAGE: Add your product images to /public/images/products/
 * Then reference them like: "/images/products/your-image.jpg"
 *
 * COLOR OPTIONS (gradient classes for icon fallback):
 * - "from-pink-500 to-rose-500"
 * - "from-rose-500 to-pink-500"
 * - "from-pink-600 to-rose-600"
 * - "from-rose-600 to-pink-600"
 */

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  icon: "croissant" | "cake" | "coffee";
  color: string;
  image?: string; // Path to product image (e.g., "/images/products/croissant.jpg")
  featured?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "classic-croissant",
    name: "Classic Croissant",
    category: "Viennoiserie",
    description: "Buttery, flaky perfection",
    price: 4.50,
    icon: "croissant",
    color: "from-pink-500 to-rose-500",
    image: "/images/products/croissant.jpg",
  },
  {
    id: "raspberry-rose-macarons",
    name: "Raspberry Rose Macarons",
    category: "Signature",
    description: "Delicate with rose buttercream",
    price: 18.00,
    icon: "cake",
    color: "from-rose-500 to-pink-500",
    image: "/images/products/macarons.jpg",
    featured: true,
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    category: "Viennoiserie",
    description: "Dark chocolate in flaky dough",
    price: 5.00,
    icon: "croissant",
    color: "from-pink-600 to-rose-600",
    image: "/images/products/pain-au-chocolat.jpg",
  },
  {
    id: "chocolate-hazelnut-tart",
    name: "Chocolate Hazelnut Tart",
    category: "Artisan Dessert",
    description: "Rich ganache & hazelnuts",
    price: 28.00,
    icon: "cake",
    color: "from-rose-500 to-pink-500",
    image: "/images/products/tart.jpg",
    featured: true,
  },
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    category: "Viennoiserie",
    description: "Filled with almond cream",
    price: 5.50,
    icon: "coffee",
    color: "from-pink-500 to-rose-500",
    image: "/images/products/brioche.jpg",
  },
  {
    id: "lemon-tart",
    name: "Lemon Tart",
    category: "Classic Dessert",
    description: "Tangy citrus perfection",
    price: 24.00,
    icon: "cake",
    color: "from-pink-600 to-rose-600",
    image: "/images/products/lemon-tart.jpg",
  },
  {
    id: "vanilla-eclair",
    name: "Vanilla Éclair",
    category: "Classic",
    description: "Choux pastry with vanilla cream",
    price: 6.50,
    icon: "cake",
    color: "from-rose-500 to-pink-500",
    image: "/images/products/eclair.jpg",
  },
  {
    id: "custom-wedding-cakes",
    name: "Custom Wedding Cakes",
    category: "Special Orders",
    description: "Handcrafted for your day",
    icon: "cake",
    color: "from-pink-500 to-rose-500",
    image: "/images/products/wedding-cake.jpg",
    featured: true,
  },
  {
    id: "brioche",
    name: "Brioche",
    category: "Bread",
    description: "Sweet, tender French bread",
    price: 8.00,
    icon: "coffee",
    color: "from-rose-600 to-pink-600",
    image: "/images/products/brioche.jpg",
  },
  {
    id: "fruit-danish",
    name: "Fruit Danish",
    category: "Viennoiserie",
    description: "Seasonal fruits & pastry cream",
    price: 5.50,
    icon: "cake",
    color: "from-pink-500 to-rose-500",
    image: "/images/products/danish.jpg",
  },
  {
    id: "baguette-tradition",
    name: "Baguette Tradition",
    category: "Bread",
    description: "Classic French baguette",
    price: 4.00,
    icon: "coffee",
    color: "from-rose-500 to-pink-500",
    image: "/images/products/baguette.jpg",
  },
  {
    id: "opera-cake",
    name: "Opera Cake",
    category: "Classic Dessert",
    description: "Layers of coffee & chocolate",
    price: 32.00,
    icon: "cake",
    color: "from-pink-600 to-rose-600",
    image: "/images/products/opera-cake.jpg",
  },
];

// Helper to get featured items
export const getFeaturedItems = () => menuItems.filter(item => item.featured);

// Helper to get items by category
export const getItemsByCategory = (category: string) =>
  menuItems.filter(item => item.category === category);

// Get all unique categories
export const getCategories = () =>
  [...new Set(menuItems.map(item => item.category))];
