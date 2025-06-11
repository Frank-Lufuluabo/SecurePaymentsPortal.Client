import axios from 'axios';

const API_URL = 'http://localhost:5245';

// Add auth token to requests if available
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerCustomer = async (customerData: any) => {
  return axios.post(`${API_URL}/Customer`, customerData);
};

export const fetchStaff = async () => {
  return axios.get(`${API_URL}/Staff`);
};

export const fetchTransactions = async (id: any) => {
  return axios.get(`${API_URL}/Transaction/Customer/${id}`);
};

export const fetchCurrentTransaction = async (id: any, userId: any) => {
  return axios.get(`${API_URL}/Transaction/Customer/Details/id=${id}&userId=${userId}`);
};

export const fetchAllTransactions = async () => {
  return axios.get(`${API_URL}/Transaction/Staff`);
};

export const verifyTransaction = async (id: any) => {
  return axios.post(`${API_URL}/Transaction/Staff/Verify`, id);
};

export const createTransaction = async (transactionData: any) => {
  return axios.post(`${API_URL}/Transaction`, transactionData);
};

export const fetchCurrentUser = async (employeeId: any) => {
  return axios.get(`${API_URL}/User/current-user/${employeeId}`);
};

export const loginUser = async (loginData: any) => {
  const payload = {
    UserName: loginData.employeeId,
    Password: loginData.password
  };
  return axios.post(`${API_URL}/User/login`, payload);
};

// Logout staff user
export const logoutUser = async (employeeId: any) => {
  return axios.post(`${API_URL}/User/logout`, employeeId);
};

export const fetchCurrentCustomer = async (customerId: any) => {
  return axios.get(`${API_URL}/User/current-customer/${customerId}`);
};

// Login customer user
export const loginCustomer = async (loginData: any) => {
  const payload = {
    UserName: loginData.userName,
    Password: loginData.password,
    AccountNumber: loginData.accountNumber
  };
  return axios.post(`${API_URL}/User/customer-login`, payload);
};

// Logout customer user 
export const logoutCustomer = async (customerId: any) => {
  return axios.post(`${API_URL}/User/customer-logout`, customerId);
};

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
