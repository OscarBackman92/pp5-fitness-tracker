import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkout } from '../../context/WorkoutContext'; // Correct import
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EditWorkout = () => {
    const { id } = useParams();
    const { getWorkoutById, updateWorkout } = useWorkout(); // Correct usage
    const [workout, setWorkout] = useState({
        name: '',
        duration: '',
        calories: '',
    });
    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        const fetchWorkout = async () => {
            const data = await getWorkoutById(id);
            setWorkout(data);
        };
        fetchWorkout();
    }, [id, getWorkoutById]);

    const handleChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateWorkout(id, workout);
        navigate('/workouts'); // Use navigate instead of history.push
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Workout</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={workout.name}
                    onChange={handleChange}
                    placeholder="Workout Name"
                />
                <input
                    name="duration"
                    value={workout.duration}
                    onChange={handleChange}
                    placeholder="Duration (minutes)"
                />
                <input
                    name="calories"
                    value={workout.calories}
                    onChange={handleChange}
                    placeholder="Calories Burned"
                />
                <button type="submit">Update Workout</button>
            </form>
        </div>
    );
};

export default EditWorkout;
