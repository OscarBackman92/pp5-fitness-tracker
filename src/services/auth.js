import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    const token = response.data.key || response.data.token;
    localStorage.setItem('authToken', token);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('auth/register/', { username, email, password });
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const refreshToken = async () => {
  try {
    const response = await api.post('auth/token/refresh/');
    const newToken = response.data.token;
    localStorage.setItem('authToken', newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};