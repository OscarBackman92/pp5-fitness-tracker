import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkouts } from '../context/WorkoutContext';
import { Activity, Calendar, Clock, Flame } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { workouts, loading, error, fetchWorkouts } = useWorkouts();
    const [stats, setStats] = useState({
        totalWorkouts: 0,
        thisWeek: 0,
        totalDuration: 0,
        avgCalories: 0
    });

    useEffect(() => {
        fetchWorkouts().catch((error) => {
            if (error.response?.status === 403) {
                logout();
                navigate('/login');
            }
        });
    }, [fetchWorkouts, logout, navigate]);

    useEffect(() => {
        if (workouts.length > 0) {
            const now = new Date();
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

            const thisWeekWorkouts = workouts.filter(workout => 
                new Date(workout.date_logged) >= oneWeekAgo
            );

            const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
            const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);

            setStats({
                totalWorkouts: workouts.length,
                thisWeek: thisWeekWorkouts.length,
                totalDuration,
                avgCalories: workouts.length ? Math.round(totalCalories / workouts.length) : 0
            });
        }
    }, [workouts]);

    const getWorkoutTypeColor = (type) => {
        const colors = {
            cardio: 'primary',
            strength: 'success',
            flexibility: 'info',
            sports: 'warning',
            other: 'secondary'
        };
        return colors[type] || 'primary';
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading your fitness data...</p>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h1 className="mb-4">Welcome, {user?.username}!</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>

            {/* Stats Section */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Activity size={24} className="mb-2" />
                            <h3>{stats.totalWorkouts}</h3>
                            <Card.Text>Total Workouts</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Calendar size={24} className="mb-2" />
                            <h3>{stats.thisWeek}</h3>
                            <Card.Text>This Week</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Clock size={24} className="mb-2" />
                            <h3>{stats.totalDuration}</h3>
                            <Card.Text>Total Minutes</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Flame size={24} className="mb-2" /> {/* Changed from Fire to Flame */}
                            <h3>{stats.avgCalories}</h3>
                            <Card.Text>Avg Calories/Workout</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Quick Actions */}
            <Row className="mb-4">
                <Col>
                    <Button 
                        variant="primary" 
                        onClick={() => navigate('/workouts/new')}
                        className="me-2"
                    >
                        Log New Workout
                    </Button>
                    <Button 
                        variant="outline-primary" 
                        onClick={() => navigate('/workouts')}
                    >
                        View All Workouts
                    </Button>
                </Col>
            </Row>

            {/* Recent Workouts */}
            <h2 className="mb-3">Recent Workouts</h2>
            <Row>
                {workouts.slice(0, 6).map((workout) => (
                    <Col key={workout.id} md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge bg={getWorkoutTypeColor(workout.workout_type)}>
                                        {workout.workout_type}
                                    </Badge>
                                    <small className="text-muted">
                                        {new Date(workout.date_logged).toLocaleDateString()}
                                    </small>
                                </div>
                                <Card.Title>{workout.title || workout.workout_type}</Card.Title>
                                {workout.description && (
                                    <Card.Text>{workout.description}</Card.Text>
                                )}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <small className="text-muted">
                                        {workout.duration} min | {workout.calories} cal
                                    </small>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => navigate(`/workouts/${workout.id}`)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {workouts.length === 0 && !loading && !error && (
                    <Col xs={12}>
                        <Alert variant="info">
                            <h4>Welcome to Your Fitness Journey!</h4>
                            <p>You haven't logged any workouts yet. Start by logging your first workout!</p>
                            <Button 
                                variant="primary" 
                                onClick={() => navigate('/workouts/new')}
                            >
                                Log Your First Workout
                            </Button>
                        </Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Dashboard;