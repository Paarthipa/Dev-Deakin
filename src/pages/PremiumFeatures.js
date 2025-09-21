import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import "../styles/PremiumFeatures.css";

export default function PremiumFeatures() {
  return (
    <main className="container">
      <div className="premium-section">
        <SectionTitle>🌟 Premium Features</SectionTitle>
        <div className="premium-grid">
          <Link to="/themes" className="premium-card">
            <h3>🎨 Custom Banners & Themes</h3>
            <p>Personalize your Dev@Deakin experience with custom designs.</p>
          </Link>
          <Link to="/content-controls" className="premium-card">
            <h3>📝 Content Controls</h3>
            <p>Manage visibility, moderation, and advanced publishing tools.</p>
          </Link>
          <Link to="/analytics" className="premium-card">
            <h3>📊 Analytics Dashboard</h3>
            <p>Gain insights into engagement, reach, and performance metrics.</p>
          </Link>
          <Link to="/support" className="premium-card">
            <h3>⚡ Priority Support</h3>
            <p>Get fast assistance and dedicated support for your queries.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
