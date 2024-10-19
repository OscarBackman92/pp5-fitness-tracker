import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../services/workouts';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getWorkouts();
      setWorkouts(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError('Failed to load workouts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        setDeleting(id);
        await deleteWorkout(id);
        setWorkouts(workouts.filter(workout => workout.id !== id));
      } catch (error) {
        console.error('Error deleting workout:', error);
        setError('Failed to delete workout. Please try again.');
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div>
      <h2 className="mb-4">Your Workouts</h2>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      <Link to="/workouts/new" className="btn btn-primary mb-3">Log New Workout</Link>
      {workouts.length === 0 ? (
        <Alert variant="info">No workouts logged yet. Start by logging a new workout!</Alert>
      ) : (
        <Table responsive striped bordered hover>
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
                  <Link to={`/workouts/edit/${workout.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(workout.id)}
                    disabled={deleting === workout.id}
                  >
                    {deleting === workout.id ? <Spinner animation="border" size="sm" /> : 'Delete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default WorkoutList;