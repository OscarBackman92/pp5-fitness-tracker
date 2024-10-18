import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { getWorkouts } from '../services/workouts';
import { Link } from 'react-router-dom';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
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
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <h2 className="mb-4">Your Workouts</h2>
      <Button as={Link} to="/workouts/new" variant="primary" className="mb-3">
        Log New Workout
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Calories Burned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.id}>
              <td>{workout.date}</td>
              <td>{workout.type}</td>
              <td>{workout.duration} minutes</td>
              <td>{workout.caloriesBurned}</td>
              <td>
                <Button as={Link} to={`/workouts/${workout.id}`} variant="info" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default WorkoutList;