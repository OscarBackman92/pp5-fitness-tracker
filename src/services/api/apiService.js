import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './config';

class ApiService {
    static get(url) {
        return axiosInstance.get(url);
    }

    static post(url, data) {
        return axiosInstance.post(url, data);
    }

    static put(url, data) {
        return axiosInstance.put(url, data);
    }

    static delete(url) {
        return axiosInstance.delete(url);
    }
}

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
    getAll: () => ApiService.get(API_ENDPOINTS.PROFILES.LIST),
};