import React from "react";

function WelcomeEmail() {
  return (
    <div>
      <div className="intro">
        <img src="/images/OIP-removebg-preview.png" alt="logo" />
        <h1>Welcome to Dev@Deakin</h1>
      </div>

      <div className="email-box">
        <form method="post">
          <label htmlFor="email">SIGN UP FOR DAILY INSIDER</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default WelcomeEmail;
