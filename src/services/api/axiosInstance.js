import axios from 'axios';
import { API_URL } from './config';
import { tokenService } from '../tokenService';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor with error handling
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = tokenService.getToken();
            if (token) {
                config.headers.Authorization = `Token ${token}`;
            }
            
            // Log requests in development
            if (process.env.NODE_ENV === 'development') {
                console.log('API Request:', {
                    url: config.url,
                    method: config.method,
                    data: config.data,
                });
            }
            
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor with comprehensive error handling
axiosInstance.interceptors.response.use(
    (response) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', {
                url: response.config.url,
                status: response.status,
                data: response.data,
            });
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Log errors in development
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', {
                url: originalRequest.url,
                status: error.response?.status,
                data: error.response?.data,
            });
        }

        // Handle different error scenarios
        if (error.response) {
            switch (error.response.status) {
                case 401: // Unauthorized
                    if (!originalRequest._retry && tokenService.getToken()) {
                        originalRequest._retry = true;
                        // You could implement token refresh here if needed
                        tokenService.clearAll();
                        window.dispatchEvent(new CustomEvent('auth-error', {
                            detail: 'Session expired'
                        }));
                    }
                    break;

                case 403: // Forbidden
                    tokenService.clearAll();
                    window.dispatchEvent(new CustomEvent('auth-error', {
                        detail: 'Access denied'
                    }));
                    break;

                case 404: // Not Found
                    console.error('Resource not found:', originalRequest.url);
                    break;

                case 500: // Server Error
                    console.error('Server error:', error.response.data);
                    break;

                default:
                    console.error('API error:', error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Error in request configuration
            console.error('Request configuration error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;