import { useState } from "react";
import "./Newsletter.css";

// Detect environment: local (netlify dev) vs production
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/.netlify/functions"
    : "http://localhost:8888/.netlify/functions";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const ok = res.ok;
      setSubscribed(true);
      setStatus(
        ok
          ? "Subscription successful. Check your inbox."
          : "Subscription failed. Try again."
      );
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscribed(true);
      setStatus("Subscription failed. Try again.");
    }
  };

  return (
    <div className="newsletter-bar">
      {!subscribed ? (
        <>
          <h2 className="newsletter-title">SIGN UP FOR OUR DAILY INSIDER</h2>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </>
      ) : (
        <p className="newsletter-status">{status}</p>
      )}
    </div>
  );
}
