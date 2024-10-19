import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { getWorkoutDetails, updateWorkout } from '../services/workouts';

const WORKOUT_TYPES = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength Training' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' }
];

function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    workout_type: '',
    duration: '',
    calories: '',
    date_logged: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const data = await getWorkoutDetails(id);
        setWorkout(data);
      } catch (error) {
        console.error('Error fetching workout:', error);
        setError('Failed to load workout details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWorkout(id, workout);
      navigate('/workouts');
    } catch (error) {
      console.error('Error updating workout:', error);
      setError('Failed to update workout. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Workout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            as="select"
            name="workout_type"
            value={workout.workout_type}
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
            value={workout.duration}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Calories Burned</Form.Label>
          <Form.Control
            type="number"
            name="calories"
            value={workout.calories}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date_logged"
            value={workout.date_logged}
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
            value={workout.notes}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Workout
        </Button>
      </Form>
    </div>
  );
}

export default EditWorkout;