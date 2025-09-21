import React, { useState } from "react";   // removed unused useEffect
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const [query, setQuery] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("devd_premium");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/findquestions?search=${encodeURIComponent(query)}`);
    }
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <div className="navbar">
        <div className="navbar-center logo">DEV@Deakin</div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-left logo" onClick={() => navigate("/home")}>
        DEV@Deakin
      </div>

      <div className="navbar-center">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      <div className="navbar-right">
        <button className="nav-btn plans" onClick={() => navigate("/plans")}>
          Plans
        </button>

        {isPremium && (
          <button
            className="nav-btn premium"
            onClick={() => navigate("/premium-features")}
          >
            Premium
          </button>
        )}

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
