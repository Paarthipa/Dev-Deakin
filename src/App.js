import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/newpost" element={user ? <NewPost /> : <Navigate to="/login" replace />} />
        <Route path="/findquestions" element={user ? <FindQuestions /> : <Navigate to="/login" replace />} />
        <Route path="/plans" element={user ? <PricingPage /> : <Navigate to="/login" replace />} />
        <Route path="/billing/success" element={user ? <CheckoutSuccess /> : <Navigate to="/login" replace />} />
        <Route path="/billing/cancel" element={user ? <CheckoutCancel /> : <Navigate to="/login" replace />} />
        <Route path="/posteditor" element={user ? <PostEditor /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
