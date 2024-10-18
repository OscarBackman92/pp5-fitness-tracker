import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { createWorkout } from '../services/workouts';
import { useNavigate } from 'react-router-dom';

function LogWorkout() {
  const [workoutData, setWorkoutData] = useState({
    type: '',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0]
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
      await createWorkout(workoutData);
      navigate('/workouts');
    } catch (error) {
      setError('Failed to log workout. Please try again.');
      console.error('Log workout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Log New Workout</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={workoutData.type}
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
            name="caloriesBurned"
            value={workoutData.caloriesBurned}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={workoutData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging...' : 'Log Workout'}
        </Button>
      </Form>
    </Container>
  );
}

export default LogWorkout;