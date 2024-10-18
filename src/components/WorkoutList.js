import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../services/workouts';

function LogWorkout() {
  const [workoutData, setWorkoutData] = useState({
    workout_type: '',
    duration: '',
    calories: '',
    date_logged: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      console.log('Submitting workout data:', workoutData);
      const response = await createWorkout(workoutData);
      console.log('Workout created:', response.data);
      navigate('/workouts');
    } catch (error) {
      console.error('Log workout error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setError(`Failed to log workout: ${JSON.stringify(error.response.data)}`);
      } else {
        setError('Failed to log workout. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Log New Workout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            type="text"
            name="workout_type"
            value={workoutData.workout_type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={workoutData.duration}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Calories Burned</Form.Label>
          <Form.Control
            type="number"
            name="calories"
            value={workoutData.calories}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date_logged"
            value={workoutData.date_logged}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging...' : 'Log Workout'}
        </Button>
      </Form>
    </Container>
  );
}

export default LogWorkout;