// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Context';
import { useWorkout } from '../components/Context';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { workouts, loading, fetchWorkouts } = useWorkout();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchWorkouts();
    
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, [fetchWorkouts]);

  return (
    <div className="dashboard-wrapper">
      <Container>
        {/* Header Section */}
        <Row className="header-section my-4">
          <Col>
            <h1 className="welcome-text">{greeting}, {user?.username}!</h1>
            <p className="text-muted lead">Track your progress and stay motivated.</p>
          </Col>
        </Row>

        {/* Primary Action Section */}
        <Row className="mb-4">
          <Col>
            <Card className="primary-action-card">
              <Card.Body className="text-center py-4">
                <h3>Ready to start your workout?</h3>
                <p className="text-muted mb-4">Log your exercises and track your progress</p>
                <Button 
                  as={Link} 
                  to="/workouts/new"
                  variant="primary"
                  size="lg"
                  className="main-action-button"
                >
                  Log New Workout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Stats Row */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="text-center">
                <h2 className="stat-number">{workouts?.length || 0}</h2>
                <p className="stat-label">Total Workouts</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="text-center">
                <h2 className="stat-number">
                  {workouts?.[0]?.date ? 
                    new Date(workouts[0].date).toLocaleDateString() : 
                    'No workouts yet'}
                </h2>
                <p className="stat-label">Last Workout</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="text-center">
                <h2 className="stat-number">
                  {workouts?.length > 0 ? 'Active' : 'New User'}
                </h2>
                <p className="stat-label">Status</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Workouts Section */}
        <Row className="mb-4">
          <Col>
            <h2 className="section-title">Recent Activity</h2>
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Col>
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </Col>
          ) : workouts?.length > 0 ? (
            workouts.slice(0, 3).map((workout) => (
              <Col md={4} key={workout.id} className="mb-3">
                <Card className="workout-card">
                  <Card.Body>
                    <Card.Title>{workout.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(workout.date).toLocaleDateString()}
                    </Card.Subtitle>
                    <Card.Text>
                      {workout.description?.slice(0, 100)}
                      {workout.description?.length > 100 ? '...' : ''}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button 
                        as={Link} 
                        to={`/workouts/${workout.id}`}
                        variant="outline-primary"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="text-center">
                <Card.Body className="py-5">
                  <h3>Welcome to Your Fitness Journey!</h3>
                  <p className="text-muted mb-4">
                    Start tracking your workouts to see your progress here.
                  </p>
                  <Button 
                    as={Link} 
                    to="/workouts/new"
                    variant="primary"
                  >
                    Log Your First Workout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {/* Quick Links Section */}
        <Row className="mt-4">
          <Col md={6} className="mb-3">
            <Card className="quick-link-card">
              <Card.Body className="text-center">
                <h4>View All Workouts</h4>
                <p className="text-muted">See your complete workout history</p>
                <Button 
                  as={Link} 
                  to="/workouts"
                  variant="outline-primary"
                  className="w-100"
                >
                  Go to Workouts
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="quick-link-card">
              <Card.Body className="text-center">
                <h4>Update Profile</h4>
                <p className="text-muted">Manage your profile and preferences</p>
                <Button 
                  as={Link} 
                  to="/profile"
                  variant="outline-primary"
                  className="w-100"
                >
                  Go to Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;