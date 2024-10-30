import axiosInstance from './axiosInstance';

export const apiService = {
    getData: async (endpoint) => {
        try {
            const response = await axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
            throw error;
        }
    },

    postData: async (endpoint, data) => {
        try {
            const response = await axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error.response?.data || error.message);
            throw error;
        }
    },

    // Add more methods for PUT, DELETE, etc., as needed
};

export default apiService;
