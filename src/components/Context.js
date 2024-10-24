import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/auth';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            if (response.key) {
                localStorage.setItem('access_token', response.key);
                localStorage.setItem('username', username);
                setUser({ username });
                setIsAuthenticated(true);
                navigate('/dashboard'); // Redirect to dashboard after login
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
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login'); // Redirect to login after logout
        } catch (err) {
            console.error('Logout error:', err);
            throw err;
        }
    }, [navigate]); // Add navigate to dependencies

    const clearError = () => setError(null);

    useEffect(() => {
        const tokenRefreshInterval = setInterval(async () => {
            try {
                const response = await axios.post("/auth/token/refresh/");
                localStorage.setItem('access_token', response.data.key);
            } catch (err) {
                logout(); // Logout if refreshing the token fails
            }
        }, 60 * 1000); // Refresh token every minute

        return () => clearInterval(tokenRefreshInterval);
    }, [logout]); // Use logout from useCallback

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get("/profiles/");
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
                await axios.get("/profiles/", { validateToken: true });
                setIsAuthenticated(true);
            } catch (err) {
                if (err.response?.status === 401) {
                    logout(); // Call logout if token is invalid
                }
            }
        };

        checkTokenValidity();
    }, [logout]); // Use logout from useCallback

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
