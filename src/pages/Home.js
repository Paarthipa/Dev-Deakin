import "../App.css";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import { ArticleGrid, TutorialGrid } from "../components/Grid";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

export default function Home({ isPremium }) {
  return (
    <>
      <main className="container">
        <Hero />

        <SectionTitle>Featured Articles</SectionTitle>
        <ArticleGrid />
        <div className="center" style={{ margin: "16px 0 32px" }}>
          <button>See all articles</button>
        </div>

        <SectionTitle>Featured Tutorials</SectionTitle>
        <TutorialGrid />
        <div className="center" style={{ margin: "16px 0 32px" }}>
          <button>See all tutorials</button>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
