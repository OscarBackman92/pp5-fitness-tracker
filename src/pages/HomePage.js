import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, Users, Award, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkouts } from '../context/WorkoutContext';
import WorkoutStats from '../components/WorkoutStats';
import '../Styles/HomePage.css';

// Public Landing Page Component
const PublicHome = () => (
    <div className="landing-page">
        {/* Hero Section */}
        <section className="hero-section text-center text-white">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8} className="mx-auto">
                        <h1 className="display-4 mb-4">Transform Your Fitness Journey</h1>
                        <p className="lead mb-4">
                            Track workouts, analyze progress, and achieve your fitness goals with our comprehensive fitness tracking platform.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/register">
                                <Button variant="light" size="lg" className="me-3">Start Free Trial</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline-light" size="lg">Log In</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        {/* Features Section */}
        <section className="features-section py-5 bg-light">
            <Container>
                <h2 className="text-center mb-5">Why Choose Our Platform?</h2>
                <Row>
                    {[
                        {
                            icon: <Activity size={40} />,
                            title: "Easy Workout Tracking",
                            description: "Log your exercises, duration, and calories burned with just a few taps."
                        },
                        {
                            icon: <BarChart2 size={40} />,
                            title: "Detailed Analytics",
                            description: "Visualize your progress with intuitive charts and comprehensive statistics."
                        },
                        {
                            icon: <Users size={40} />,
                            title: "Community Support",
                            description: "Connect with fellow fitness enthusiasts for motivation and tips."
                        },
                        {
                            icon: <Award size={40} />,
                            title: "Achievement System",
                            description: "Earn badges and track milestones as you progress in your fitness journey."
                        }
                    ].map((feature, index) => (
                        <Col md={6} lg={3} key={index} className="mb-4">
                            <Card className="feature-card h-100 border-0 shadow-sm">
                                <Card.Body className="text-center">
                                    <div className="feature-icon text-primary mb-3">
                                        {feature.icon}
                                    </div>
                                    <Card.Title>{feature.title}</Card.Title>
                                    <Card.Text>{feature.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>

        {/* CTA Section */}
        <section className="cta-section text-center py-5 bg-primary text-white">
            <Container>
                <h2 className="mb-4">Ready to Start Your Fitness Journey?</h2>
                <p className="mb-4">Join thousands of users who are transforming their lives with our platform.</p>
                <Link to="/register">
                    <Button variant="light" size="lg">Get Started Now</Button>
                </Link>
            </Container>
        </section>
    </div>
);

// Authenticated User Dashboard
const AuthenticatedHome = () => {
    const { user } = useAuth();
    const { workouts = [], loading, error } = useWorkouts();

    const recentWorkouts = workouts.slice(0, 3);

    return (
        <Container className="py-4">
            {/* Welcome Section */}
            <Row className="mb-4">
                <Col>
                    <h1>Welcome back, {user?.username}! 👋</h1>
                    <p className="text-muted">Track your progress and crush your fitness goals.</p>
                </Col>
            </Row>

            {/* Quick Actions */}
            <Row className="mb-4">
                <Col>
                    <Link to="/workouts/new">
                        <Button variant="primary" className="me-2">
                            <Plus size={18} className="me-2" />
                            Log New Workout
                        </Button>
                    </Link>
                    <Link to="/workouts">
                        <Button variant="outline-primary">View All Workouts</Button>
                    </Link>
                </Col>
            </Row>

            {/* Stats Overview */}
            <WorkoutStats workouts={workouts} />

            {/* Recent Workouts */}
            <section className="mt-5">
                <h2 className="mb-4">Recent Workouts</h2>
                {error && (
                    <Alert variant="danger">{error}</Alert>
                )}
                
                <Row>
                    {recentWorkouts.map(workout => (
                        <Col md={4} key={workout.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>{workout.workout_type}</Card.Title>
                                    <Card.Text>
                                        Duration: {workout.duration} minutes<br />
                                        Calories: {workout.calories}<br />
                                        Date: {new Date(workout.date_logged).toLocaleDateString()}
                                    </Card.Text>
                                    <Link to={`/workouts/${workout.id}`}>
                                        <Button variant="outline-primary" size="sm">View Details</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {recentWorkouts.length === 0 && !loading && (
                        <Col xs={12}>
                            <Alert variant="info">
                                No workouts logged yet. Start by logging your first workout!
                            </Alert>
                        </Col>
                    )}
                </Row>
            </section>
        </Container>
    );
};

// Main HomePage Component
const HomePage = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <AuthenticatedHome /> : <PublicHome />;
};

export default HomePage;