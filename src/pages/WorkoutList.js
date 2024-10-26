import React, { useEffect, useState } from 'react';
import { Table, Alert, Spinner, Container, Button, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWorkouts } from '../context/WorkoutContext';

function WorkoutList() {
    const { workouts, loading, error, fetchWorkouts, deleteWorkout } = useWorkouts();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [workoutToDelete, setWorkoutToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchWorkouts().catch(err => {
            console.error('Error fetching workouts:', err);
        });
    }, [fetchWorkouts]);

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    const handleDeleteClick = (workout) => {
        setWorkoutToDelete(workout);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!workoutToDelete) return;

        setDeleteLoading(true);
        try {
            await deleteWorkout(workoutToDelete.id);
            setSuccessMessage('Workout deleted successfully!');
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting workout:', error);
        } finally {
            setDeleteLoading(false);
            setWorkoutToDelete(null);
        }
    };

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
                    Are you sure you want to delete this workout? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowDeleteModal(false)}
                        disabled={deleteLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleDeleteConfirm}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Deleting...
                            </>
                        ) : (
                            'Delete Workout'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default WorkoutList;