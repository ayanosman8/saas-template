import { NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { priceId, mode = "payment" } = await request.json();

    // Map plan name to actual Stripe price ID
    const stripePriceId = PRICES[priceId as keyof typeof PRICES];

    if (!stripePriceId) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

    // Get user if logged in
    let customerEmail: string | undefined;
    let userId: string | undefined;

    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        customerEmail = user.email;
        userId = user.id;
      }
    } catch {
      // Supabase not configured, continue without user
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: mode as "payment" | "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/#pricing`,
      customer_email: customerEmail,
      metadata: {
        userId: userId || "",
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
