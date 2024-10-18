import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    const token = response.data.key || response.data.token; // Adjust based on your API response
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

export const logout = async () => {
  try {
    await api.post('auth/logout/');
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Even if the API call fails, we should remove the token
    localStorage.removeItem('authToken');
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};