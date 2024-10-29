import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Activity, BarChart2 } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

const AuthenticatedHome = () => {
    const { user } = useAuth();

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h1>Welcome back, {user?.username}! 👋</h1>
                    <p className="text-muted">Track your progress and achieve your goals.</p>
                </Col>
            </Row>

            <Row>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Activity className="mb-3 text-primary" size={24} />
                            <h5>Quick Start</h5>
                            <p>Ready to log your workout?</p>
                            <Link to="/workouts/new">
                                <Button variant="primary">Log Workout</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <BarChart2 className="mb-3 text-success" size={24} />
                            <h5>Your Progress</h5>
                            <p>View your workout history and stats.</p>
                            <Link to="/dashboard">
                                <Button variant="outline-primary">View Dashboard</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthenticatedHome;