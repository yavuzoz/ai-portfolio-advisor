import React, { useEffect, useState } from "react";
import api from "../../api/Api";

export default function PortfolioList() {
  const [portfolio, setPortfolio] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Token'ı localStorage'dan alıyoruz
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Giriş yapmadınız veya token yok.");
      return;
    }

    api
      .get("Portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPortfolio(res.data))
      .catch((err) => {
        setError("Portföy alınamadı.");
        console.log(err);
      });
  }, []);

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h3>Portfolio</h3>
      <ul>
        {Array.isArray(portfolio) && portfolio.map((item) => (
          <li key={item.Id}>
            {item.Name}: <b>{item.Amount}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}