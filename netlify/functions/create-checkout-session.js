import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { plan } = JSON.parse(event.body);

    // Match the plan with the Stripe Price ID
    let priceId;
    if (plan === "premium_monthly") {
      priceId = process.env.PRICE_ID_PREMIUM_MONTHLY; // set this in Netlify env
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid plan selected" }),
      };
    }

    // ✅ Create a subscription checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",            // 👈 this is what you need for recurring plans
      payment_method_types: ["card"],  // allow card payments
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/checkout-cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (err) {
    console.error("Stripe error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
