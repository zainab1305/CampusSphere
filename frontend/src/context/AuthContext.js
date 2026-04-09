import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = useCallback((email, password, role) => {
    setLoading(true);
    try {
      // Mock signup - in Level 3, this will call the backend API
      const newUser = {
        id: Date.now().toString(),
        email,
        role, // 'student' or 'college'
        createdAt: new Date(),
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, message: 'Signup successful!' };
    } catch (error) {
      return { success: false, message: 'Signup failed!' };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((email, password) => {
    setLoading(true);
    try {
      // Mock login - in Level 3, this will validate against the backend
      const mockUsers = {
        'student@example.com': { id: '1', email, role: 'student' },
        'college@example.com': { id: '2', email, role: 'college' },
      };

      const foundUser = mockUsers[email];
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: 'Invalid credentials!' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed!' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  const initializeAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    signup,
    login,
    logout,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
