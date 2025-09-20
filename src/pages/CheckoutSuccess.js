// CheckoutSuccess.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/CheckoutSuccess.css";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("⏳ Waiting for login...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, { premium: true }, { merge: true });
          console.log("✅ User upgraded to Premium in Firestore");
          setStatus("🎉 Premium activated! Redirecting...");

          // redirect only after Firestore update
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } catch (err) {
          console.error("❌ Error updating premium status:", err);
          setStatus("⚠️ Error while updating premium. Please contact support.");
        }
      } else {
        setStatus("⚠️ You must log in again.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="checkout-success">
      <h1>Payment successful 🎉</h1>
      <p>{status}</p>
    </div>
  );
}
