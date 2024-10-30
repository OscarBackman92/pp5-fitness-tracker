import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkout } from '../../context/WorkoutContext'; // Correct import

const WorkoutDetails = () => {
    const { id } = useParams();
    const { getWorkoutById } = useWorkout(); // Correct usage
    const [workout, setWorkout] = useState(null);

    useEffect(() => {
        const fetchWorkout = async () => {
            const data = await getWorkoutById(id);
            setWorkout(data);
        };
        fetchWorkout();
    }, [id, getWorkoutById]);

    if (!workout) return <div>Loading...</div>;

    return (
        <div>
            <h2>{workout.name}</h2>
            <p>Duration: {workout.duration} minutes</p>
            <p>Calories: {workout.calories}</p>
            {/* Add more workout details as needed */}
        </div>
    );
};

export default WorkoutDetails;
