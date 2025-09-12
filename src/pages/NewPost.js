import React, { useState } from "react";
import "../styles/Postpage.css";
import { db, storage } from "../firebase";  
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewPost() {
  const [postType, setPostType] = useState("question");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    abstract: "",
    articleText: "",
    tags: ""
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log("Submitting post...");

  try {
    let imageURL = "";

    if (image) {
      console.log("Uploading image:", image.name);
      const imgRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      await uploadBytes(imgRef, image);
      imageURL = await getDownloadURL(imgRef);
      console.log("Image uploaded successfully:", imageURL);
    } else {
      console.log("No image selected.");
    }

    await addDoc(collection(db, "posts"), {
      postType,
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
      imageURL,
      createdAt: serverTimestamp(),
    });

    console.log("Post added to Firestore!");
    alert("Post submitted successfully!");
    setFormData({
      title: "",
      description: "",
      abstract: "",
      articleText: "",
      tags: "",
    });
    setImage(null);
    setPreview(null);
  } catch (err) {
    console.error("Error adding post:", err.message);
    alert("Error: " + err.message);
  }

  setLoading(false);
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
          /> Question
        </label>
        <label>
          <input
            type="radio"
            value="article"
            checked={postType === "article"}
            onChange={() => setPostType("article")}
          /> Article
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder={postType === "question" ? "Start your question..." : "Enter a descriptive title"}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Add an image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <div className="preview">
              <img src={preview} alt="preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
            </div>
          )}
        </div>

        {postType === "question" ? (
          <div className="form-group">
            <label>Describe your problem</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Abstract</label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Article Text</label>
              <textarea
                name="articleText"
                value={formData.articleText}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Add up to 3 tags e.g., Java"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="post-btn" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}

export default NewPost;
