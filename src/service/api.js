import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  test: () => api.get('/auth/test'),
};

// Wallet APIs
export const walletAPI = {
  addWallet: (data) => api.post('/addWallet', data),
  topUp: (data) => api.post('/topUp', data),
  transferFunds: (data) => api.post('/transferFunds', data),
  getWalletsByEmail: (email) => api.get(`/getWalletsByEmail/${email}`),
};

// Transaction APIs
export const transactionAPI = {
  getAllTransactions: () => api.get('/getAllTransactions'),
};

// Test APIs
export const testAPI = {
  getUsers: () => api.get('/test/users'),
  getWallets: () => api.get('/test/wallets'),
  getWalletsByEmail: (email) => api.get(`/test/wallets/${email}`),
  deleteUser: (id) => api.delete(`/test/delete-user/${id}`),
  clearUsers: () => api.delete('/test/clear-users'),
};

// Admin APIs
export const adminAPI = {
  createAdmin: () => api.get('/admin/create-admin'),
};

export default api;