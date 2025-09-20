import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#1976d2",
        padding: "0 32px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        {token && (
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "22px",
              letterSpacing: "1px"
            }}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div>
        {!token && (
          <>
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "18px"
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Register
            </Link>
          </>
        )}
        {token && (
          <button
            onClick={handleLogout}
            style={{
              background: "#fff",
              color: "#1976d2",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "15px",
              padding: "7px 22px",
              cursor: "pointer",
              marginLeft: "16px"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}