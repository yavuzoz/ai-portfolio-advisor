import React, { useState } from "react";
import api from "../../api/Api";

export default function NewsForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    author: "",
    source: { id: "", name: "" },
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // source.name ve source.id özel
    if (name.startsWith("source.")) {
      setForm({ ...form, source: { ...form.source, [name.split(".")[1]]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("News", form);
      setMessage("News added!");
      setForm({
        title: "",
        description: "",
        url: "",
        author: "",
        source: { id: "", name: "" },
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to add news.");
    }
  };

  return (
    <form className="news-form" onSubmit={handleSubmit}>
      <h4>Add News</h4>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="url" value={form.url} onChange={handleChange} placeholder="URL" />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
      <input name="source.id" value={form.source.id} onChange={handleChange} placeholder="Source ID" />
      <input name="source.name" value={form.source.name} onChange={handleChange} placeholder="Source Name" />
      <button type="submit">Add</button>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}