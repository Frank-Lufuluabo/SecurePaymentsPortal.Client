import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchCurrentCustomer, fetchCurrentUser } from '../api';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'customer' | 'employee';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const employeeId = localStorage.getItem('employeeId');
        const customerId = localStorage.getItem('customerId');
        const token = localStorage.getItem('authToken');

        console.log('ProtectedRoute checking auth:', { employeeId, customerId, token: !!token, requiredRole: role });

        if (!token) {
          console.log('No token found, redirecting to login');
          setIsAuthenticated(false);
          return;
        }

        let response, user;

        if (role === 'employee' && employeeId) {
          console.log('Fetching employee data for:', employeeId);
          response = await fetchCurrentUser(employeeId);
          user = response?.data;
          console.log('Employee data:', user);
        } else if (role === 'customer' && customerId) {
          console.log('Fetching customer data for:', customerId);
          response = await fetchCurrentCustomer(customerId);
          user = response?.data;
          console.log('Customer data:', user);
        } else {
          console.log('No matching ID found for role:', role);
          setIsAuthenticated(false);
          return;
        }

        if (!user) {
          console.log('No user data returned');
          setIsAuthenticated(false);
          return;
        }

        const userIsAuthenticated = user?.isAuthenticated !== false;
        const userRoleMatches = (role === 'employee' && user.role === 'staff') || (role === 'customer' && user.role === 'customer');

        console.log('Auth check results:', {
          userIsAuthenticated,
          userRoleMatches,
          userRole: user.role,
          requiredRole: role
        });

        setIsAuthenticated(userIsAuthenticated);
        setUserRole(user.role === 'staff' ? 'employee' : user.role);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        // Clear invalid tokens
        localStorage.removeItem('authToken');
        localStorage.removeItem('employeeId');
        localStorage.removeItem('customerId');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [role]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2463] mx-auto mb-2"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to={role === 'customer' ? '/customer/login' : '/employee/login'} replace />;
  }

  if (userRole && userRole !== role) {
    console.log('Role mismatch, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('Authentication successful, rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;