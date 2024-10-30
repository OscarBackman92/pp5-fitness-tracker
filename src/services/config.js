export const API_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login/',
        LOGOUT: '/auth/logout/',
        REGISTER: '/auth/register/',
    },
    PROFILES: {
        ME: '/profiles/me/',
        UPDATE_PROFILE_PICTURE: '/profiles/update_profile_picture/',
        GOALS: '/goals/',
    },
    WORKOUTS: {
        LIST: '/workouts/',
        DETAIL: (id) => `/workouts/${id}/`,
    }
};