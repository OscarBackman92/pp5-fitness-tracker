import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { workoutApi } from '../services/api/apiService';

const WORKOUT_ACTIONS = {
    SET_WORKOUTS: 'SET_WORKOUTS',
    ADD_WORKOUT: 'ADD_WORKOUT',
    UPDATE_WORKOUT: 'UPDATE_WORKOUT',
    DELETE_WORKOUT: 'DELETE_WORKOUT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

const initialState = {
    workouts: [],
    loading: false,
    error: null
};

function workoutReducer(state, action) {
    switch (action.type) {
        case WORKOUT_ACTIONS.SET_WORKOUTS:
            return {
                ...state,
                workouts: action.payload,
                loading: false
            };
        case WORKOUT_ACTIONS.ADD_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload],
                loading: false
            };
        case WORKOUT_ACTIONS.UPDATE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.map(workout => 
                    workout.id === action.payload.id ? action.payload : workout
                ),
                loading: false
            };
        case WORKOUT_ACTIONS.DELETE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.filter(workout => workout.id !== action.payload),
                loading: false
            };
        case WORKOUT_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case WORKOUT_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case WORKOUT_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, initialState);

    const fetchWorkouts = useCallback(async () => {
        try {
            dispatch({ type: WORKOUT_ACTIONS.SET_LOADING });
            const response = await workoutApi.getAll();
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_WORKOUTS, 
                payload: response.data.results || [] 
            });
        } catch (error) {
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to fetch workouts' 
            });
            throw error;
        }
    }, []);

    const createWorkout = useCallback(async (workoutData) => {
        try {
            dispatch({ type: WORKOUT_ACTIONS.SET_LOADING });
            const response = await workoutApi.create(workoutData);
            dispatch({ 
                type: WORKOUT_ACTIONS.ADD_WORKOUT, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to create workout' 
            });
            throw error;
        }
    }, []);

    const value = {
        workouts: state.workouts,
        loading: state.loading,
        error: state.error,
        fetchWorkouts,
        createWorkout
    };

    return (
        <WorkoutContext.Provider value={value}>
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkouts = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
};
