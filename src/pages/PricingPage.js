// pages/PricingPage.jsx
import { loadStripe } from "@stripe/stripe-js";
import "../styles/PricingPage.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PricingPage() {
  const startPremium = async () => {
    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: "premium_monthly" })
    });
    const { sessionId, error } = await res.json();
    if (error) {
      alert(error);
      return;
    }
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div className="pricing">
      <h1>Choose your plan</h1>
      <div className="cards">
        <div className="card">
          <h2>Free</h2>
          <ul>
            <li>Read posts</li>
            <li>Basic profile</li>
          </ul>
          <button disabled>Current</button>
        </div>

        <div className="card">
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
