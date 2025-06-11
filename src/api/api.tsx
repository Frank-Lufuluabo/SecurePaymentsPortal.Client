import axios from 'axios';

const API_URL = 'https://localhost:7231'; 

// Create axios instance with interceptors for JWT token handling
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('customerId');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Customer APIs
export const registerCustomer = async (customerData: any) => {
  return apiClient.post('/Customer', customerData);
};

export const fetchCustomerDetails = async (customerId: string) => {
  return apiClient.get(`/Customer/Details/${customerId}`);
};

// Staff APIs
export const fetchStaff = async () => {
  return apiClient.get('/Staff');
};

// Transaction APIs - Customer
export const fetchTransactions = async (customerId: string) => {
  return apiClient.get(`/Transaction/Customer/${customerId}`);
};

export const fetchCurrentTransaction = async (transactionId: string, userId: string) => {
  return apiClient.get(`/Transaction/Customer/Details/id=${transactionId}&userId=${userId}`);
};

export const createTransaction = async (transactionData: any) => {
  return apiClient.post('/Transaction', transactionData);
};

// Transaction APIs - Staff
export const fetchAllTransactions = async () => {
  return apiClient.get('/Transaction/Staff');
};

export const fetchStaffTransaction = async (transactionId: string) => {
  return apiClient.get(`/Transaction/Staff/Details/${transactionId}`);
};

export const verifyTransaction = async (transactionId: string) => {
  return apiClient.post('/Transaction/Staff/Verify', transactionId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// User Authentication APIs
export const loginUser = async (loginData: { userName: string; password: string }) => {
  const response = await apiClient.post('/User/login', loginData);
  
  // Store JWT token if login successful
  if (response.data?.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response;
};

export const logoutUser = async (employeeId: string) => {
  const response = await apiClient.post('/User/logout', employeeId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Clear stored token and user data
  localStorage.removeItem('authToken');
  localStorage.removeItem('employeeId');
  
  return response;
};

export const fetchCurrentUser = async (employeeId: string) => {
  return apiClient.get(`/User/current-user/${employeeId}`);
};

// Customer Authentication APIs
export const loginCustomer = async (loginData: { userName: string; password: string; accountNumber: string }) => {
  const response = await apiClient.post('/User/customer-login', loginData);
  
  // Store JWT token if login successful
  if (response.data?.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response;
};

export const logoutCustomer = async (customerId: string) => {
  const response = await apiClient.post('/User/customer-logout', customerId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Clear stored token and user data
  localStorage.removeItem('authToken');
  localStorage.removeItem('customerId');
  
  return response;
};

export const fetchCurrentCustomer = async (customerId: string) => {
  return apiClient.get(`/User/current-customer/${customerId}`);
};

export default { 
  registerCustomer,
  fetchCustomerDetails,
  fetchStaff, 
  fetchTransactions, 
  fetchCurrentTransaction,
  fetchAllTransactions,
  fetchStaffTransaction,
  verifyTransaction, 
  createTransaction,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  loginCustomer,
  logoutCustomer,
  fetchCurrentCustomer
};