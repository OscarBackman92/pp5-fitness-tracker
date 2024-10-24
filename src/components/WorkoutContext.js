import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([]);

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workouts/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('access_token')}`,
                },
            });
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within a WorkoutProvider');
    }
    return context;
};
