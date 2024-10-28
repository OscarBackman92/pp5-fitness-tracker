import axiosInstance from './api/axiosInstance';

export const profileService = {
    // Profile endpoints
    getProfile: () => 
        axiosInstance.get('/profiles/me/'),

    updateProfile: (data) => 
        axiosInstance.put('/profiles/me/', data),

    uploadProfilePicture: (formData) => 
        axiosInstance.put('/profiles/update_profile_picture/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),

    // Goals endpoints
    getGoals: () => 
        axiosInstance.get('/goals/'),

    createGoal: (goalData) => 
        axiosInstance.post('/goals/', goalData),

    updateGoal: (goalId, goalData) => 
        axiosInstance.patch(`/goals/${goalId}/`, goalData),

    deleteGoal: (goalId) => 
        axiosInstance.delete(`/goals/${goalId}/`),

    // Utility endpoints
    calculateBMI: () => 
        axiosInstance.get('/profiles/calculate-bmi/'),

    getProgressReport: (startDate, endDate) => 
        axiosInstance.get('/profiles/progress-report/', {
            params: { start_date: startDate, end_date: endDate }
        })
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (config.url.includes('update_profile_picture')) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default profileService;