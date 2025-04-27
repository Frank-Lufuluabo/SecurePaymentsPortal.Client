import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Building2, LogOut, ShieldCheck } from 'lucide-react';

interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#0A2463] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-[#E6AF2E]" />
            <span className="font-bold text-xl">Global Bank</span>
            <span className="bg-[#E6AF2E] text-[#0A2463] text-xs font-bold px-2 py-0.5 rounded-md ml-2 flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1" />
              STAFF
            </span>
          </Link>
          
          {user.isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <p className="text-sm text-gray-200">Staff Member</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#051c4e] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Global Bank - Staff Portal. All rights reserved.</p>
          <p className="text-xs mt-1 text-gray-400">
            Authorized access only. All activities are monitored and logged.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeLayout;