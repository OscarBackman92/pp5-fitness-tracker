import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        console.log('Token found:', token);
        // Make a direct axios call instead of using instance
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/profiles/`,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Profile request successful:', {
            headers: response.config.headers,
            data: response.data
        });

        return response.data;
    } catch (error) {
        console.error('Profile fetch error details:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.config?.headers,
            fullError: error
        });
        throw error;
    }
};

const login = async (username, password) => {
    console.log('Login attempt:', { username, password });
    try {
        const response = await axios.post(`${BASE_URL}/auth/login/`, {
            username,
            password
        });

        console.log('Login response:', response.data);

        if (response.data.key) {
            localStorage.setItem('access_token', response.data.key);
            console.log('Token stored:', response.data.key);
            return response.data;
        }
        throw new Error('Invalid response format');
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const logout = async () => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            await axios.post(`${BASE_URL}/auth/logout/`, null, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
        }
    } finally {
        localStorage.removeItem('access_token');
    }
};

const register = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register/`, userData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

const updateUserProfile = async (profileData) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await axios.put(`${BASE_URL}/profiles/me/`, profileData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Profile update error:', error);
        throw error;
    }
};

const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

export {
    login,
    register,
    logout,
    getUserProfile,
    updateUserProfile,
    isAuthenticated
};