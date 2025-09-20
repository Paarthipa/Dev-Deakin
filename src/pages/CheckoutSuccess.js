// CheckoutSuccess.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/CheckoutSuccess.css";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // ✅ mark Firestore user as premium
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, { premium: true }, { merge: true })
        .then(() => {
          console.log("User upgraded to Premium in Firestore ✅");
        })
        .catch((err) => {
          console.error("Error updating premium status:", err);
        });
    }

    // redirect after 2s
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="checkout-success">
      <h1>Payment successful 🎉</h1>
      <p>Your premium features are now unlocked.</p>
      <p>Redirecting you back...</p>
    </div>
  );
}
