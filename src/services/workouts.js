// workouts.js
import api from './api';

// Fetch all workouts
export const getWorkouts = async () => {
    try {
        const response = await api.get('/workouts/');
        return response.data;
    } catch (error) {
        console.error('Error fetching workouts:', error.response?.data || error);
        throw error;
    }
};

// Fetch details of a specific workout
export const getWorkoutDetails = async (id) => {
    try {
        const response = await api.get(`/workouts/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching workout details:', error.response?.data || error);
        throw error;
    }
};

// Create a new workout
export const createWorkout = async (workoutData) => {
  const token = localStorage.getItem('access_token');
  console.log('Access Token:', token); // Log the access token for debugging
  try {
      const response = await api.post('/workouts/', workoutData, {
          headers: {
              Authorization: `Bearer ${token}`, // Ensure the token is included
          },
      });
      return response.data; // Return the response data if successful
  } catch (error) {
      console.error('Error creating workout:', error.response?.data || error);
      throw error; // Rethrow the error for further handling in the component
  }
};

// Update an existing workout
export const updateWorkout = async (id, workoutData) => {
    try {
        const response = await api.put(`/workouts/${id}/`, workoutData);
        return response.data;
    } catch (error) {
        console.error('Error updating workout:', error.response?.data || error);
        throw error;
    }
};

// Fetch summary of workouts
export const getWorkoutSummary = async () => {
    try {
        const response = await api.get('/workouts/summary/');
        console.log('Raw API response:', response); // Log the API response
        return response.data;
    } catch (error) {
        console.error('Error fetching workout summary:', error.response?.data || error);
        throw error;
    }
};

// Delete a workout
export const deleteWorkout = async (id) => {
    try {
        const response = await api.delete(`/workouts/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting workout:', error.response?.data || error);
        throw error;
    }
};
