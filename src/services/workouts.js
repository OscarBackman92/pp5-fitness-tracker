import api from './api';

export const getWorkouts = () => {
  return api.get('workouts/');
};

export const createWorkout = (workoutData) => {
  return api.post('workouts/', workoutData);
};

export const getWorkoutSummary = () => {
  return api.get('workouts/summary/');
};