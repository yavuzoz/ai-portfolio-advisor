import React from "react";
import NewsList from "../news/NewsList";
import PortfolioList from "../portfolio/PortfolioList";
import AnalyzeForm from "../analyze/AnalyzeForm";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-section">
        <NewsList />
      </div>
      <div className="dashboard-section">
        <PortfolioList />
      </div>
      <div className="dashboard-section">
        <AnalyzeForm />
      </div>
    </div>
  );
}