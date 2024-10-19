import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { createWorkout } from '../services/workouts';
import { useNavigate } from 'react-router-dom';

const WORKOUT_TYPES = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength Training' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' }
];

function LogWorkout() {
  const [workoutData, setWorkoutData] = useState({
    workout_type: '',
    duration: '',
    calories: '',
    date_logged: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData(prevData => ({
      ...prevData,
      [name]: name === 'duration' || name === 'calories' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
  
    try {
      console.log('Submitting workout data:', workoutData);
      await createWorkout(workoutData);
      navigate('/workouts');
    } catch (error) {
      console.error('Log workout error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to log workout. Please check your input and try again.');
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Log New Workout</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            as="select"
            name="workout_type"
            value={workoutData.workout_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a workout type</option>
            {WORKOUT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={workoutData.duration}
            onChange={handleChange}
            required
            min="1"
            max="1440"
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
            min="0"
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
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={workoutData.notes}
            onChange={handleChange}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging...' : 'Log Workout'}
        </Button>
      </Form>
    </Container>
  );
}

export default LogWorkout;