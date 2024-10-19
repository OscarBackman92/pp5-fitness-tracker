import api from './api';

export const getWorkouts = async () => {
  try {
    const response = await api.get('workouts/');
    console.log('Raw workouts response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const createWorkout = async (workoutData) => {
  try {
    console.log('Sending workout data:', workoutData);
    const response = await api.post('workouts/', workoutData);
    console.log('Create workout response:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
}

export const getWorkoutSummary = async () => {
  try {
    const response = await api.get('workouts/summary/');
    console.log('Raw workout summary response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching workout summary:', error);
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