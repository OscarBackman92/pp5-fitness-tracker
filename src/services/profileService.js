import axiosInstance from './api/axiosInstance';

export const profileService = {
    getProfile: () => 
        axiosInstance.get('/profiles/me/'),

    updateProfile: (data) => 
        axiosInstance.put('/profiles/me/', data),

    updateSettings: (settingsData) => 
        axiosInstance.put('/profiles/me/', { settings: settingsData }),

    uploadProfilePicture: (formData) => 
        axiosInstance.put('/profiles/update_profile_picture/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),

    getGoals: () => 
        axiosInstance.get('/goals/'),

    createGoal: (goalData) => 
        axiosInstance.post('/goals/', goalData),

    updateGoal: (goalId, goalData) => 
        axiosInstance.patch(`/goals/${goalId}/`, goalData),

    deleteGoal: (goalId) => 
        axiosInstance.delete(`/goals/${goalId}/`),
    
    calculateBMI: () => 
        axiosInstance.get('/profiles/calculate-bmi/'),

    getProgressReport: (startDate, endDate) => 
        axiosInstance.get('/profiles/progress-report/', {
            params: { start_date: startDate, end_date: endDate }
        })
};

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