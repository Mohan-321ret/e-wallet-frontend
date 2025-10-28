import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../service/api";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.login({
        email,
        password,
      });

      // Store user data
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("isLoggedIn", "true");

      setMessage("✅ Login successful!");

      // Redirect based on role after showing success message
      setTimeout(() => {
        if (res.data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setMessage(`❌ ${err.response.data}`);
      } else if (err.request) {
        setMessage("❌ Cannot connect to server. Please check if backend is running.");
      } else {
        setMessage("❌ Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className={message.includes('✅') ? 'success' : 'error'}>{message}</p>}
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button 
            type="button"
            onClick={() => {
              setEmail("admin@wallet");
              setPassword("admin123");
            }}
            style={{
              padding: "8px 16px",
              background: "#E43636",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            Admin Login
          </button>
        </div>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;