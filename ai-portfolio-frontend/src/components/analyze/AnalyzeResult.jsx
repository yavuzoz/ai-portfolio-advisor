import React from "react";

export default function AnalyzeResult({ result }) {
  if (!result) return null;

  // Support for string or object result
  let analysis = "";
  let newsList = [];

  if (typeof result === "string") {
    analysis = result;
  } else if (typeof result === "object" && result !== null) {
    analysis = result.analysis || "";
    newsList = Array.isArray(result.news) ? result.news : [];
  }

  return (
    <div
      style={{
        maxHeight: "300px",
        minHeight: "120px",
        overflowY: "auto",
        background: "#f8f8fa",
        border: "1px solid #eee",
        borderRadius: "6px",
        padding: "14px",
        marginTop: "10px",
        fontSize: "15px"
      }}
    >
      {analysis && (
        <div style={{ marginBottom: "16px" }}>
          <strong>AI Analysis:</strong>
          <div style={{ marginTop: 6, whiteSpace: "pre-line" }}>{analysis}</div>
        </div>
      )}
      {newsList.length > 0 && (
        <div>
          <strong>Related News:</strong>
          <ul style={{ marginTop: 6 }}>
            {newsList.map((item, idx) => (
              <li key={item.id || item.title || idx}>
                <b>{item.title}</b>
                {item.summary && <span>: {item.summary}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}