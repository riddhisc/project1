import { useState } from 'react';

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@eventbuddy.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    id: 2,
    username: 'staff',
    email: 'staff@eventbuddy.com',
    password: 'staff123',
    role: 'staff',
    firstName: 'Staff',
    lastName: 'Member'
  }
];

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (credentials) => {
    const { email, password } = credentials;
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      return foundUser;
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: MOCK_USERS.length + 1
    };
    MOCK_USERS.push(newUser);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register
  };
};