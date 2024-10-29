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

    register: async (userData) => {
        try {
            const formattedData = {
                username: userData.username,
                email: userData.email,
                password: userData.password1,
                password2: userData.password2
            };
            console.log('Sending registration data:', formattedData);
            return await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, formattedData);
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            if (error.response?.data?.password) {
                throw new Error(`Password error: ${error.response.data.password.join(', ')}`);
            }
            throw error;
        }
    },

    logout: () => axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT)
};

export const profileApi = {
    getMe: () => {
        console.log('Getting profile from:', API_ENDPOINTS.PROFILES.ME);
        return axiosInstance.get(API_ENDPOINTS.PROFILES.ME);
    },
    updateMe: (data) => axiosInstance.put(API_ENDPOINTS.PROFILES.ME, data)
};