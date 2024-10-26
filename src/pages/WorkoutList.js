import React, { useEffect, useState } from 'react';
import { Table, Alert, Spinner, Container } from 'react-bootstrap'; // Removed unused Button import
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';

function WorkoutList() {
    const { workouts, loading, error, fetchWorkouts } = useWorkouts();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('WorkoutList mounted, fetching workouts...');
        fetchWorkouts().catch(err => {
            console.error('Error fetching workouts:', err);
        });
    }, [fetchWorkouts]); // Added fetchWorkouts to dependency array

    // Handle success message from location state
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Clear the message from navigation state
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    console.log('Current workouts in state:', workouts);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Workouts</h2>
                <Link to="/workouts/new" className="btn btn-primary">
                    Log New Workout
                </Link>
            </div>

            {successMessage && (
                <Alert 
                    variant="success" 
                    onClose={() => setSuccessMessage('')} 
                    dismissible
                >
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )}

            {!loading && workouts.length === 0 ? (
                <Alert variant="info">
                    No workouts logged yet. Start by logging a new workout!
                </Alert>
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
                                <td>{workout.workout_type_display || workout.workout_type}</td>
                                <td>{workout.duration} min</td>
                                <td>{workout.calories}</td>
                                <td>
                                    <Link 
                                        to={`/workouts/${workout.id}`} 
                                        className="btn btn-sm btn-info me-2"
                                    >
                                        View
                                    </Link>
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