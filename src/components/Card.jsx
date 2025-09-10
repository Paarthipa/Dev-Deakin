import React from "react";
import "./Card.css";

export default function Card({ img, title, desc, author, user, rating }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="stars">
        {"★".repeat(fullStars).split("").map((s, i) => (
          <span key={`full-${i}`} style={{ color: "gold" }}>{s}</span>
        ))}
        {halfStar && <span style={{ color: "gold" }}>⯨</span>}
        {"☆".repeat(emptyStars).split("").map((s, i) => (
          <span key={`empty-${i}`} style={{ color: "#ccc" }}>{s}</span>
        ))}
      </div>
    );
  };

  return (
    <article className="card">
      <img className="card__img" src={img} alt={title} />
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__desc">{desc}</p>
        <div className="card__meta">
          {renderStars(rating)}
          <span className="card__rating">{rating}</span>
          {/* 👇 Show author if exists, otherwise show user */}
          <span className="card__author">{author || user}</span>
        </div>
      </div>
    </article>
  );
}
