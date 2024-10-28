import axiosInstance from './api/axiosInstance';

export const profileService = {
    // Profile endpoints
    getProfile: () => 
        axiosInstance.get('/profiles/me/'),

    // Main profile update
    updateProfile: (data) => 
        axiosInstance.put('/profiles/me/', data),

    // Settings update - using PUT instead of PATCH
    updateSettings: (settingsData) => 
        axiosInstance.put('/profiles/me/', { settings: settingsData }),

    // Profile picture upload
    uploadProfilePicture: (formData) => 
        axiosInstance.post('/profiles/update_profile_picture/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 405) {
            console.error('Method not allowed. Endpoint accepts:', 
                error.response.headers?.['allow'] || 'unknown methods');
        }
        return Promise.reject(error);
    }
);

export default profileService;