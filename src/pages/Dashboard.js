// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Context';
import { useWorkout } from '../components/Context';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { workouts, loading, fetchWorkouts } = useWorkout();

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  // Get recent workouts (last 3)
  const recentWorkouts = workouts?.slice(0, 3) || [];

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="dashboard-container py-5">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <h1 className="welcome-text">Welcome, {user?.username || 'Fitness Enthusiast'}!</h1>
          <p className="text-muted">Track your fitness journey and stay motivated</p>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card className="quick-action-card h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Log Workout</Card.Title>
              <Card.Text>
                Record your latest workout session and track your progress.
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  as={Link} 
                  to="/workouts/new" 
                  variant="primary"
                  className="w-100"
                >
                  Start Logging
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="quick-action-card h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>View Progress</Card.Title>
              <Card.Text>
                Check your workout history and track your improvements.
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  as={Link} 
                  to="/workouts" 
                  variant="outline-primary"
                  className="w-100"
                >
                  See Workouts
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="quick-action-card h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Update Profile</Card.Title>
              <Card.Text>
                Set your fitness goals and update your profile information.
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  as={Link} 
                  to="/profile" 
                  variant="outline-primary"
                  className="w-100"
                >
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="section-title">Recent Workouts</h2>
        </Col>
      </Row>
      <Row>
        {recentWorkouts.length > 0 ? (
          recentWorkouts.map((workout) => (
            <Col md={4} key={workout.id} className="mb-3">
              <Card className="workout-card h-100">
                <Card.Body>
                  <Card.Title>{workout.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {new Date(workout.date).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>
                    {workout.description?.slice(0, 100)}
                    {workout.description?.length > 100 ? '...' : ''}
                  </Card.Text>
                  <Button 
                    as={Link} 
                    to={`/workouts/${workout.id}`}
                    variant="outline-primary" 
                    size="sm"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center p-4">
              <Card.Body>
                <Card.Title>No workouts yet</Card.Title>
                <Card.Text>
                  Start tracking your fitness journey by logging your first workout!
                </Card.Text>
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
    </Container>
  );
};

export default Dashboard;