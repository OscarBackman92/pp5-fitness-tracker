import axiosInstance from './axiosInstance';
export { authApi } from './authApi';
export { profileApi } from './profileApi';

export { axiosInstance };

export const workoutApi = {
  getAll: () => axiosInstance.get('/workouts/'),
  getById: (id) => axiosInstance.get(`/workouts/${id}/`),
  create: (data) => axiosInstance.post('/workouts/', data),
  update: (id, data) => axiosInstance.put(`/workouts/${id}/`, data),
  delete: (id) => axiosInstance.delete(`/workouts/${id}/`)
};