import api from './api';

export const login = (username, password) => {
  return api.post('auth/login/', { username, password });
};

export const register = (username, email, password) => {
  return api.post('auth/register/', { username, email, password });
};

export const logout = () => {
  return api.post('auth/logout/');
};