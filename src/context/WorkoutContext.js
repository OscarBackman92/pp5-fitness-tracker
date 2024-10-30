import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../services/api/axiosInstance';
import { useAuth } from './AuthContext';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!isAuthenticated) return; // Don't fetch if not authenticated

            setLoading(true);
            try {
                const response = await axiosInstance.get('/workouts/');
                setWorkouts(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching workouts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [isAuthenticated]);

    return (
        <WorkoutContext.Provider value={{ workouts, loading, error }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    return useContext(WorkoutContext);
};
