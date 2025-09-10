import './SectionTitle.css';
export default function SectionTitle({ children }) {
  return (
    <div className="section">
      <h2 className="section-title">{children}</h2>
      <div className="section-title__rule" />
    </div>
  );
}
