import axiosInstance from './axiosInstance';

export const authApi = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login/', credentials);
            if (response.data?.key) {
                // Store the token
                localStorage.setItem('access_token', response.data.key);
                // Set the default Authorization header
                axiosInstance.defaults.headers['Authorization'] = `Token ${response.data.key}`;
            }
            return response;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error; // Re-throw the error for handling in the calling code
        }
    },

    register: async (userData) => {
        try {
            const formattedData = {
                username: userData.username,
                email: userData.email,
                password: userData.password1,
                password2: userData.password2
            };
            return await axiosInstance.post('/auth/register/', formattedData);
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            throw error;
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout/');
            // Clear the token from localStorage
            localStorage.removeItem('access_token');
            // Clear the default Authorization header
            delete axiosInstance.defaults.headers['Authorization'];
        } catch (error) {
            console.error('Logout error:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default authApi;
