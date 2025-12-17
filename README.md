# ShipFast - SaaS Starter Kit

A production-ready Next.js starter kit with authentication, payments, and a beautiful dashboard. Stop rebuilding the same features — start shipping faster.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## What's Included

### Landing Page
- Modern glassmorphic design with smooth animations
- Hero section with gradient effects
- Features grid
- Pricing table (connected to Stripe)
- Tech stack showcase
- Fully responsive

### Authentication (Supabase)
- Google OAuth
- GitHub OAuth
- Email/password (ready to enable)
- Protected routes via middleware
- Demo mode when not configured

### Dashboard
- Stats cards with hover effects
- Recent activity feed
- Quick actions
- Search bar
- Notification bell
- User profile section

### Settings Page
- **Profile** - Avatar, personal info, connected accounts
- **Billing** - Current plan, payment method, usage meters, invoice history
- **Notifications** - Email preferences
- **Security** - Password, 2FA, danger zone

### Payments (Stripe)
- Checkout sessions
- Webhook handling
- Customer portal
- Multiple pricing tiers

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the template works in demo mode without any configuration.

---

## Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** and copy your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Enable OAuth providers in **Authentication > Providers**:
   - Google: Add your OAuth credentials from Google Cloud Console
   - GitHub: Add your OAuth app credentials from GitHub Settings

4. Set the redirect URL in each provider:
   ```
   https://your-domain.com/auth/callback
   ```

### Stripe Setup

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys):

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

2. Create products in **Stripe Dashboard > Products**, then copy the price IDs:

```env
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
```

3. Set up webhooks:
   - Go to **Developers > Webhooks**
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.*`
   - Copy the webhook secret:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Local Development:** Use Stripe CLI to forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Customization

### Site Config (`lib/config.ts`)

All text content is centralized in one file:

```typescript
export const siteConfig = {
  name: "Ship",
  nameAccent: "Fast",
  tagline: "Build faster. Launch sooner. Scale effortlessly.",
  // ... hero, about, features, footer, navigation
};
```

### Styling

The template uses a dark theme with blue/indigo accents. To change colors:

1. Search for `blue-` and `indigo-` in component files
2. Replace with your preferred Tailwind colors (`emerald-`, `purple-`, `amber-`, etc.)

### Dashboard

Add new pages in `app/dashboard/`:
- Copy the structure from `app/dashboard/page.tsx`
- Add navigation link in `app/dashboard/layout.tsx`

---

## Project Structure

```
├── app/
│   ├── api/
│   │   └── stripe/          # Stripe endpoints
│   │       ├── checkout/
│   │       ├── portal/
│   │       └── webhook/
│   ├── auth/
│   │   └── callback/        # OAuth callback
│   ├── components/          # Landing page components
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard layout + sidebar
│   │   ├── page.tsx         # Main dashboard
│   │   └── settings/        # Settings page
│   ├── signin/
│   ├── signup/
│   └── success/             # Post-checkout page
├── lib/
│   ├── config.ts            # Site configuration
│   ├── stripe/              # Stripe utilities
│   └── supabase/            # Supabase clients
├── middleware.ts            # Route protection
└── .env.example             # Environment template
```

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Auth:** Supabase
- **Payments:** Stripe
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

```bash
npm run build
```

The output will be in `.next/` — deploy to any Node.js hosting.

---

## FAQ

**Can I use this for multiple projects?**
Yes, the license allows unlimited projects.

**Do I need Supabase and Stripe to run it?**
No, the template works in demo mode without any configuration. Perfect for previewing before setup.

**How do I add more OAuth providers?**
Enable them in Supabase Dashboard and add the button in `app/signin/page.tsx`.

**How do I add a database?**
Supabase includes PostgreSQL. Create tables in the Supabase Dashboard and query them with the Supabase client.

---

## License

MIT License — use for personal and commercial projects.

---

Built with Next.js, Supabase, and Stripe.
