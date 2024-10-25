import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkouts } from '../context/WorkoutContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { workouts, loading, error, fetchWorkouts } = useWorkouts();

    useEffect(() => {
        fetchWorkouts().catch((error) => {
            if (error.response?.status === 403) {
                logout();
                navigate('/login');
            }
        });
    }, [fetchWorkouts, logout, navigate]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
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
                                    onClick={() => navigate(`/workouts/${workout.id}`)}
                                >
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;