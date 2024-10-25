import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, profileApi } from '../services/api/apiService';
import { tokenService } from '../services/tokenService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await authApi.login({ username, password });
            if (response.data.key) {
                tokenService.setToken(response.data.key);
                setUser({ username });
                setIsAuthenticated(true);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            tokenService.clearAll();
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const checkAuth = async () => {
            if (tokenService.isValid()) {
                try {
                    const response = await profileApi.getAll();
                    setUser(response.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    tokenService.clearAll();
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
        loading,
        login,
        logout
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