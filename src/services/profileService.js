import axiosInstance from './api/axiosInstance';

export const profileService = {
    // Profile endpoints
    getProfile: () => 
        axiosInstance.get('/profiles/me/'),

    // Changed from PUT to PATCH for profile updates
    updateProfile: (data) => 
        axiosInstance.patch('/profiles/me/', data),

    uploadProfilePicture: (formData) => 
        axiosInstance.post('/profiles/update_profile_picture/', formData, {
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

    // Settings specific endpoint
    updateSettings: (settingsData) => 
        axiosInstance.patch('/profiles/me/', { settings: settingsData }),
    
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
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        console.log('Request config:', {
            url: config.url,
            method: config.method,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        if (error.response?.status === 405) {
            console.error('Method not allowed. Please check API endpoint configuration.');
        }
        return Promise.reject(error);
    }
);

export default profileService;