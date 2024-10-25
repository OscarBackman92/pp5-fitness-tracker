import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkouts } from '../context/WorkoutContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { workouts, loading, error, fetchWorkouts, clearError } = useWorkouts();

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                await fetchWorkouts();
            } catch (error) {
                if (error.response?.status === 403) {
                    await logout();
                    navigate('/login');
                }
            }
        };

        loadWorkouts();
        return () => clearError();
    }, [navigate, logout, fetchWorkouts, clearError]);

    const handleViewDetails = (workoutId) => {
        navigate(`/workouts/${workoutId}`);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="mb-4">Welcome, {user?.username}!</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {workouts.map((workout) => (
                    <Col key={workout.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{workout.title}</Card.Title>
                                <Card.Text>{workout.description}</Card.Text>
                                <Card.Text>
                                    <small className="text-muted">
                                        Duration: {workout.duration} min
                                    </small>
                                </Card.Text>
                                <Button 
                                    variant="primary"
                                    onClick={() => handleViewDetails(workout.id)}
                                >
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {workouts.length === 0 && !loading && !error && (
                    <Col xs={12}>
                        <Alert variant="info">
                            No workouts found. Create your first workout!
                        </Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Dashboard;