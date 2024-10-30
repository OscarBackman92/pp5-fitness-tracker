<<<<<<< HEAD
import React, { createContext, useContext, useEffect, useState } from 'react';
import authApi from '../services/api/authApi';
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/api/axiosInstance';
>>>>>>> 7f33bf9 (fix: Implement proper auth flow and error handling)

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
<<<<<<< HEAD

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token); // Update the authentication state based on the token presence
    }, []);

    const login = async (credentials) => {
        await authApi.login(credentials);
        setIsAuthenticated(true); // Set authenticated state on successful login
    };

    const logout = async () => {
        await authApi.logout();
        setIsAuthenticated(false); // Set authenticated state on logout
=======
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await axiosInstance.get('/profiles/me/');
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('access_token');
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/login/', {
                username,
                password
            });
            
            const { key } = response.data;
            localStorage.setItem('access_token', key);
            
            // Get user profile
            const userResponse = await axiosInstance.get('/profiles/me/');
            setUser(userResponse.data);
            setIsAuthenticated(true);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/auth/logout/');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuthStatus
>>>>>>> 7f33bf9 (fix: Implement proper auth flow and error handling)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
<<<<<<< HEAD
    return useContext(AuthContext);
};
=======
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
>>>>>>> 7f33bf9 (fix: Implement proper auth flow and error handling)
