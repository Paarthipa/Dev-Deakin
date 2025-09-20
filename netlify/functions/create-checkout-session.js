// netlify/functions/create-checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const { plan } = JSON.parse(event.body);

    // Match the plan with Stripe Price ID
    let priceId;
    if (plan === "premium_monthly") {
      priceId = process.env.PRICE_ID_PREMIUM_MONTHLY; // set in Netlify env
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid plan selected" }),
      };
    }

    // ✅ Create subscription checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // recurring plan
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: "https://dev-at-deakinapp.netlify.app/billing/success",
      cancel_url: "https://dev-at-deakinapp.netlify.app/billing/cancel",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    console.error("Stripe error:", err);
    return { statusCode: 500, body: err.message };
  }
};
