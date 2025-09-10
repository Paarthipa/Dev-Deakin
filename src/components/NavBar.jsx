import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  // Sign out handler
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // redirect after sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Show only center logo on login/signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <div className="navbar">
        <div className="navbar-center">DEV@Deakin</div>
      </div>
    );
  }

  // Show full navbar when logged in
  return (
    <div className="navbar">
      <div className="navbar-left">DEV@Deakin</div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <button className="nav-btn post" onClick={() => navigate("/newpost")}>
          Post
        </button>
        <button className="nav-btn signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
