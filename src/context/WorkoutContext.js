import React, { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react';
import axiosInstance from '../services/api/axiosInstance';

const WorkoutContext = createContext(null);

const initialState = {
  workouts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_WORKOUTS: 'SET_WORKOUTS',
  SET_ERROR: 'SET_ERROR',
  UPDATE_WORKOUT: 'UPDATE_WORKOUT',
  DELETE_WORKOUT: 'DELETE_WORKOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_PAGE: 'SET_PAGE',
  SET_HAS_MORE: 'SET_HAS_MORE'
};

const workoutReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true, error: null };
    
    case ACTIONS.SET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload.page === 1 
          ? action.payload.workouts 
          : [...state.workouts, ...action.payload.workouts],
        loading: false,
        error: null,
        hasMore: action.payload.hasMore
      };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.UPDATE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.map(workout => 
          workout.id === action.payload.id ? action.payload : workout
        ),
        loading: false
      };
    
    case ACTIONS.DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout.id !== action.payload),
        loading: false
      };
    
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    
    case ACTIONS.SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const fetchWorkouts = useCallback(async (page = 1) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING });
      const response = await axiosInstance.get('/workouts/', {
        params: { page, page_size: 10 }
      });
      
      dispatch({
        type: ACTIONS.SET_WORKOUTS,
        payload: {
          workouts: response.data.results || [],
          hasMore: !!response.data.next,
          page
        }
      });
    } catch (error) {
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: error.response?.data?.detail || 'Failed to fetch workouts' 
      });
      throw error;
    }
  }, []);

  const createWorkout = useCallback(async (workoutData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING });
      const response = await axiosInstance.post('/workouts/', workoutData);
      await fetchWorkouts(1); // Refresh the list
      return response.data;
    } catch (error) {
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: error.response?.data?.detail || 'Failed to create workout' 
      });
      throw error;
    }
  }, [fetchWorkouts]);

  const updateWorkout = useCallback(async (id, workoutData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING });
      const response = await axiosInstance.put(`/workouts/${id}/`, workoutData);
      dispatch({ type: ACTIONS.UPDATE_WORKOUT, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: error.response?.data?.detail || 'Failed to update workout' 
      });
      throw error;
    }
  }, []);

  const deleteWorkout = useCallback(async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING });
      await axiosInstance.delete(`/workouts/${id}/`);
      dispatch({ type: ACTIONS.DELETE_WORKOUT, payload: id });
    } catch (error) {
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: error.response?.data?.detail || 'Failed to delete workout' 
      });
      throw error;
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      const nextPage = state.page + 1;
      dispatch({ type: ACTIONS.SET_PAGE, payload: nextPage });
      fetchWorkouts(nextPage);
    }
  }, [state.loading, state.hasMore, state.page, fetchWorkouts]);

  useEffect(() => {
    fetchWorkouts(1);
    return () => {
      // Cleanup if needed
    };
  }, [fetchWorkouts]);

  const value = useMemo(() => ({
    ...state,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    loadMore
  }), [state, fetchWorkouts, createWorkout, updateWorkout, deleteWorkout, loadMore]);

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

export default WorkoutContext;