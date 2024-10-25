import axios from 'axios';
import { tokenService } from './tokenService';  // Changed to named import

const baseURL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com/api';

const axiosInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = tokenService.getToken();
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        console.log('Request Config:', {
            url: config.url,
            method: config.method,
            headers: config.headers
        });
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    async (error) => {
        console.error('Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            token: tokenService.getToken()
        });

        if (error.response?.status === 403) {
            tokenService.clearAll();
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;