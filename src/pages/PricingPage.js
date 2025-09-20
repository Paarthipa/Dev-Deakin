import "../styles/PricingPage.css";
import { loadStripe } from "@stripe/stripe-js"; // ✅ import loadStripe

export default function PricingPage({ isPremium }) {
  if (isPremium) {
    return (
      <div className="already-premium">
        <h2>🎉 You already have Premium!</h2>
        <p>Enjoy your exclusive features.</p>
      </div>
    );
  }

  return (
    <div className="pricing-page">
      <h1>Choose your plan</h1>
      <div className="pricing-cards">
        <div className="pricing-card free">
          <h2>Free</h2>
          <ul>
            <li>Read posts</li>
            <li>Basic profile</li>
          </ul>
          <button disabled>Current</button>
        </div>

        <div className="pricing-card premium">
          <h2>Premium</h2>
          <ul>
            <li>Custom banners & themes</li>
            <li>Content controls</li>
            <li>Analytics dashboard</li>
            <li>Priority support</li>
          </ul>
          <button onClick={startPremium}>Go Premium</button>
        </div>
      </div>
    </div>
  );
}

async function startPremium() {
  try {
    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: "premium_monthly" }), // must match exactly
    });

    const data = await res.json(); // parse JSON properly

    if (!res.ok) {
      console.error("Server error:", data);
      alert("❌ Failed to start checkout: " + (data.error || "Unknown error"));
      return;
    }

    // ✅ Use loadStripe
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    alert("Something went wrong. Check console.");
  }
}
