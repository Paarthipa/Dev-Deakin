// pages/CheckoutSuccess.jsx
import { useEffect, useState } from "react";
import "../styles/CheckoutSuccess.css";


export default function CheckoutSuccess() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Minimal demo: mark as premium
    localStorage.setItem("devd_premium", "true");
    setDone(true);
  }, []);

  return (
    <div>
      <h1>Payment successful 🎉</h1>
      {done && <p>Your premium features are now unlocked.</p>}
    </div>
  );
}