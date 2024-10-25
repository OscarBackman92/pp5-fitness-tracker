// src/services/api/apiService.js
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './config';

export const workoutApi = {
    getAll: () => axiosInstance.get(API_ENDPOINTS.WORKOUTS.LIST),
    getById: (id) => axiosInstance.get(API_ENDPOINTS.WORKOUTS.DETAIL(id)),
    create: (data) => axiosInstance.post(API_ENDPOINTS.WORKOUTS.CREATE, data),
    update: (id, data) => axiosInstance.put(API_ENDPOINTS.WORKOUTS.UPDATE(id), data),
    delete: (id) => axiosInstance.delete(API_ENDPOINTS.WORKOUTS.DELETE(id)),
};

export const authApi = {
    login: (credentials) => axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    logout: () => axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT),
    register: (userData) => {
        const formattedData = {
            username: userData.username,
            email: userData.email,
            password: userData.password1,
            password2: userData.password2
        };
        return axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, formattedData);
    },
    refreshToken: () => axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH),
};

export const profileApi = {
    getMe: () => axiosInstance.get(API_ENDPOINTS.PROFILES.ME),
    getById: (id) => axiosInstance.get(API_ENDPOINTS.PROFILES.DETAIL(id)),
    updateMe: (data) => axiosInstance.put(API_ENDPOINTS.PROFILES.ME, data),
    getAll: () => axiosInstance.get(API_ENDPOINTS.PROFILES.LIST),
};