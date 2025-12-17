import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get customer info
      const customerEmail = session.customer_details?.email;
      const userId = session.metadata?.userId;

      console.log("Payment successful!", {
        sessionId: session.id,
        customerEmail,
        userId,
        paymentStatus: session.payment_status,
      });

      // TODO: Add your business logic here
      // - Update user subscription status in database
      // - Send confirmation email
      // - Grant access to premium features

      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;

      console.log("Subscription updated!", {
        subscriptionId: subscription.id,
        status: subscription.status,
        customerId: subscription.customer,
      });

      // TODO: Update subscription status in database

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      console.log("Subscription cancelled!", {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
      });

      // TODO: Revoke access, update database

      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;

      console.log("Payment failed!", {
        invoiceId: invoice.id,
        customerId: invoice.customer,
      });

      // TODO: Notify user, retry payment, etc.

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
