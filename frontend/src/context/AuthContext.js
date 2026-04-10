import React, { createContext, useState, useCallback } from 'react';
import apiClient, { setApiAuthToken } from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = useCallback(async (email, password, role) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post('/auth/signup', {
        email,
        password,
        role,
      });

      setApiAuthToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { success: true, message: data.message || 'Signup successful!' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Signup failed!',
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (!data?.user) {
        return { success: false, message: 'Invalid credentials!' };
      }

      setApiAuthToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { success: true, message: data.message || 'Login successful!' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed!',
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setApiAuthToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const initializeAuth = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setApiAuthToken(storedToken);
    }

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
