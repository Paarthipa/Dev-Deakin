import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

function FindQuestions() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearch(query);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setQuestions(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const filterByDate = (createdAt) => {
    if (!createdAt?.toDate) return false;
    const postDate = createdAt.toDate();
    const today = new Date();

    if (dateFilter === "today") {
      return postDate.toDateString() === today.toDateString();
    }
    if (dateFilter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      return postDate >= oneWeekAgo;
    }
    if (dateFilter === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
      return postDate >= oneMonthAgo;
    }
    return true;
  };

  const filtered = questions.filter(
    (q) =>
      (q.title.toLowerCase().includes(search.toLowerCase()) ||
        (q.tags &&
          q.tags.join(",").toLowerCase().includes(search.toLowerCase()))) &&
      filterByDate(q.createdAt)
  );

  return (
    <div className="find-questions">
      <h2>Find Questions</h2>

      <div className="filters">
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
        </select>
      </div>

      <div className="question-list">
        {filtered.map((q) => (
          <div key={q.id} className="question-card">
            <h3>{q.title}</h3>
            <p>{q.postType === "question" ? q.description : q.abstract}</p>

            {q.imageURL && (
              <img
                src={q.imageURL}
                alt="uploaded"
                style={{
                  maxWidth: "200px",
                  marginTop: "10px",
                  borderRadius: "6px",
                }}
              />
            )}

            <p>
              <b>Tags:</b> {q.tags ? q.tags.join(", ") : "None"}
            </p>
            <p>
              <b>Date:</b>{" "}
              {q.createdAt?.toDate
                ? q.createdAt.toDate().toLocaleDateString()
                : "N/A"}
            </p>

            {expanded === q.id && (
              <div className="details">
                {q.postType === "article" && <p>{q.articleText}</p>}
                {q.postType === "question" && (
                  <p>
                    <b>Full Problem:</b> {q.description}
                  </p>
                )}
              </div>
            )}

            <div className="actions">
              <button
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              >
                {expanded === q.id ? "Collapse" : "Expand"}
              </button>
              <button onClick={() => handleDelete(q.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindQuestions;
