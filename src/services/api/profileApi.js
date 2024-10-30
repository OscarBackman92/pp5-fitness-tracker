import axiosInstance from './axiosInstance';

export const profileApi = {
  getMe: () => axiosInstance.get('/profiles/me/'),
  
  updateMe: (data) => axiosInstance.put('/profiles/me/', data),
  
  uploadProfilePicture: (formData) => 
    axiosInstance.put('/profiles/update_profile_picture/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  getGoals: () => axiosInstance.get('/goals/'),
  
  createGoal: (goalData) => axiosInstance.post('/goals/', goalData),
  
  updateGoal: (goalId, goalData) => axiosInstance.patch(`/goals/${goalId}/`, goalData),
  
  deleteGoal: (goalId) => axiosInstance.delete(`/goals/${goalId}/`)
};
