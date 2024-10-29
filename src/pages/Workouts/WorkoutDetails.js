import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { Activity, Clock, Flame, Calendar, FileText } from 'lucide-react';
import { useWorkouts } from '../../context/WorkoutContext';

function WorkoutDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { workouts, loading, error, fetchWorkouts, deleteWorkout } = useWorkouts();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchWorkouts().catch(err => {
            console.error('Error fetching workout details:', err);
        });
    }, [fetchWorkouts]);

    const workout = workouts.find(w => w.id === Number(id));

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteWorkout(id);
            navigate('/workouts', {
                state: { message: 'Workout deleted successfully!' }
            });
        } catch (error) {
            console.error('Error deleting workout:', error);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!workout) {
        return (
            <Container>
                <Alert variant="warning">Workout not found</Alert>
                <Button variant="primary" onClick={() => navigate('/workouts')}>
                    Back to Workouts
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                        <div>
                            <h2 className="mb-1">
                                <Activity className="me-2" size={24} />
                                {workout.workout_type_display || workout.workout_type}
                            </h2>
                            <p className="text-muted mb-0">
                                <Calendar className="me-1" size={16} />
                                {new Date(workout.date_logged).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <Button
                                variant="outline-primary"
                                className="me-2"
                                onClick={() => navigate(`/workouts/edit/${workout.id}`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>

                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="h-100">
                                <Card.Body>
                                    <h5 className="mb-3">Workout Details</h5>
                                    <div className="d-flex align-items-center mb-2">
                                        <Clock size={18} className="me-2" />
                                        <span>Duration: {workout.duration} minutes</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <Flame size={18} className="me-2" />
                                        <span>Calories: {workout.calories}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Activity size={18} className="me-2" />
                                        <span>Intensity: {workout.intensity}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100">
                                <Card.Body>
                                    <h5 className="mb-3">Notes</h5>
                                    <div className="d-flex align-items-start">
                                        <FileText size={18} className="me-2 mt-1" />
                                        <p className="mb-0">
                                            {workout.notes || 'No notes for this workout.'}
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

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
                        onClick={handleDelete}
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
                            'Delete'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default WorkoutDetails;