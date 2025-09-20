import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
}

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav
      style={{
        marginBottom: "16px",
        background: "#1976d2",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        color: "#fff"
      }}
    >
      {token ? (
        <>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", marginRight: "16px", fontWeight: "bold" }}>
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "auto",
              background: "#fff",
              color: "#1976d2",
              border: "none",
              padding: "6px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "#fff", textDecoration: "none", marginRight: "16px", fontWeight: "bold" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default function RoutesApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}