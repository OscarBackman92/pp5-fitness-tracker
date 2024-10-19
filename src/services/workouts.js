import api from './api';

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts/');
    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const getWorkoutDetails = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout details:', error);
    throw error;
  }
};

export const createWorkout = async (workoutData) => {
  try {
    console.log('Sending workout data:', workoutData);
    const response = await api.post('/workouts/', workoutData);
    return response.data;
  } catch (error) {
    console.error('Error creating workout:', error.response?.data || error.message);
    throw error;
  }
};

export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await api.put(`/workouts/${id}/`, workoutData);
    return response.data;
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

export const getWorkoutSummary = async () => {
  try {
    const response = await api.get('/workouts/summary/');
    console.log('Raw API response:', response); // Add this line
    return response;
  } catch (error) {
    console.error('Error fetching workout summary:', error);
    throw error;
  }
};

export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`/workouts/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};