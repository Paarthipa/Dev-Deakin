import React, { useState } from "react";
import "../styles/Postpage.css";

function NewPost() {
  const [postType, setPostType] = useState("question");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    abstract: "",
    articleText: "",
    tags: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Submitted:", { postType, ...formData });
    alert("Post button clicked! (DB integration coming in future tasks)");
  };

  return (
    <div className="post-container">
      <h3>New Post</h3>

      <div className="post-type">
        <label>
          <input
            type="radio"
            value="question"
            checked={postType === "question"}
            onChange={() => setPostType("question")}
          />
          Question
        </label>
        <label>
          <input
            type="radio"
            value="article"
            checked={postType === "article"}
            onChange={() => setPostType("article")}
          />
          Article
        </label>
      </div>

      <div className="post-section">
        <h4>What do you want to ask or share</h4>
        <p className="hint">
          This section is designed based on the type of the post. It could be
          developed by conditional rendering.{" "}
          <span className="highlight">
            For post a {postType}, the following section would be appeared.
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Common Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder={
                postType === "question"
                  ? "Start your question with how, what, why, etc."
                  : "Enter a descriptive title"
              }
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Conditional Rendering */}
          {postType === "question" ? (
            <>
              <div className="form-group">
                <label>Describe your problem</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Abstract</label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Article Text</label>
                <textarea
                  name="articleText"
                  value={formData.articleText}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Tags */}
          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Please add up to 3 tags e.g., Java"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="post-btn">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
