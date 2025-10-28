import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { walletAPI, transactionAPI } from "../service/api";
import AddWallet from "./AddWallet";
import TopUp from "./TopUp";
import TransferFunds from "./TransferFunds";
import Transactions from "./Transactions";
import Chatbot from "../components/Chatbot";
import AIInsights from "../components/AIInsights";
import AIAlerts from "../components/AIAlerts";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (!isLoggedIn || !userData) {
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchUserWallets(parsedUser.email);
    fetchTransactions();
  }, [navigate]);

  const fetchUserWallets = async (email) => {
    try {
      console.log("Fetching wallets for email:", email);
      const response = await walletAPI.getWalletsByEmail(email);
      console.log("Wallets response:", response.data);
      setWallets(response.data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
      setWallets([]);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (!user) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #E43636 0%, #c62d2d 100%)",
    padding: "2rem"
  };

  const headerStyle = {
    background: "white",
    borderRadius: "15px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const walletCardStyle = {
    background: "white",
    borderRadius: "15px",
    padding: "1.5rem",
    margin: "1rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0"
  };

  const tabStyle = (tab) => ({
    padding: "12px 24px",
    margin: "0 8px",
    background: activeTab === tab ? "#E43636" : "white",
    color: activeTab === tab ? "white" : "#333",
    border: "2px solid #E43636",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease"
  });

  const contentStyle = {
    background: "white",
    borderRadius: "15px",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, color: "#333" }}>💳 E-Wallet Dashboard</h1>
          <p style={{ margin: "5px 0 0 0", color: "#666" }}>Welcome back, {user.name}!</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: "10px 20px", 
            background: "#dc3545", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button style={tabStyle("overview")} onClick={() => setActiveTab("overview")}>📊 Overview</button>
        <button style={tabStyle("wallet")} onClick={() => setActiveTab("wallet")}>🏦 Create Wallet</button>
        <button style={tabStyle("topup")} onClick={() => setActiveTab("topup")}>💰 Top Up</button>
        <button style={tabStyle("transfer")} onClick={() => setActiveTab("transfer")}>💸 Transfer</button>
        <button style={tabStyle("history")} onClick={() => setActiveTab("history")}>📋 History</button>
      </div>

      <div style={contentStyle}>
        {activeTab === "overview" && (
          <div>
            <AIInsights transactions={transactions} wallets={wallets} />
            <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>E-Wallet System Features</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              <div style={walletCardStyle}>
                <h3 style={{ color: "#E43636", marginBottom: "1rem" }}>💳 Digital Wallet Management</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>Create and manage multiple digital wallets with secure transactions and real-time balance tracking.</p>
              </div>
              <div style={walletCardStyle}>
                <h3 style={{ color: "#E43636", marginBottom: "1rem" }}>💰 Instant Money Transfer</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>Transfer funds instantly between wallets with secure authentication and transaction history.</p>
              </div>
              <div style={walletCardStyle}>
                <h3 style={{ color: "#E43636", marginBottom: "1rem" }}>📊 Transaction Analytics</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>View detailed transaction history and analytics to track your financial activities.</p>
              </div>
              <div style={walletCardStyle}>
                <h3 style={{ color: "#E43636", marginBottom: "1rem" }}>🔒 Secure & Reliable</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>Bank-level security with encrypted transactions and secure user authentication.</p>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <h3 style={{ color: "#333", marginBottom: "1rem" }}>Get Started</h3>
              <p style={{ color: "#666", marginBottom: "2rem" }}>Choose an option below to begin managing your digital wallet</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => setActiveTab("wallet")} style={{ padding: "12px 24px", background: "#E43636", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Create Wallet</button>
                <button onClick={() => setActiveTab("topup")} style={{ padding: "12px 24px", background: "#E43636", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Top Up Funds</button>
                <button onClick={() => setActiveTab("transfer")} style={{ padding: "12px 24px", background: "#E43636", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Transfer Money</button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "wallet" && <AddWallet />}
        {activeTab === "topup" && <TopUp />}
        {activeTab === "transfer" && <TransferFunds />}
        {activeTab === "history" && <Transactions />}
      </div>
      
      <Chatbot />
      <AIAlerts transactions={transactions} wallets={wallets} />
    </div>
  );
}

export default UserDashboard;