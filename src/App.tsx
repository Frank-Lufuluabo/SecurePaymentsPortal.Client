import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { TransactionProvider } from './contexts/TransactionContext';
import CustomerLayout from './layouts/CustomerLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import HomePage from './pages/HomePage';
import CustomerLogin from './pages/customer/CustomerLogin';
import CustomerRegister from './pages/customer/CustomerRegister';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import PaymentForm from './pages/customer/PaymentForm';
import PaymentConfirmation from './pages/customer/PaymentConfirmation';
import EmployeeLogin from './pages/employee/EmployeeLogin';
import EmployeePortal from './pages/employee/EmployeePortal';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster, ToasterProvider } from './components/ui/Toaster';

function App() {
  return (
    <UserProvider>
      <TransactionProvider>
        <ToasterProvider>
          <Router>
            <Toaster />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              
              {/* Customer routes */}
              <Route path="/customer/login" element={<CustomerLogin />} />
              <Route path="/customer/register" element={<CustomerRegister />} />
              <Route path="/customer" element={<CustomerLayout />}>
                <Route index element={<Navigate to="/customer/dashboard" replace />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute role="customer">
                      <CustomerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="payment" 
                  element={
                    <ProtectedRoute role="customer">
                      <PaymentForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="confirmation" 
                  element={
                    <ProtectedRoute role="customer">
                      <PaymentConfirmation />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Employee routes */}
              <Route path="/employee/login" element={<EmployeeLogin />} />
              <Route 
                path="/employee/portal" 
                element={
                  <ProtectedRoute role="employee">
                    <EmployeeLayout>
                      <EmployeePortal />
                    </EmployeeLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToasterProvider>
      </TransactionProvider>
    </UserProvider>
  );
}

export default App;