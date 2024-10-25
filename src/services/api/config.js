export const API_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login/',
        LOGOUT: '/auth/logout/',
        REGISTER: '/auth/register/',
    },
    WORKOUTS: {
        LIST: '/workouts/',
        DETAIL: (id) => `/workouts/${id}/`,
        CREATE: '/workouts/',
        UPDATE: (id) => `/workouts/${id}/`,
        DELETE: (id) => `/workouts/${id}/`
    },
    PROFILES: {
        ME: '/profiles/me/',
        LIST: '/profiles/',
    }
};