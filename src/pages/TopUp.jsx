import React, { useState } from "react";
import { walletAPI } from "../service/api";
import "./TopUp.css";

function TopUp() {
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setMessage("❌ Amount must be positive.");
      return;
    }
    try {
      const response = await walletAPI.topUp({
        walletId,
        amount,
      });
      setMessage(`✅ ${response.data}`);
      setWalletId("");
      setAmount("");
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data}`);
      } else {
        setMessage("❌ Failed to top-up wallet.");
      }
    }
  };

  return (
    <div className="topup-container">
      <h2>Top-Up Wallet</h2>
      <form onSubmit={handleSubmit} className="topup-form">
        <div className="form-group">
          <label>Wallet ID</label>
          <input
            type="number"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount to Add</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="topup-btn">Add Money</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default TopUp;
