import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    console.log('Login response:', response.data);
    const token = response.data.access_token || response.data.key;
    if (token) {
      localStorage.setItem('authToken', token);
      if (response.data.refresh_token) {
        localStorage.setItem('refreshToken', response.data.refresh_token);
      }
      console.log('Token stored:', token);
    } else {
      console.error('No token received in login response');
    }
    return response;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await api.post('auth/token/refresh/', { refresh: refreshToken });
    const newToken = response.data.access;
    localStorage.setItem('authToken', newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      await api.post('auth/logout/', null, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
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
    // Ensure userData is an object, not a string
    if (typeof userData === 'string') {
      userData = JSON.parse(userData);
    }

    const response = await api.post('auth/register/', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Registration response:', response.data);
    return response;
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Registration error:', error.response?.data || error.message);
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        console.error('Specific errors:', error.response.data.errors);
        if (error.response.data.errors.non_field_errors) {
          console.error('Non-field errors:', error.response.data.errors.non_field_errors);
        }
      }
      if (error.response.data.message) {
        console.error('Error message:', error.response.data.message);
      }
    }
    throw error;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/user/profile/', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};


export const getUserInfo = async () => {
  try {
    console.log('Attempting to fetch user info from:', `${process.env.REACT_APP_API_URL}user/info/`);
    const response = await api.get('user/info/');
    console.log('User info response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config
    });
    throw error;
  }
};