import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/auth';
import axiosInstance from '../services/api';
import { tokenService } from '../services/tokenService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(tokenService.isValid());
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            if (response.key) {
                tokenService.setToken(response.key);
                tokenService.setUsername(username);
                setUser({ username });
                setIsAuthenticated(true);
                navigate('/dashboard');
            }
            return response;
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed');
            throw err;
        }
    };

    const logout = useCallback(async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
            throw err;
        }
    }, [navigate]);

    const clearError = () => setError(null);

    useEffect(() => {
        const tokenRefreshInterval = setInterval(async () => {
            try {
                const response = await axiosInstance.post("/auth/token/refresh/");
                tokenService.setToken(response.data.key);
            } catch (err) {
                logout();
            }
        }, 60 * 1000);

        return () => clearInterval(tokenRefreshInterval);
    }, [logout]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axiosInstance.get("/profiles/");
                setUser(data);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                await axiosInstance.get("/profiles/", { validateToken: true });
                setIsAuthenticated(true);
            } catch (err) {
                if (err.response?.status === 401) {
                    logout();
                }
            }
        };

        const token = tokenService.getToken();
        if (token) {
            checkTokenValidity();
        }
    }, [logout]);

    return (
        <AuthContext.Provider 
            value={{
                user,
                error,
                isAuthenticated,
                login,
                logout,
                clearError
            }}
        >
            {children}
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