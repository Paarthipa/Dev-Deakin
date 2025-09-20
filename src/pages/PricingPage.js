<div className="pricing-page">
  <h1>Choose your plan</h1>
  <div className="pricing-cards">
    <div className="pricing-card free">
      <h2>Free</h2>
      <ul>
        <li>Read posts</li>
        <li>Basic profile</li>
      </ul>
      <button disabled>Current</button>
    </div>

    <div className="pricing-card premium">
      <h2>Premium</h2>
      <ul>
        <li>Custom banners & themes</li>
        <li>Content controls</li>
        <li>Analytics dashboard</li>
        <li>Priority support</li>
      </ul>
      <button onClick={startPremium}>Go Premium</button>
    </div>
  </div>
</div>
