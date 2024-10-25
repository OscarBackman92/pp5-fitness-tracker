import axiosInstance from './api';
import { tokenService } from './tokenService';

const login = async (username, password) => {
    try {
        const response = await axiosInstance.post(`/auth/login/`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw error;
    }
};

const logout = async () => {
    if (tokenService.isValid()) {
        try {
            await axiosInstance.post(`/auth/logout/`);
            tokenService.clearAll();
        } catch (error) {
            console.error('Logout error:', error.response?.data || error);
            throw error;
        }
    }
};

const updateUserProfile = async (profileData) => {
    try {
        const response = await axiosInstance.put(`/profiles/me/`, profileData);
        return response.data;
    } catch (error) {
        console.error('Profile update error:', error.response?.data || error);
        throw error;
    }
};

export {
    login,
    logout,
    updateUserProfile
};