import React, { useEffect, useState } from "react";
import { transactionAPI } from "../service/api";
import "./Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionAPI.getAllTransactions();
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transactions.");
      }
    };
    fetchTransactions();
  }, []);

  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Transaction Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; }
            .header { text-align: center; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>E-Wallet Transaction Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Transactions: ${transactions.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>From Wallet</th>
                <th>To Wallet</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(txn => `
                <tr>
                  <td>${txn.transactionId}</td>
                  <td>${txn.fromWalletId}</td>
                  <td>${txn.toWalletId}</td>
                  <td>₹${txn.amount.toFixed(2)}</td>
                  <td>${new Date(txn.timestamp).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="transactions-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Transaction History</h2>
        {transactions.length > 0 && (
          <button 
            onClick={downloadPDF}
            style={{
              padding: "10px 20px",
              background: "#E43636",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            📥 Download Report
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <h3 style={{ margin: 0, color: "#333" }}>E-Wallet Transaction Report</h3>
            <p style={{ margin: "5px 0", color: "#666" }}>Generated on: {new Date().toLocaleDateString()}</p>
            <p style={{ margin: "5px 0", color: "#666" }}>Total Transactions: {transactions.length}</p>
          </div>
          <table className="transactions-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Transaction ID</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>From Wallet</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>To Wallet</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.transactionId}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{txn.transactionId}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{txn.fromWalletId}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{txn.toWalletId}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>₹{txn.amount.toFixed(2)}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{new Date(txn.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
