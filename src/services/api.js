import axios from 'axios';

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
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;