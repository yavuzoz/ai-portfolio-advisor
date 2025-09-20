import React, { useEffect, useState } from "react";
import api from "../../api/Api";

export default function NewsList({ onNewsListReady }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("bitcoin");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("News/everything", {
        params: {
          q: query,
          language: "en",
          sortBy: "publishedAt",
          pageSize: 5,
          page: 1,
        },
      })
      .then((res) => {
        // Ensure each news has a unique id for UI
        let articles = res.data.articles || res.data;
        articles = articles.map((n, idx) => ({
          ...n,
          id: n.id || idx + 1 // fallback to index+1 if no id
        }));
        setNews(articles);
        setError("");
        setLoading(false);
        if (onNewsListReady) onNewsListReady(articles);
      })
      .catch((err) => {
        setError("Could not fetch news.");
        setNews([]);
        setLoading(false);
      });
  }, [query, onNewsListReady]);

  return (
    <div>
      <h3>News List</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: "8px" }}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <ul>
          {news.length === 0 && <li>No news found.</li>}
          {news.map((n, i) => (
            <li key={n.id || n.url || i}>
              <span style={{
                display: "inline-block",
                width: 22,
                fontWeight: "bold"
              }}>{n.id}.</span>{" "}
              <b>{n.title}</b> {n.author && <span>({n.author})</span>}
              <div style={{ fontSize: "0.9em" }}>{n.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}