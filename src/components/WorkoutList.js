import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../services/workouts';

// This should match the choices in your Django model
const WORKOUT_TYPES = [
  'Cardio',
  'Strength',
  'Flexibility',
  'Balance',
  'HIIT',
  'Yoga',
  'Pilates',
  'Running',
  'Cycling',
  'Swimming'
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
      if (error.response && error.response.data) {
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
        <Row>
          <Col md={6}>
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
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={workoutData.duration}
                onChange={handleChange}
                required
                min="1"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
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
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging...' : 'Log Workout'}
        </Button>
      </Form>
    </Container>
  );
}

export default LogWorkout;