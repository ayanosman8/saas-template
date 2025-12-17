# Starter Template - Modern Business Landing Page

A beautiful, modern Next.js landing page template with glassmorphic design, smooth animations, and easy customization. Perfect for bakeries, cafes, restaurants, and small businesses.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## Features

- Modern glassmorphic UI design
- Smooth Framer Motion animations
- Fully responsive (mobile-first)
- TypeScript for type safety
- Easy customization via config files
- Dark theme with pink/rose accents
- Shopping cart component
- SEO-friendly structure

## Quick Start

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

---

## Customization Guide

### 1. Site Configuration (`lib/config.ts`)

This is your **one-stop shop** for customizing the template. Open `lib/config.ts` and edit:

```typescript
export const siteConfig = {
  // Your business name
  name: "La Rose",
  nameAccent: "Patisserie",

  // Main tagline shown in hero
  tagline: "Artisan Pastries. French Elegance. Sweet Perfection.",

  // Business description
  description: "Artisan French bakery crafting authentic pastries...",

  // Year founded (shown in hero)
  foundedYear: 2018,

  // ... and much more
}
```

**What you can customize:**
- Business name & tagline
- Hero section content & CTAs
- About section story & values
- Menu section titles
- Footer content & CTAs
- Navigation links
- Social media links
- Cart settings (tax rate, currency, pickup time)

### 2. Menu Items (`data/menu.ts`)

Edit your products in `data/menu.ts`:

```typescript
export const menuItems: MenuItem[] = [
  {
    id: "classic-croissant",
    name: "Classic Croissant",
    category: "Viennoiserie",
    description: "Buttery, flaky perfection",
    price: 4.50,
    icon: "croissant", // Options: "croissant" | "cake" | "coffee"
    color: "from-pink-500 to-rose-500",
    featured: true, // Optional: mark as featured
  },
  // Add more items...
];
```

### 3. Images

The template includes demo images from Unsplash. To replace them with your own:

**Product Images:**
1. Add images to `/public/images/products/`
2. Update the `image` field in `data/menu.ts`:
   ```typescript
   {
     id: "croissant",
     name: "Classic Croissant",
     image: "/images/products/my-croissant.jpg",
     // ...
   }
   ```

**About Section Image:**
1. Add your image to `/public/images/about/`
2. Update `lib/config.ts`:
   ```typescript
   about: {
     image: "/images/about/my-bakery.jpg",
     imageAlt: "Our beautiful bakery",
     // ...
   }
   ```

**Image Tips:**
- Recommended size: 400x300px for products, 800x600px for about section
- Use `.jpg` for photos, `.png` for graphics with transparency
- Optimize images with [Squoosh](https://squoosh.app) before adding

### 4. Changing Colors

The template uses pink/rose as the primary color scheme. To change colors:

1. Search and replace in all component files:
   - `pink-` → your color (e.g., `blue-`, `purple-`, `amber-`)
   - `rose-` → your accent color

2. Common Tailwind color options:
   - Blues: `blue`, `indigo`, `sky`, `cyan`
   - Greens: `green`, `emerald`, `teal`
   - Purples: `purple`, `violet`, `fuchsia`
   - Warm: `amber`, `orange`, `red`

---

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Header.tsx      # Navigation bar
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About/story section
│   │   ├── Menu.tsx        # Products grid
│   │   ├── Footer.tsx      # Footer with CTA
│   │   └── Cart.tsx        # Shopping cart modal
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── lib/
│   └── config.ts           # Site configuration
├── data/
│   └── menu.ts             # Menu items data
└── public/                 # Static assets
```

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy!

### Other Platforms

```bash
# Build for production
npm run build

# The output will be in the .next folder
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

---

## Support

If you have questions or need help customizing:
- Open an issue on GitHub
- Check the [Next.js docs](https://nextjs.org/docs)
- Check the [Tailwind docs](https://tailwindcss.com/docs)

---

## License

MIT License - feel free to use for personal and commercial projects.
