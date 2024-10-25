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
            // Use Django REST framework token format
            config.headers['Authorization'] = `Token ${token}`;
            console.log('Request config:', {
                url: config.url,
                fullUrl: `${config.baseURL}${config.url}`,
                headers: config.headers,
                method: config.method
            });
        } else {
            console.log('No token available for request');
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
            status: error.response?.status,
            data: error.response?.data,
            headers: error.config?.headers,
            url: error.config?.url
        });

        if (error.response?.status === 403 || error.response?.status === 401) {
            console.error('Auth Error - Current token:', localStorage.getItem('access_token'));
            // Don't automatically redirect or clear token
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;