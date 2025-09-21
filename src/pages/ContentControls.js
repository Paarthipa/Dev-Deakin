import "../styles/ContentControls.css";

export default function ContentControls() {
  return (
    <div className="premium-page">
      <h2 className="premium-header">📝 Content Controls</h2>
      <p className="premium-desc">
        Manage your posts with ease — edit, delete, and highlight your best content anytime.
      </p>
      <div className="controls-grid">
        <button className="control-btn edit">✏️ Edit Post</button>
        <button className="control-btn delete">🗑️ Delete Post</button>
        <button className="control-btn pin">📌 Pin to Top</button>
      </div>
    </div>
  );
}
