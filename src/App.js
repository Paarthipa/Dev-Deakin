import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewPost from "./pages/NewPost";
import FindQuestions from "./pages/FindQuestions";
import NavBar from "./components/NavBar";
import PostEditor from "./pages/PostEditor";
import CheckoutCancel from "./pages/CheckoutCancel";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import PricingPage from "./pages/PricingPage";

function App() {
  const [user] = useAuthState(auth);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);

      // 🔹 Real-time listener for premium status
      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setIsPremium(snapshot.data().premium || false);
        } else {
          setIsPremium(false);
        }
      });

      return () => unsubscribe();
    } else {
      setIsPremium(false);
    }
  }, [user]);

  return (
    <Router>
      <NavBar isPremium={isPremium} />
      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={user ? <Home isPremium={isPremium} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/newpost"
          element={user ? <NewPost /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/findquestions"
          element={user ? <FindQuestions /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/plans"
          element={user ? <PricingPage isPremium={isPremium} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/posteditor"
          element={user ? <PostEditor /> : <Navigate to="/login" replace />}
        />

        {/* Billing routes (⚡ always accessible so Stripe redirect works) */}
        <Route path="/billing/success" element={<CheckoutSuccess />} />
        <Route path="/billing/cancel" element={<CheckoutCancel />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
