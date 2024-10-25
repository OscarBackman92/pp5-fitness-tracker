import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (username, password) => {
        try {
          const response = await axiosInstance.post('/auth/login/', {
            username,
            password,
          });
          
          if (response.data.key) {
            // Set token in axios defaults for subsequent requests
            axiosInstance.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
            setUser({ username });
            setIsAuthenticated(true);
          }
          return response.data;
        } catch (error) {
          throw error;
        }
      };

    const logout = useCallback(async () => {
        try {
            await axiosInstance.post('/auth/logout/');
            localStorage.removeItem('access_token');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
            // Clear user data even if logout fails
            localStorage.removeItem('access_token');
            setUser(null);
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await axiosInstance.get('/profiles/');
                    setUser(response.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem('access_token');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
