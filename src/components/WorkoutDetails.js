import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { getWorkoutDetails, deleteWorkout } from '../services/workouts';

function WorkoutDetails() {
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchWorkoutDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getWorkoutDetails(id);
      setWorkout(response.data);
    } catch (error) {
      console.error('Error fetching workout details:', error);
      setError('Failed to load workout details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWorkoutDetails();
  }, [fetchWorkoutDetails]);

  const handleEdit = () => {
    navigate(`/workouts/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteWorkout(id);
      navigate('/workouts');
    } catch (error) {
      console.error('Error deleting workout:', error);
      setError('Failed to delete workout. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!workout) return <div>No workout found</div>;

  return (
    <Container>
      <h1 className="mb-4">Workout Details</h1>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h2>{workout.workout_type_display}</h2>
              <p>Date: {new Date(workout.date_logged).toLocaleDateString()}</p>
              <p>Duration: {workout.duration} minutes</p>
              <p>Calories Burned: {workout.calories}</p>
            </Col>
            <Col md={6}>
              <h3>Notes</h3>
              <p>{workout.notes || 'No notes for this workout.'}</p>
            </Col>
          </Row>
          <Button onClick={handleEdit} variant="primary" className="mr-2">Edit Workout</Button>
          <Button onClick={() => setShowDeleteModal(true)} variant="danger">Delete Workout</Button>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this workout? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default WorkoutDetails;