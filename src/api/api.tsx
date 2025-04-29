import axios from 'axios';

const API_URL = 'https://localhost:7231';

export const registerCustomer = async (customerData: any) => {
  return axios.post(`${API_URL}/customer`, customerData);
};

export const fetchStaff = async () => {
  return axios.get(`${API_URL}/staff`);
};

export const fetchTransactions = async (id: any) => {
  return axios.get(`${API_URL}/Transaction/` + id);
};

export const fetchCurrentTransaction = async (id: any) => {
  return axios.get(`${API_URL}/Transaction/CurrentTransaction/` + id);
};

export const fetchAllTransactions = async () => {
  return axios.get(`${API_URL}/Transaction/Transactions/`);
};

export const verifyTransaction = async (id: any) => {
  return axios.get(`${API_URL}/Transaction/Verify/` + id);
};

export const createTransaction = async (transactionData: any) => {
  return axios.post(`${API_URL}/Transaction`, transactionData);
};

export const fetchCurrentUser = async (employeeId: any) => {
  return axios.get(`${API_URL}/User/current-user/` + employeeId);
};

export const loginUser = async (loginData: { employeeId: string; password: string; name: string; role: string }) => {
  return axios.post(`${API_URL}/User/login`, loginData);
};

// Logout staff user
export const logoutUser = async (employeeId: any) => {
  return axios.post(`${API_URL}/User/logout`, employeeId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const fetchCurrentCustomer = async (customerId: any) => {
  return axios.get(`${API_URL}/User/current-customer/` + customerId);
};

// Login customer user
export const loginCustomer = async (loginData: { fullName:string, accountNumber: string; password: string; idNumber: string; role: string, userName: string, isAuthenticated : any }) => {
  return axios.post(`${API_URL}/User/customer-login`, loginData);
};

// Logout customer user (correct endpoint now)
export const logoutCustomer = async (customerId: any) => {
  return axios.post(`${API_URL}/User/customer-logout`, customerId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Fixed default export including all APIs
export default { 
  registerCustomer, 
  fetchStaff, 
  fetchTransactions, 
  fetchCurrentTransaction,
  fetchAllTransactions,
  verifyTransaction, 
  createTransaction,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  loginCustomer,
  logoutCustomer,
  fetchCurrentCustomer
};
