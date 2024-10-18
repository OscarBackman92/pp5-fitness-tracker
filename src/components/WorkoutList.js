import React, { useState, useEffect } from 'react';
import { getWorkouts } from '../services/workouts';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await getWorkouts();
      setWorkouts(response.data);
    } catch (error) {
      setError('Failed to fetch workouts. Please try again.');
      console.error('Fetch workouts error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading workouts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Your Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found. Start by creating a new workout!</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              {workout.name} - {workout.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutList;