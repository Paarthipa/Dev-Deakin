import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { plan } = JSON.parse(event.body);

    // For now, we always use the Premium Monthly price ID from env
    const priceId = process.env.PRICE_ID_PREMIUM_MONTHLY;

    // Create a customer first (you could attach user email from your auth later)
    const customer = await stripe.customers.create({
      description: "Dev@Deakin Premium customer",
    });

    // Create a Checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer.id, // ✅ attach customer here
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
    console.error("Stripe error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
