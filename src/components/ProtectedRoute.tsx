import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchCurrentCustomer, fetchCurrentUser } from './../api/api';

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

        if (!employeeId && !customerId) {
          setIsAuthenticated(false);
          return;
        }
        var response, user;

        if(employeeId){
           response = await fetchCurrentUser(employeeId);
           user = response?.data;
        }
        else if(customerId){
           response = await fetchCurrentCustomer(customerId);
          user = response?.data;
        }

        if(!user)
          return;

        setIsAuthenticated(user?.isAuthenticated);
        setUserRole(user.role);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to={role === 'customer' ? '/customer/login' : '/employee/login'} replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
