import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './config';

class ApiService {
    static async get(url, config = {}) {
        try {
            const response = await axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    static async post(url, data = {}, config = {}) {
        try {
            const response = await axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    static async put(url, data = {}, config = {}) {
        try {
            const response = await axiosInstance.put(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    static async delete(url, config = {}) {
        try {
            const response = await axiosInstance.delete(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    static handleError(error) {
        // Custom error handling
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.detail || 'An error occurred';
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error setting up request');
        }
    }
}

// Example usage:
export const workoutApi = {
    getAll: () => ApiService.get(API_ENDPOINTS.WORKOUTS.LIST),
    getById: (id) => ApiService.get(API_ENDPOINTS.WORKOUTS.DETAIL(id)),
    create: (data) => ApiService.post(API_ENDPOINTS.WORKOUTS.CREATE, data),
    update: (id, data) => ApiService.put(API_ENDPOINTS.WORKOUTS.UPDATE(id), data),
    delete: (id) => ApiService.delete(API_ENDPOINTS.WORKOUTS.DELETE(id)),
};

export const authApi = {
    login: (credentials) => ApiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    logout: () => ApiService.post(API_ENDPOINTS.AUTH.LOGOUT),
    register: (userData) => ApiService.post(API_ENDPOINTS.AUTH.REGISTER, userData),
};

export const profileApi = {
    getMe: () => ApiService.get(API_ENDPOINTS.PROFILES.ME),
    getById: (id) => ApiService.get(API_ENDPOINTS.PROFILES.DETAIL(id)),
    updateMe: (data) => ApiService.put(API_ENDPOINTS.PROFILES.ME, data),
};
