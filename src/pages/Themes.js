import "../styles/Themes.css";

export default function Themes() {
  return (
    <div className="premium-page">
      <h2 className="premium-header">🎨 Custom Banners & Themes</h2>
      <p className="premium-desc">
        Personalize your Dev@Deakin experience with beautiful banners, light/dark themes, and unique styles that match your vibe.
      </p>
      <div className="theme-preview">
        <div className="theme-card light">🌞 Light Mode</div>
        <div className="theme-card dark">🌙 Dark Mode</div>
        <div className="theme-card custom">🌈 Gradient</div>
      </div>
    </div>
  );
}
