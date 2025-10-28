import React, { useState } from "react";
import { walletAPI } from "../service/api";
import "./TransferFunds.css";

function TransferFunds() {
  const [transferData, setTransferData] = useState({
    fromWalletId: "",
    toWalletId: "",
    amount: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (transferData.fromWalletId === transferData.toWalletId) {
      setMessage("❌ Sender and receiver wallets cannot be the same.");
      return;
    }

    if (transferData.amount <= 0) {
      setMessage("❌ Amount must be a positive number.");
      return;
    }

    try {
      const response = await walletAPI.transferFunds(transferData);
      setMessage(`✅ ${response.data}`);
      setTransferData({ fromWalletId: "", toWalletId: "", amount: "" });
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data}`);
      } else {
        setMessage("❌ Transfer failed. Please try again.");
      }
    }
  };

  return (
    <div className="transfer-container">
      <h2>Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="transfer-form">
        <div className="form-group">
          <label>From Wallet ID</label>
          <input
            type="number"
            name="fromWalletId"
            value={transferData.fromWalletId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>To Wallet ID</label>
          <input
            type="number"
            name="toWalletId"
            value={transferData.toWalletId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={transferData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="transfer-btn">
          Transfer
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default TransferFunds;
