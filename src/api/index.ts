// Import both APIs
import * as realApi from './api';


// Choose which API to use
const selectedApi = realApi;

// Re-export all functions from the selected API
export const registerCustomer = selectedApi.registerCustomer;
export const fetchCustomerDetails = selectedApi.fetchCustomerDetails;
export const fetchStaff = selectedApi.fetchStaff;
export const fetchTransactions = selectedApi.fetchTransactions;
export const fetchCurrentTransaction = selectedApi.fetchCurrentTransaction;
export const fetchAllTransactions = selectedApi.fetchAllTransactions;
export const fetchStaffTransaction = selectedApi.fetchStaffTransaction;
export const verifyTransaction = selectedApi.verifyTransaction;
export const createTransaction = selectedApi.createTransaction;
export const fetchCurrentUser = selectedApi.fetchCurrentUser;
export const loginUser = selectedApi.loginUser;
export const logoutUser = selectedApi.logoutUser;
export const loginCustomer = selectedApi.loginCustomer;
export const logoutCustomer = selectedApi.logoutCustomer;
export const fetchCurrentCustomer = selectedApi.fetchCurrentCustomer;

// Export the default as well
export default selectedApi.default || selectedApi;