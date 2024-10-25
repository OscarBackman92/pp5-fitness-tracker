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
            config.headers['Authorization'] = `Token ${token}`;
            console.log('Request config:', {
                url: config.url,
                headers: config.headers
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
    (response) => response,
    (error) => {
        console.error('Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data
        });

        if ((error.response?.status === 403 || error.response?.status === 401) 
            && !error.config.url.includes('login') 
            && !error.config.url.includes('logout')) {
            console.error('Auth Error - Token:', localStorage.getItem('access_token'));
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;