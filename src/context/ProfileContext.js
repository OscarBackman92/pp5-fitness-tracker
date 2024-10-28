import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { profileService } from '../services/profileService';

const ProfileContext = createContext(null);

const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    SET_GOALS: 'SET_GOALS',
    ADD_GOAL: 'ADD_GOAL',
    UPDATE_GOAL: 'UPDATE_GOAL',
    DELETE_GOAL: 'DELETE_GOAL',
    SET_MEASUREMENTS: 'SET_MEASUREMENTS',
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
            
        case ACTIONS.SET_GOALS:
            return {
                ...state,
                goals: action.payload,
                loading: false,
                error: null
            };
            
        case ACTIONS.ADD_GOAL:
            return {
                ...state,
                goals: [...state.goals, action.payload],
                loading: false,
                error: null
            };
            
        case ACTIONS.UPDATE_GOAL:
            return {
                ...state,
                goals: state.goals.map(goal => 
                    goal.id === action.payload.id ? action.payload : goal
                ),
                loading: false,
                error: null
            };
            
        case ACTIONS.DELETE_GOAL:
            return {
                ...state,
                goals: state.goals.filter(goal => goal.id !== action.payload),
                loading: false,
                error: null
            };
            
        case ACTIONS.SET_MEASUREMENTS:
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
                type: ACTIONS.SET_GOALS, 
                payload: goalsResponse.data 
            });
            dispatch({ 
                type: ACTIONS.SET_MEASUREMENTS, 
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

    const fetchGoals = useCallback(async () => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const response = await profileService.getGoals();
            dispatch({ 
                type: ACTIONS.SET_GOALS, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching goals:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to fetch goals' 
            });
            throw error;
        }
    }, []);

    const addGoal = useCallback(async (goalData) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            const response = await profileService.createGoal(goalData);
            dispatch({ 
                type: ACTIONS.ADD_GOAL, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            console.error('Error adding goal:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to add goal' 
            });
            throw error;
        }
    }, []);

    const deleteGoal = useCallback(async (goalId) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING });
            await profileService.deleteGoal(goalId);
            dispatch({ 
                type: ACTIONS.DELETE_GOAL, 
                payload: goalId 
            });
        } catch (error) {
            console.error('Error deleting goal:', error);
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to delete goal' 
            });
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_ERROR });
    }, []);

    // Initialize profile data
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
        fetchGoals,
        addGoal,
        deleteGoal,
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