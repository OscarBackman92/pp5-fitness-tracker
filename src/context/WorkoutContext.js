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
    console.log('Workout Reducer Action:', { type: action.type, payload: action.payload });
    
    switch (action.type) {
        case WORKOUT_ACTIONS.SET_WORKOUTS:
            return {
                ...state,
                workouts: action.payload,
                loading: false,
                error: null
            };
        case WORKOUT_ACTIONS.ADD_WORKOUT:
            return {
                ...state,
                workouts: [action.payload, ...state.workouts],
                loading: false,
                error: null
            };
        case WORKOUT_ACTIONS.UPDATE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.map(workout => 
                    workout.id === action.payload.id ? action.payload : workout
                ),
                loading: false,
                error: null
            };
        case WORKOUT_ACTIONS.DELETE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.filter(workout => workout.id !== action.payload),
                loading: false,
                error: null
            };
        case WORKOUT_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: true,
                error: null
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
            console.log('Fetching workouts...');
            const response = await workoutApi.getAll();
            console.log('Raw API response:', response);
            
            // Handle different response structures
            let workoutsData;
            if (Array.isArray(response.data)) {
                workoutsData = response.data;
            } else if (response.data.results) {
                workoutsData = response.data.results;
            } else if (typeof response.data === 'object') {
                workoutsData = [response.data];
            } else {
                workoutsData = [];
            }
            
            console.log('Processed workouts data:', workoutsData);
            
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_WORKOUTS, 
                payload: workoutsData 
            });
            
            return workoutsData;
        } catch (error) {
            console.error('Error fetching workouts:', error);
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
            console.log('Creating workout:', workoutData);
            const response = await workoutApi.create(workoutData);
            console.log('Create workout response:', response);
            
            const newWorkout = response.data;
            
            dispatch({ 
                type: WORKOUT_ACTIONS.ADD_WORKOUT, 
                payload: newWorkout 
            });
            
            // Fetch updated list after creating new workout
            await fetchWorkouts();
            
            return newWorkout;
        } catch (error) {
            console.error('Error creating workout:', error);
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to create workout' 
            });
            throw error;
        }
    }, [fetchWorkouts]);

    const updateWorkout = useCallback(async (id, workoutData) => {
        try {
            dispatch({ type: WORKOUT_ACTIONS.SET_LOADING });
            const response = await workoutApi.update(id, workoutData);
            dispatch({ 
                type: WORKOUT_ACTIONS.UPDATE_WORKOUT, 
                payload: response.data 
            });
            return response.data;
        } catch (error) {
            console.error('Error updating workout:', error);
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to update workout' 
            });
            throw error;
        }
    }, []);

    const deleteWorkout = useCallback(async (id) => {
        try {
            dispatch({ type: WORKOUT_ACTIONS.SET_LOADING });
            await workoutApi.delete(id);
            dispatch({ 
                type: WORKOUT_ACTIONS.DELETE_WORKOUT, 
                payload: id 
            });
        } catch (error) {
            console.error('Error deleting workout:', error);
            dispatch({ 
                type: WORKOUT_ACTIONS.SET_ERROR, 
                payload: error.response?.data?.detail || 'Failed to delete workout' 
            });
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: WORKOUT_ACTIONS.CLEAR_ERROR });
    }, []);

    const value = {
        workouts: state.workouts,
        loading: state.loading,
        error: state.error,
        fetchWorkouts,
        createWorkout,
        updateWorkout,
        deleteWorkout,
        clearError
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