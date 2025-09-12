import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewPost from "./pages/NewPost";
import FindQuestions from "./pages/FindQuestions";
import NavBar from "./components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Redirect default route "/" to login if not logged in, else to home */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/newpost" element={user ? <NewPost /> : <Navigate to="/login" replace />} />
        <Route path="/findquestions" element={user ? <FindQuestions /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
