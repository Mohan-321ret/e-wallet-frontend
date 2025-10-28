import axios from 'axios';

// 🔹 Base API URL (manual or via .env)
const BASE_URL =
  process.env.REACT_APP_BASE_API_URL || "https://e-wallet-backend-e6gf.onrender.com";

// ------------------------------------------------------------
// 🔹 AUTH APIs
// ------------------------------------------------------------
export const authAPI = {
  login: (data) => axios.post(`${BASE_URL}/auth/login`, data, {
    headers: { 'Content-Type': 'application/json' },
  }),
  register: (data) => axios.post(`${BASE_URL}/auth/register`, data, {
    headers: { 'Content-Type': 'application/json' },
  }),
  test: () => axios.get(`${BASE_URL}/auth/test`),
};

// ------------------------------------------------------------
// 🔹 WALLET APIs
// ------------------------------------------------------------
export const walletAPI = {
  addWallet: (data) => axios.post(`${BASE_URL}/addWallet`, data, {
    headers: { 'Content-Type': 'application/json' },
  }),
  topUp: (data) => axios.post(`${BASE_URL}/topUp`, data, {
    headers: { 'Content-Type': 'application/json' },
  }),
  transferFunds: (data) => axios.post(`${BASE_URL}/transferFunds`, data, {
    headers: { 'Content-Type': 'application/json' },
  }),
  getWalletsByEmail: (email) => axios.get(`${BASE_URL}/getWalletsByEmail/${email}`),
};

// ------------------------------------------------------------
// 🔹 TRANSACTION APIs
// ------------------------------------------------------------
export const transactionAPI = {
  getAllTransactions: () => axios.get(`${BASE_URL}/getAllTransactions`),
};

// ------------------------------------------------------------
// 🔹 TEST APIs
// ------------------------------------------------------------
export const testAPI = {
  getUsers: () => axios.get(`${BASE_URL}/test/users`),
  getWallets: () => axios.get(`${BASE_URL}/test/wallets`),
  getWalletsByEmail: (email) => axios.get(`${BASE_URL}/test/wallets/${email}`),
  deleteUser: (id) => axios.delete(`${BASE_URL}/test/delete-user/${id}`),
  clearUsers: () => axios.delete(`${BASE_URL}/test/clear-users`),
};

// ------------------------------------------------------------
// 🔹 ADMIN APIs
// ------------------------------------------------------------
export const adminAPI = {
  createAdmin: () => axios.get(`${BASE_URL}/admin/create-admin`),
};
