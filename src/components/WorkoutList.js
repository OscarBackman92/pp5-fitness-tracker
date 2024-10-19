import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../services/workouts';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      const response = await getWorkouts();
      console.log('API response:', response); // Log the entire response object
  
      // Ensure the response contains the results array
      if (response.data && Array.isArray(response.data.results)) {
        setWorkouts(response.data.results); // Use the 'results' array
      } else {
        throw new Error('Data format is incorrect');
      }
    } catch (error) {
      console.error('Fetch workouts error:', error);
      setError('Failed to fetch workouts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (workout) => {
    setWorkoutToDelete(workout);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteWorkout(workoutToDelete.id);
      setWorkouts(workouts.filter((w) => w.id !== workoutToDelete.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Delete workout error:', error);
      setError('Failed to delete workout. Please try again.');
    }
  };

  if (isLoading) return <div>Loading workouts...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2 className="mb-4">Your Workouts</h2>
      <Link to="/workouts/new">
        <Button variant="primary" className="mb-3">
          Log New Workout
        </Button>
      </Link>

      {workouts.length === 0 ? (
        <p>No workouts found. Start by logging a new workout!</p>
      ) : (
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
            {Array.isArray(workouts) &&
              workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{new Date(workout.date_logged).toLocaleDateString()}</td>
                  <td>{workout.workout_type_display}</td>
                  <td>{workout.duration} minutes</td>
                  <td>{workout.calories}</td>
                  <td>
                    <Link to={`/workouts/${workout.id}`}>
                      <Button variant="info" size="sm" className="mr-2">
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(workout)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this workout? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default WorkoutList;
