import React, { createContext, useState, useEffect } from 'react';
import { login, logout, verifyToken } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await verifyToken(token);
          setCurrentUser(userData);
        } catch (err) {
          localStorage.removeItem('token');
          setError('Session expired. Please login again.');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const { token, user } = await login(credentials);
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
