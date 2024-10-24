// src/services/auth.js

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login/`, {
            username,
            password,
        });
        localStorage.setItem('access_token', response.data.key); // Store the token
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw new Error('Invalid username or password'); // Simplified error message for the user
    }
};

const logout = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        try {
            await axios.post(`${BASE_URL}/auth/logout/`, null, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            localStorage.removeItem('access_token'); // Clear token from local storage
        } catch (error) {
            console.error('Logout error:', error.response?.data || error);
            throw new Error('Logout failed'); // Simplified error message
        }
    }
};

const updateUserProfile = async (profileData) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await axios.put(`${BASE_URL}/profiles/me/`, profileData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Profile update error:', error.response?.data || error);
        throw new Error('Failed to update profile'); // Simplified error message
    }
};

const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

export {
    login,
    logout,
    updateUserProfile,
    isAuthenticated,
};
