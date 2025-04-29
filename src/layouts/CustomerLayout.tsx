import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Building2, CreditCard, Home, LogOut } from 'lucide-react';
import { fetchCurrentCustomer, logoutCustomer } from '../api/api';

interface CustomerProfile {
  id: number;
  fullName: string;
  accountNumber: string;
}

const CustomerLayout: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      navigate('/');
      return;
    }

    try {
      const response = await fetchCurrentCustomer(customerId);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch customer profile:', error);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
      try {
        await logoutCustomer(customerId);
        localStorage.removeItem('customerId');
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">User not found. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#0A2463] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-[#E6AF2E]" />
            <span className="font-bold text-xl">Global Bank</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-200">Welcome,</p>
              <p className="font-medium">{user.fullName}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <nav className="bg-[#051c4e] py-2">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 md:space-x-4">
              <Link 
                to="/customer/dashboard" 
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#0A2463] transition-colors flex items-center"
              >
                <Home className="h-4 w-4 mr-1.5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/customer/payment" 
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#0A2463] transition-colors flex items-center"
              >
                <CreditCard className="h-4 w-4 mr-1.5" />
                <span>Make Payment</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#051c4e] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Global Bank</h3>
              <p className="text-sm text-gray-300">
                Secure international payments and banking services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help & Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-sm text-gray-300">
                123 Banking Street<br />
                Financial District<br />
                contact@globalbank.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-center text-gray-400">
            © {new Date().getFullYear()} Global Bank. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;