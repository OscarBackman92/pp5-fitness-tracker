import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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

export default AuthContext;