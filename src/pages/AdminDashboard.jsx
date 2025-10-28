import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { testAPI, transactionAPI } from "../service/api";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("analytics");
  const [users, setUsers] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (!isLoggedIn || !userData) {
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "ADMIN") {
      navigate("/user-dashboard");
      return;
    }
    
    setUser(parsedUser);
    fetchUsers();
    fetchWallets();
    fetchTransactions();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await testAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchWallets = async () => {
    try {
      const response = await testAPI.getWallets();
      setWallets(response.data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
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

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await testAPI.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (!user) return <div>Loading...</div>;

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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

  const tabStyle = (tab) => ({
    padding: "12px 24px",
    margin: "0 8px",
    background: activeTab === tab ? "#667eea" : "white",
    color: activeTab === tab ? "white" : "#333",
    border: "2px solid #667eea",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
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
          <h1 style={{ margin: 0, color: "#333" }}>🔧 Admin Dashboard</h1>
          <p style={{ margin: "5px 0 0 0", color: "#666" }}>Welcome, {user.name}!</p>
        </div>
        <button onClick={handleLogout} style={{ padding: "10px 20px", background: "#dc3545", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Logout</button>
      </div>
      
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button style={tabStyle("analytics")} onClick={() => setActiveTab("analytics")}>📊 Analytics</button>
        <button style={tabStyle("users")} onClick={() => setActiveTab("users")}>👥 Manage Users</button>
        <button style={tabStyle("wallets")} onClick={() => setActiveTab("wallets")}>💳 Manage Wallets</button>
        <button style={tabStyle("transactions")} onClick={() => setActiveTab("transactions")}>📋 Transactions</button>
      </div>

      <div style={contentStyle}>
        {activeTab === "analytics" && (
          <div>
            <h2>System Analytics</h2>
            
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ background: "#667eea", color: "white", padding: "1.5rem", borderRadius: "10px", textAlign: "center" }}>
                <h3 style={{ margin: 0, fontSize: "32px" }}>{users.length}</h3>
                <p style={{ margin: "5px 0 0 0" }}>Total Users</p>
              </div>
              <div style={{ background: "#28a745", color: "white", padding: "1.5rem", borderRadius: "10px", textAlign: "center" }}>
                <h3 style={{ margin: 0, fontSize: "32px" }}>{wallets.length}</h3>
                <p style={{ margin: "5px 0 0 0" }}>Total Wallets</p>
              </div>
              <div style={{ background: "#17a2b8", color: "white", padding: "1.5rem", borderRadius: "10px", textAlign: "center" }}>
                <h3 style={{ margin: 0, fontSize: "32px" }}>{transactions.length}</h3>
                <p style={{ margin: "5px 0 0 0" }}>Total Transactions</p>
              </div>
              <div style={{ background: "#ffc107", color: "white", padding: "1.5rem", borderRadius: "10px", textAlign: "center" }}>
                <h3 style={{ margin: 0, fontSize: "32px" }}>₹{wallets.reduce((sum, w) => sum + w.balance, 0).toFixed(0)}</h3>
                <p style={{ margin: "5px 0 0 0" }}>Total Balance</p>
              </div>
            </div>
            
            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
              
              {/* Users by Role Chart */}
              <div style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "10px" }}>
                <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Users by Role</h3>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                  <div style={{ position: "relative", width: "150px", height: "150px" }}>
                    {(() => {
                      const userCount = users.filter(u => u.role === 'USER').length;
                      const adminCount = users.filter(u => u.role === 'ADMIN').length;
                      const total = userCount + adminCount;
                      const userPercent = total > 0 ? (userCount / total) * 100 : 0;
                      return (
                        <>
                          <div style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            background: `conic-gradient(#E43636 0% ${userPercent}%, #dc3545 ${userPercent}% 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold"
                          }}>
                            <div style={{ background: "white", color: "#333", padding: "10px", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {total}
                            </div>
                          </div>
                          <div style={{ marginTop: "10px", textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                              <span style={{ color: "#E43636" }}>● Users: {userCount}</span>
                              <span style={{ color: "#dc3545" }}>● Admins: {adminCount}</span>
                            </div>
                          </div>
                        </>
                      );
                    })()} 
                  </div>
                </div>
              </div>
              
              {/* Transaction Amount Chart */}
              <div style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "10px" }}>
                <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Recent Transactions</h3>
                <div style={{ height: "200px", display: "flex", alignItems: "end", justifyContent: "space-around", padding: "20px 0" }}>
                  {transactions.slice(-8).map((txn, index) => {
                    const maxAmount = Math.max(...transactions.map(t => t.amount));
                    const height = (txn.amount / maxAmount) * 150;
                    return (
                      <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{
                          width: "25px",
                          height: `${height}px`,
                          background: "#28a745",
                          borderRadius: "3px 3px 0 0",
                          marginBottom: "5px",
                          position: "relative"
                        }}>
                          <div style={{
                            position: "absolute",
                            top: "-25px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "10px",
                            color: "#333",
                            whiteSpace: "nowrap"
                          }}>
                            ₹{txn.amount}
                          </div>
                        </div>
                        <span style={{ fontSize: "10px", color: "#666" }}>#{txn.transactionId}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
            </div>
            
            {/* Wallet Balance Distribution */}
            <div style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "10px" }}>
              <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Top Wallets by Balance</h3>
              <div style={{ height: "250px", display: "flex", alignItems: "end", justifyContent: "space-around", padding: "20px 0" }}>
                {wallets.slice(0, 8).map((wallet, index) => {
                  const maxBalance = Math.max(...wallets.map(w => w.balance));
                  const height = maxBalance > 0 ? (wallet.balance / maxBalance) * 180 : 0;
                  return (
                    <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: "30px",
                        height: `${height}px`,
                        background: "#E43636",
                        borderRadius: "3px 3px 0 0",
                        marginBottom: "5px",
                        position: "relative"
                      }}>
                        <div style={{
                          position: "absolute",
                          top: "-25px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "10px",
                          color: "#333",
                          whiteSpace: "nowrap"
                        }}>
                          ₹{wallet.balance.toFixed(0)}
                        </div>
                      </div>
                      <span style={{ fontSize: "10px", color: "#666" }}>W#{wallet.walletId}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        )}
        
        {activeTab === "users" && (
          <div>
            <h2>Manage Users ({users.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>ID</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Email</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Role</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.id}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.name}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.email}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.role}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        <button onClick={() => deleteUser(user.id)} style={{ padding: "6px 12px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === "wallets" && (
          <div>
            <h2>All Wallets ({wallets.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Wallet ID</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Owner</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Email</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Phone</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((wallet) => (
                    <tr key={wallet.walletId}>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{wallet.walletId}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{wallet.ownerName}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{wallet.email}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{wallet.phone}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>₹{wallet.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === "transactions" && (
          <div>
            <h2>All Transactions ({transactions.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Transaction ID</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>From Wallet</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>To Wallet</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Amount</th>
                    <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Date</th>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;