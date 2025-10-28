import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>💳 Welcome to E-Wallet System</h1>
      <p>Manage your digital wallet with ease. Send, receive, and track transactions securely.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/login">
          <button className="register-button" style={{ marginRight: "1rem", background: "#E43636" }}>Login</button>
        </Link>
        <Link to="/register">
          <button className="register-button" style={{ background: "#E43636" }}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
