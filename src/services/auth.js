import api from './api';

// Login function to authenticate a user
const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login/', { username, password });

        // Assuming 'key' is what needs to be stored as the access token
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
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Register function to create a new user account
const register = async (userData) => {
    try {
        const response = await api.post('/auth/register/', userData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Logout function to terminate the user's session
const logout = async () => {
    try {
        await api.post('/auth/logout/');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Fetch the authenticated user's profile
const getUserProfile = async () => {
    try {
        const response = await api.get('/profiles/me/');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Update the authenticated user's profile
const updateUserProfile = async (profileData) => {
    try {
        const response = await api.put('/profiles/me/', profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Check if a user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

// Get user information
const getUserInfo = async () => {
    try {
        const response = await api.get('/auth/user/');
        return response.data;
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
};

export {
    login,
    register,
    logout,
    getUserProfile,
    updateUserProfile,
    isAuthenticated,
    getUserInfo,
};
