import api from './api';

const login = async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
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