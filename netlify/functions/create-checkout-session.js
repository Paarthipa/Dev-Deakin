// netlify/functions/create-checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { plan } = JSON.parse(event.body || "{}");
    if (plan !== "premium_monthly") {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid plan" }) };
    }

    const priceId = process.env.PRICE_ID_PREMIUM_MONTHLY;
    const origin = process.env.SITE_URL || "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing/cancel`,
      // (Optional) collect email to map customer later:
      customer_creation: "always",
      billing_address_collection: "auto",
      allow_promotion_codes: true
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
