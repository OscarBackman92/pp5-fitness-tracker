// src/services/api/axiosInstance.js
import axios from 'axios';
import { API_URL } from './config';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('Request:', {
                url: config.url,
                method: config.method,
                headers: config.headers,
                data: config.data
            });
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('Response:', {
                url: response.config.url,
                status: response.status,
                data: response.data
            });
        }
        return response;
    },
    (error) => {
        if (process.env.NODE_ENV === 'development') {
            console.error('Response Error:', {
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data
            });
        }

        if ((error.response?.status === 403 || error.response?.status === 401) 
            && !error.config.url.includes('logout')) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;