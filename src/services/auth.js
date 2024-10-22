import api from './api';

const login = async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });

    // Assuming 'key' is what needs to be stored in place of 'access'
    if (response.data.key) {
        localStorage.setItem('access_token', response.data.key); // Store 'key' as 'access_token'

        // If there's a refresh token, store it as well (if your API supports this)
        if (response.data.refresh) {
            localStorage.setItem('refresh_token', response.data.refresh);
        }
    } else {
        throw new Error('Invalid response format');
    }
    return response.data;
};

const register = async (userData) => {
    return await api.post('/auth/register/', userData);
};

const logout = async () => {
    await api.post('/auth/logout/');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const getUserProfile = async () => {
    return await api.get('/profiles/me/');
};

const updateUserProfile = async (profileData) => {
    return await api.put('/profiles/me/', profileData);
};

const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

const getUserInfo = async () => {
    return await api.get('/auth/user/');
};

export {
    login,
    register,
    logout,
    getUserProfile,
    updateUserProfile,
    isAuthenticated,
    getUserInfo
};