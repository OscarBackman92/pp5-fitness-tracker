import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { profileService } from '../services/profileService';

const ProfileContext = createContext(null);

const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPDATE_GOALS: 'UPDATE_GOALS',
    UPDATE_MEASUREMENTS: 'UPDATE_MEASUREMENTS',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

const initialState = {
    profile: null,
    goals: [],
    measurements: [],
    loading: false,
    error: null
};

function profileReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case ACTIONS.SET_ERROR:
            return { 
                ...state, 
                error: action.payload, 
                loading: false 
            };
        case ACTIONS.UPDATE_PROFILE:
            return { 
                ...state, 
                profile: action.payload, 
                loading: false,
                error: null
            };
        case ACTIONS.UPDATE_GOALS:
            return { 
                ...state, 
                goals: action.payload, 
                loading: false,
                error: null
            };
        case ACTIONS.UPDATE_MEASUREMENTS:
            return { 
                ...state, 
                measurements: action.payload, 
                loading: false,
                error: null
            };
        case ACTIONS.CLEAR_ERROR:
            return { 
                ...state, 
                error: null 
            };
        default:
            return state;
    }
}

export const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initialState);

    const fetchProfile = useCallback(async () => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const response = await profileService.getProfile();
            dispatch({ 
                type: ACTIONS.UPDATE_PROFILE, 
                payload: response.data 
            });

            // Fetch goals and measurements after profile
            const [goalsResponse, measurementsResponse] = await Promise.all([
                profileService.getGoals(),
                profileService.getMeasurements()
            ]);

            dispatch({ 
                type: ACTIONS.UPDATE_GOALS, 
                payload: goalsResponse.data 
            });
            dispatch({ 
                type: ACTIONS.UPDATE_MEASUREMENTS, 
                payload: measurementsResponse.data 
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to fetch profile' 
            });
            throw error;
        }
    }, []);

    const updateProfile = useCallback(async (profileData) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const response = await profileService.updateProfile(profileData);
            dispatch({ 
                type: ACTIONS.UPDATE_PROFILE, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to update profile' 
            });
            throw error;
        }
    }, []);

    const uploadProfilePicture = useCallback(async (file) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const formData = new FormData();
            formData.append('profile_picture', file);
            
            const response = await profileService.uploadProfilePicture(formData);
            dispatch({ 
                type: ACTIONS.UPDATE_PROFILE, 
                payload: { ...state.profile, profile_picture: response.data.url } 
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to upload profile picture' 
            });
            throw error;
        }
    }, [state.profile]);

    const updateGoals = useCallback(async (goals) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const response = await profileService.updateGoals(goals);
            dispatch({ 
                type: ACTIONS.UPDATE_GOALS, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            console.error('Error updating goals:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to update goals' 
            });
            throw error;
        }
    }, []);

    const updateMeasurements = useCallback(async (measurements) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const response = await profileService.updateMeasurements(measurements);
            dispatch({ 
                type: ACTIONS.UPDATE_MEASUREMENTS, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            console.error('Error updating measurements:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to update measurements' 
            });
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_ERROR });
    }, []);

    // Load profile data when provider mounts
    React.useEffect(() => {
        fetchProfile().catch(console.error);
    }, [fetchProfile]);

    const value = {
        profile: state.profile,
        goals: state.goals,
        measurements: state.measurements,
        loading: state.loading,
        error: state.error,
        fetchProfile,
        updateProfile,
        uploadProfilePicture,
        updateGoals,
        updateMeasurements,
        clearError
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export default ProfileContext;