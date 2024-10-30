import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        console.log('Current Token:', token); // Log the token
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
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
