import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './config';

export const workoutApi = {
    getAll: () => axiosInstance.get(API_ENDPOINTS.WORKOUTS.LIST),
    getById: (id) => axiosInstance.get(API_ENDPOINTS.WORKOUTS.DETAIL(id)),
    create: (data) => axiosInstance.post(API_ENDPOINTS.WORKOUTS.LIST, data),
    update: (id, data) => axiosInstance.put(API_ENDPOINTS.WORKOUTS.UPDATE(id), data),
    delete: (id) => axiosInstance.delete(API_ENDPOINTS.WORKOUTS.DELETE(id))
};

export const authApi = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
            if (response.data?.key) {
                localStorage.setItem('access_token', response.data.key);
                axiosInstance.defaults.headers['Authorization'] = `Token ${response.data.key}`;
            }
            return response;
        } catch (error) {
            console.error('Login error:', error.response?.data);
            throw error;
        }
    },
    logout: () => axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT),
};

export const profileApi = {
    getMe: () => {
        console.log('Getting profile from:', API_ENDPOINTS.PROFILES.ME);
        return axiosInstance.get(API_ENDPOINTS.PROFILES.ME);
    },
    updateMe: (data) => axiosInstance.put(API_ENDPOINTS.PROFILES.ME, data)
};