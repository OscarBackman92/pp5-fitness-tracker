import React, { createContext, useContext, useEffect, useState } from 'react';
import authApi from '../services/api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
