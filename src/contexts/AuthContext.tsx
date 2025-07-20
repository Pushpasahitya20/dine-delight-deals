import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load saved user from localStorage on first load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 Login with backend + JWT token storage
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost/restaurant/login.php', { email, password });
      const { token } = response.data;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const isAdmin = payload.email === 'admin@restaurant.com'; // Example admin check

      const loggedInUser: User = {
        id: payload.id,
        name: payload.full_name,
        email: payload.email,
        isAdmin,
      };

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', token);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Safe Register function
  const register = async (fullName: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost/restaurant/signup.php', {
        full_name: fullName,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", response.data); // For debugging

      const { token } = response.data;

      if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
        throw new Error("Invalid token received from backend.");
      }

      let payload;
      try {
        payload = JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        throw new Error("Failed to parse JWT token payload.");
      }

      const newUser: User = {
        id: payload.id,
        name: payload.full_name,
        email: payload.email,
        isAdmin: false,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
