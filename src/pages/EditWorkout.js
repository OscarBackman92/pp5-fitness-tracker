import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Spinner, Card } from 'react-bootstrap';
import { getWorkoutDetails, updateWorkout } from '../services/workouts';
import '../Styles/EditWorkout.css';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    setError('');
    try {
      await updateWorkout(id, workout);
      navigate('/workouts', { state: { message: 'Workout updated successfully!' } });
    } catch (error) {
      console.error('Error updating workout:', error);
      setError('Failed to update workout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="edit-workout-container">
      <Card className="edit-workout-card">
        <Card.Body>
          <h2 className="edit-workout-title">Edit Workout</h2>
          {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="edit-workout-form">
            <Form.Group className="form-group">
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
            <Form.Group className="form-group">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={workout.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Calories Burned</Form.Label>
              <Form.Control
                type="number"
                name="calories"
                value={workout.calories}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date_logged"
                value={workout.date_logged}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={workout.notes}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" as={Link} to="/workouts" className="btn-cancel">
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting} className="btn-submit">
                {isSubmitting ? 'Updating...' : 'Update Workout'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditWorkout;