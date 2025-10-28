import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Optional if you want styling

function NavBar() {
  return (
    <nav className="navbar">
      <h2 className="nav-title">E-Wallet</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/AddWallet">Add Wallet</Link></li>
        <li><Link to="/Transactions">Transactions</Link></li>
        <li><Link to="/TransferFunds">Transfer Funds</Link></li>
        <li><Link to="/TopUp">Top-Up Wallet</Link></li>

      </ul>
    </nav>
  );
}

export default NavBar;
