import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext'; // Correct import

const LogWorkout = () => {
    const { logNewWorkout } = useWorkout(); // Correct usage
    const [workoutData, setWorkoutData] = useState({
        name: '',
        duration: '',
        calories: '',
    });

    const handleChange = (e) => {
        setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await logNewWorkout(workoutData);
        setWorkoutData({ name: '', duration: '', calories: '' }); // Reset form
    };

    return (
        <div>
            <h2>Log New Workout</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={workoutData.name}
                    onChange={handleChange}
                    placeholder="Workout Name"
                />
                <input
                    name="duration"
                    value={workoutData.duration}
                    onChange={handleChange}
                    placeholder="Duration (minutes)"
                />
                <input
                    name="calories"
                    value={workoutData.calories}
                    onChange={handleChange}
                    placeholder="Calories Burned"
                />
                <button type="submit">Log Workout</button>
            </form>
        </div>
    );
};

export default LogWorkout;
