import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';
import '../Styles/WorkoutList.css';

function WorkoutList() {
  const { workouts, loading, error, fetchWorkouts, deleteWorkout } = useWorkouts();
  const [deleting, setDeleting] = useState(null);
  const [localError, setLocalError] = useState('');  // Add local error state

  useEffect(() => {
    fetchWorkouts().catch(err => {
      setLocalError('Failed to fetch workouts');
    });
  }, [fetchWorkouts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        setDeleting(id);
        await deleteWorkout(id);
      } catch (error) {
        console.error('Error deleting workout:', error);
        setLocalError('Failed to delete workout. Please try again.');
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) return (
    <div className="workout-spinner">
      <Spinner animation="border" />
    </div>
  );

  return (
    <Container className="workout-list-container">
      <div className="workout-list-header">
        <h2>Your Workouts</h2>
        <Link to="/workouts/new" className="btn btn-primary">Log New Workout</Link>
      </div>
      {(error || localError) && (
        <Alert 
          variant="danger" 
          onClose={() => setLocalError('')} 
          dismissible
        >
          {error || localError}
        </Alert>
      )}
      {workouts.length === 0 ? (
        <div className="no-workouts-alert">
          <Alert variant="info">No workouts logged yet. Start by logging a new workout!</Alert>
        </div>
      ) : (
        <Table responsive striped bordered hover className="workout-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{new Date(workout.date_logged).toLocaleDateString()}</td>
                <td>{workout.workout_type}</td>
                <td>{workout.duration} min</td>
                <td>{workout.calories}</td>
                <td>
                  <div className="workout-actions">
                    <Link to={`/workouts/edit/${workout.id}`} className="btn btn-sm btn-info">Edit</Link>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(workout.id)}
                      disabled={deleting === workout.id}
                    >
                      {deleting === workout.id ? <Spinner animation="border" size="sm" /> : 'Delete'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default WorkoutList;