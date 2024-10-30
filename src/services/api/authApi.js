import axiosInstance from './axiosInstance';

export const authApi = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login/', credentials);
            if (response.data?.key) {
                localStorage.setItem('access_token', response.data.key);
                axiosInstance.defaults.headers['Authorization'] = `Token ${response.data.key}`;
            }
            return response;
        } catch (error) {
            console.error('Login error:', error.response?.data);
            throw error;
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
            console.error('Registration error:', error.response?.data);
            throw error;
        }
    },

    logout: () => axiosInstance.post('/auth/logout/')
};

export default authApi;