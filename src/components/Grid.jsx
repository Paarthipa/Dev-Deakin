import "./Grid.css";
import { articles, tutorials } from "../data/articles";

export function ArticleGrid() {
  return (
    <div className="grid">
      {articles.map((article) => (
        <div key={article.id} className="card">
          <img src={article.img} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.desc}</p>
          <p><strong>{article.author}</strong></p>
          <p>⭐ {article.rating}</p>
        </div>
      ))}
    </div>
  );
}

export function TutorialGrid() {
  return (
    <div className="grid">
      {tutorials.map((tutorial) => (
        <div key={tutorial.id} className="card">
          <img src={tutorial.img} alt={tutorial.title} />
          <h3>{tutorial.title}</h3>
          <p>{tutorial.desc}</p>
          <p><strong>{tutorial.author}</strong></p>
          <p>⭐ {tutorial.rating}</p>
        </div>
      ))}
    </div>
  );
}
