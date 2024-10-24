// src/components/Context.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/auth';
import * as workoutService from '../services/workouts';
import { socialService } from '../services/social';

// Create contexts
const AuthContext = createContext(null);
const WorkoutContext = createContext(null);
const SocialContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const clearError = () => setError(null);

    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            try {
                const userProfile = await authService.getUserProfile();
                setUser(userProfile);
                setIsAuthenticated(true);
            } catch (error) {
                if (error.response?.status === 403) {
                    localStorage.removeItem('access_token');
                    setIsAuthenticated(false);
                    setUser(null);
                    navigate('/login');
                }
            }
        } catch (err) {
            setError(err.message);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            const profile = await authService.getUserProfile();
            setUser(profile);
            setIsAuthenticated(true);
            navigate('/dashboard');
            return response;
        } catch (err) {
            setError(err.message);
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
            navigate('/login');
            return response;
        } catch (err) {
            setError(err.message);
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

// Social Provider Component
export const SocialProvider = ({ children }) => {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getFeed = async (page = 1) => {
        setLoading(true);
        try {
            const response = await socialService.getFeed(page);
            setFeed(prev => page === 1 ? response.data : [...prev, ...response.data]);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const followUser = async (userId) => {
        try {
            const response = await socialService.followUser(userId);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const unfollowUser = async (userId) => {
        try {
            const response = await socialService.unfollowUser(userId);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const likeWorkout = async (workoutId) => {
        try {
            const response = await socialService.likeWorkout(workoutId);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const unlikeWorkout = async (workoutId) => {
        try {
            const response = await socialService.unlikeWorkout(workoutId);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return (
        <SocialContext.Provider
            value={{
                feed,
                loading,
                error,
                getFeed,
                followUser,
                unfollowUser,
                likeWorkout,
                unlikeWorkout
            }}
        >
            {children}
        </SocialContext.Provider>
    );
};

// Custom hooks
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

export const useSocial = () => {
    const context = useContext(SocialContext);
    if (!context) {
        throw new Error('useSocial must be used within a SocialProvider');
    }
    return context;
};

// PrivateRoute component
export const PrivateRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading) return <div>Loading...</div>;
    
    return isAuthenticated ? children : null;
};

// Combined provider
export const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <WorkoutProvider>
                <SocialProvider>
                    {children}
                </SocialProvider>
            </WorkoutProvider>
        </AuthProvider>
    );
};