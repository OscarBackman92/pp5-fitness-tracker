import api from './api';

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts/');
    return response.data;  // Return only the data part
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const getWorkoutDetails = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}/`);
    return response;
  } catch (error) {
    console.error('Error fetching workout details:', error);
    throw error;
  }
};

export const createWorkout = async (workoutData) => {
  try {
    const response = await api.post('/workouts/', workoutData);
    return response;
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};

export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await api.put(`/workouts/${id}/`, workoutData);
    return response;
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

export const getWorkoutSummary = async () => {
  try {
    const response = await api.get('/workouts/summary/');
    return response;
  } catch (error) {
    console.error('Error fetching workout summary:', error);
    throw error;
  }
};

export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`/workouts/${id}/`);
    return response;
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};