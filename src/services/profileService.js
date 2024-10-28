import axiosInstance from './api/axiosInstance';

export const profileService = {
    // Profile endpoints
    getProfile: () => 
        axiosInstance.get('/profiles/me/'),

    updateProfile: (data) => 
        axiosInstance.put('/profiles/me/', data),

    uploadProfilePicture: (formData) => 
        axiosInstance.post('/profiles/update_profile_picture/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),

    // Goals endpoints - Updated to match backend URLs
    getGoals: () => 
        axiosInstance.get('/goals/'),

    updateGoals: (goals) => 
        axiosInstance.put('/goals/', { goals }),

    createGoal: (goalData) => 
        axiosInstance.post('/goals/', goalData),

    deleteGoal: (goalId) => 
        axiosInstance.delete(`/goals/${goalId}/`),

    // Measurements endpoints - Updated to match backend URLs
    getMeasurements: () => 
        axiosInstance.get('/measurements/'),

    updateMeasurements: (measurements) => 
        axiosInstance.put('/measurements/', { measurements }),

    createMeasurement: (measurementData) => 
        axiosInstance.post('/measurements/', measurementData),

    deleteMeasurement: (measurementId) => 
        axiosInstance.delete(`/measurements/${measurementId}/`),

    // History endpoints
    getMeasurementHistory: () => 
        axiosInstance.get('/measurements/history/'),

    getWeightHistory: () => 
        axiosInstance.get('/measurements/weight-history/'),

    // Utility endpoints
    calculateBMI: () => 
        axiosInstance.get('/profiles/calculate-bmi/'),

    getProgressReport: (startDate, endDate) => 
        axiosInstance.get('/profiles/progress-report/', {
            params: { start_date: startDate, end_date: endDate }
        }),

    // Error handler helper
    handleError: (error) => {
        console.error('Profile service error:', error);
        throw error.response?.data?.detail || 'An error occurred';
    }
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