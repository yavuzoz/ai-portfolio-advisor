import React, { useState, useEffect } from "react";
import api from "../../api/Api";
import AnalyzeResult from "./AnalyzeResult";

export default function AnalyzeForm() {
  const [newsList, setNewsList] = useState([]);
  const [inputId, setInputId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Listen to window for newsList updates if needed
  useEffect(() => {
    // Optionally, you can use context or props to get newsList from NewsList
    // Here, for demo, re-fetch latest
    api
      .get("News/everything", {
        params: {
          q: "bitcoin",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 5,
          page: 1,
        },
      })
      .then((res) => {
        let articles = res.data.articles || res.data;
        articles = articles.map((n, idx) => ({
          ...n,
          id: n.id || idx + 1 // fallback to index+1 if no id
        }));
        setNewsList(articles);
      });
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const selectedId = Number(inputId);
    if (isNaN(selectedId) || selectedId <= 0) {
      setError("Please enter a valid News ID number.");
      setLoading(false);
      return;
    }

    const foundNews = newsList.find(n => n.id === selectedId);
    if (!foundNews) {
      setError("No news found with that ID.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("Analyze", { newsIds: [selectedId] });
      setResult(res.data);
    } catch (err) {
      setError(
        "Analyze failed." +
          (err?.response?.data?.message
            ? " " + err.response.data.message
            : "")
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>AI Analyze</h3>
      <form onSubmit={handleAnalyze}>
        <input
          placeholder="Enter News ID shown before the news title (e.g. 2)"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button type="submit" disabled={loading || !inputId.trim()}>
          Analyze
        </button>
      </form>
      {loading && <div>Analyzing...</div>}
      {error && <div className="error">{error}</div>}
      {result && <AnalyzeResult result={result} />}
    </div>
  );
}