import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'customer' | 'employee' | null;

interface User {
  id: string;
  name: string;
  accountNumber?: string;
  role: UserRole;
  idNumber?: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  register: (userData: Partial<User>) => void;
}

const initialUser: User = {
  id: '',
  name: '',
  accountNumber: '',
  role: null,
  idNumber: '',
  isAuthenticated: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);

  const login = (userData: Partial<User>) => {
    setUser({
      ...user,
      ...userData,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser(initialUser);
  };

  const register = (userData: Partial<User>) => {
    // In a real app, this would make an API call to register the user
    // For now, we'll just set the state directly
    const newUser: User = {
      ...initialUser,
      ...userData,
      id: crypto.randomUUID(),
      isAuthenticated: true,
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};