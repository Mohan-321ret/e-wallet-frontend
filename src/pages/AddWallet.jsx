import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { walletAPI } from "../service/api";
import "./AddWallet.css";

function AddWallet() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState({
    ownerName: "",
    email: "",
    phone: "",
    balance: "",
  });

  const handleChange = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await walletAPI.addWallet(wallet);
      alert(response.data);
      navigate("/Transactions");
    } catch (error) {
      alert("Failed to create wallet. Please check details.");
    }
  };

  return (
    <div className="addwallet-container">
      <h2>Add New Wallet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Wallet Owner Name</label>
          <input type="text" name="ownerName" value={wallet.ownerName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={wallet.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" value={wallet.phone} onChange={handleChange} required maxLength="10" />
        </div>
        <div className="form-group">
          <label>Initial Balance</label>
          <input type="number" name="balance" value={wallet.balance} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Add Wallet</button>
      </form>
    </div>
  );
}

export default AddWallet; 
