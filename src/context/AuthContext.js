// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, profileApi } from '../services/api/apiService';
import axiosInstance from '../services/api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            setError(null);
            const response = await authApi.login({ username, password });
            
            if (response.data?.key) {
                const token = response.data.key;
                localStorage.setItem('access_token', token);
                axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
                
                // Get user profile after successful login
                const userProfile = await profileApi.getMe();
                setUser(userProfile.data);
                setIsAuthenticated(true);
                return response.data;
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.detail || 'Login failed');
            throw error;
        }
    };

    const logout = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                await authApi.logout();
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            delete axiosInstance.defaults.headers.common['Authorization'];
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
                const userProfile = await profileApi.getMe();
                setUser(userProfile.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('access_token');
                delete axiosInstance.defaults.headers.common['Authorization'];
                setUser(null);
                setIsAuthenticated(false);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        checkAuth
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