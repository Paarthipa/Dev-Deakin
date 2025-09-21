import "../styles/Support.css";

export default function Support() {
  return (
    <div className="premium-page">
      <h2 className="premium-header">⚡ Priority Support</h2>
      <p className="premium-desc">
        Get instant access to our premium support team for faster resolutions.
      </p>
      <form className="support-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Describe your issue..." rows="5" required></textarea>
        <button type="submit">🚀 Submit Ticket</button>
      </form>
    </div>
  );
}
