import axios from 'axios';

const API_URL = 'https://localhost:7231';

export const registerCustomer = async (customerData: any) => {
  return axios.post(`${API_URL}/customer`, customerData);
};

export const fetchStaff = async () => {
  return axios.get(`${API_URL}/staff`);
};

export const fetchTransactions = async (id:any) => {
  return axios.get(`${API_URL}/Transaction/` + id);
};

export const fetchAllTransactions = async () => {
  return axios.get(`${API_URL}/Transaction/Transactions/`);
};

export const verifyTransaction = async  (id:any) => {
  return axios.get(`${API_URL}/Transaction/Verify/` + id);
};

export const createTransaction = async (transactionData: any) => {
  return axios.post(`${API_URL}/Transaction`, transactionData);
};

export default { registerCustomer, fetchStaff, fetchTransactions, createTransaction };

