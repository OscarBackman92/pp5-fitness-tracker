import axiosInstance from './api/axiosInstance';
export const profileService = {
    getProfile: () => 
        axiosInstance.get('/profiles/me/'),

    updateProfile: (data) => 
        axiosInstance.put('/profiles/me/', data),

    uploadProfilePicture: (formData) => 
        axiosInstance.post('/profiles/upload-picture/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),

    // Goals endpoints
    getGoals: () => 
        axiosInstance.get('/profiles/goals/'),

    updateGoals: (goals) => 
        axiosInstance.put('/profiles/goals/', { goals }),

    createGoal: (goalData) => 
        axiosInstance.post('/profiles/goals/', goalData),

    deleteGoal: (goalId) => 
        axiosInstance.delete(`/profiles/goals/${goalId}/`),

    // Measurements endpoints
    getMeasurements: () => 
        axiosInstance.get('/profiles/measurements/'),

    updateMeasurements: (measurements) => 
        axiosInstance.put('/profiles/measurements/', { measurements }),

    createMeasurement: (measurementData) => 
        axiosInstance.post('/profiles/measurements/', measurementData),

    deleteMeasurement: (measurementId) => 
        axiosInstance.delete(`/profiles/measurements/${measurementId}/`),

    // History endpoints
    getMeasurementHistory: () => 
        axiosInstance.get('/profiles/measurements/history/'),

    getWeightHistory: () => 
        axiosInstance.get('/profiles/measurements/weight-history/'),

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
        if (config.url.includes('/upload-picture/')) {
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