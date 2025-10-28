import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddWallet from "./pages/AddWallet";
import TopUp from "./pages/TopUp";
import TransferFunds from "./pages/TransferFunds";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/AddWallet" element={<AddWallet />} />
        <Route path="/TopUp" element={<TopUp />} />
        <Route path="/TransferFunds" element={<TransferFunds />} />
        <Route path="/Transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
