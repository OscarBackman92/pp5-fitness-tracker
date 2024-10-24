// src/components/Context.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/auth';
import * as workoutService from '../services/workouts';

// Create contexts
const AuthContext = createContext(null);
const WorkoutContext = createContext(null);


// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const clearError = () => setError(null);

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async (username, password) => {
        try {
            console.log('Starting login process...');
            const response = await authService.login(username, password);
            console.log('Login response:', response);
            setIsAuthenticated(true);
            console.log('Set authenticated to true');
            navigate('/dashboard');
            console.log('Navigating to dashboard');
            return response;
        } catch (err) {
            console.log('Login error:', err);
            setError(err.response?.data?.detail || 'Login failed');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('access_token');
            navigate('/login');
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            // After successful registration, log them in automatically
            await login(userData.username, userData.password);
            return response;
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed');
            throw err;
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const updatedProfile = await authService.updateUserProfile(profileData);
            setUser(updatedProfile);
            return updatedProfile;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                setUser,
                loading,
                error,
                isAuthenticated,
                login,
                logout,
                register,
                updateProfile,
                clearError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Workout Provider Component
export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([]);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchWorkouts = async () => {
        setLoading(true);
        try {
            const data = await workoutService.getWorkouts();
            setWorkouts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchWorkoutDetails = async (id) => {
        setLoading(true);
        try {
            const data = await workoutService.getWorkoutDetails(id);
            setCurrentWorkout(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createWorkout = async (workoutData) => {
        try {
            const newWorkout = await workoutService.createWorkout(workoutData);
            setWorkouts(prev => [...prev, newWorkout]);
            navigate('/workouts');
            return newWorkout;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const updateWorkout = async (id, workoutData) => {
        try {
            const updatedWorkout = await workoutService.updateWorkout(id, workoutData);
            setWorkouts(prev => 
                prev.map(workout => 
                    workout.id === id ? updatedWorkout : workout
                )
            );
            setCurrentWorkout(updatedWorkout);
            navigate(`/workouts/${id}`);
            return updatedWorkout;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteWorkout = async (id) => {
        try {
            await workoutService.deleteWorkout(id);
            setWorkouts(prev => prev.filter(workout => workout.id !== id));
            navigate('/workouts');
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return (
        <WorkoutContext.Provider
            value={{
                workouts,
                currentWorkout,
                loading,
                error,
                fetchWorkouts,
                fetchWorkoutDetails,
                createWorkout,
                updateWorkout,
                deleteWorkout
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

// Export hooks and providers
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within a WorkoutProvider');
    }
    return context;
};

// Combined provider
export const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <WorkoutProvider>
                {children}
            </WorkoutProvider>
        </AuthProvider>
    );
};