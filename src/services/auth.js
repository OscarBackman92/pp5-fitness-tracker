import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    console.log('Login response:', response.data);
    const token = response.data.access_token || response.data.key;
    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token stored:', token);
    } else {
      console.error('No token received in login response');
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('auth/token/refresh/', { refresh: refreshToken });
    const newToken = response.data.access;
    localStorage.setItem('authToken', newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('auth/logout/');
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const register = async (userData) => {
  try {
    const response = await api.post('auth/register/', userData);
    console.log('Registration response:', response.data);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
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