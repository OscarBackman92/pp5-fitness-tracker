import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutDetails, updateWorkout } from '../services/workouts';

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

function EditWorkout() {
  const [workoutData, setWorkoutData] = useState({
    workout_type: '',
    duration: '',
    calories: '',
    date_logged: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await getWorkoutDetails(id);
        setWorkoutData(response.data);
      } catch (error) {
        console.error('Error fetching workout:', error);
        setError('Failed to load workout. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

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
      await updateWorkout(id, workoutData);
      navigate(`/workouts/${id}`);
    } catch (error) {
      console.error('Update workout error:', error);
      setError('Failed to update workout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <h2 className="mb-4">Edit Workout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
              <option key={type} value={type}>{type}</option>
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
          {isLoading ? 'Updating...' : 'Update Workout'}
        </Button>
      </Form>
    </Container>
  );
}

export default EditWorkout;