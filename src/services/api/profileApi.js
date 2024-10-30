import axiosInstance from './axiosInstance';

export const profileApi = {
    getProfile: async () => {
        try {
            const response = await axiosInstance.get('/profiles/me/');
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error.response?.data || error.message);
            throw error;
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await axiosInstance.put('/profiles/me/', profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default profileApi;
