import React, { useEffect } from 'react';
import { useWorkout } from '../../context/WorkoutContext'; // Correct import

const WorkoutList = () => {
    const { workouts, fetchWorkouts } = useWorkout(); // Correct usage

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    if (!workouts || workouts.length === 0) return <div>No workouts found.</div>;

    return (
        <div>
            <h2>Workout List</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <h3>{workout.name}</h3>
                        <p>Duration: {workout.duration} minutes</p>
                        <p>Calories: {workout.calories}</p>
                        {/* Add links to edit or view details of the workout */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutList;
