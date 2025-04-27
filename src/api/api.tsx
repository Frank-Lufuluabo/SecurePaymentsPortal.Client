import axios from 'axios';

const API_URL = 'https://localhost:7231';

export const registerCustomer = async (customerData: any) => {
  return axios.post(`${API_URL}/customer`, customerData);
};

export const fetchStaff = async () => {
  return axios.get(`${API_URL}/staff`);
};

export const fetchTransactions = async () => {
  return axios.get(`${API_URL}/GetTransactions/`);
};

export const createTransaction = async (transactionData: any) => {
  return axios.post(`${API_URL}/transactions`, transactionData);
};

export default { registerCustomer, fetchStaff, fetchTransactions, createTransaction };

