import "../styles/Analytics.css";

export default function Analytics() {
  return (
    <div className="premium-page">
      <h2 className="premium-header">📊 Analytics Dashboard</h2>
      <p className="premium-desc">
        Track engagement, post views, and growth over time.
      </p>
      <div className="analytics-cards">
        <div className="analytics-card">👁️ 1200 Views</div>
        <div className="analytics-card">💬 300 Comments</div>
        <div className="analytics-card">👍 800 Likes</div>
      </div>
    </div>
  );
}
