import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWorkoutSummary } from '../services/workouts';
import '../Styles/Dashboard.css';

function Dashboard() {
  const [summary, setSummary] = useState({
    total_workouts: 0,
    recent_workouts: [],
    total_calories: 0,
    total_duration: 0,
    avg_duration: 0
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkoutSummary();
  }, []);

  const fetchWorkoutSummary = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getWorkoutSummary();
      console.log('API Response:', response.data);
      setSummary(response.data || {});
    } catch (error) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Error fetching workout summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="summary-card">
            <Card.Body>
              <Card.Title>Total Workouts</Card.Title>
              <Card.Text>{summary.total_workouts || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="summary-card">
            <Card.Body>
              <Card.Title>Calories Burned</Card.Title>
              <Card.Text>{summary.total_calories || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="summary-card">
            <Card.Body>
              <Card.Title>Total Duration</Card.Title>
              <Card.Text>{((summary.total_duration || 0) / 60).toFixed(1)} hrs</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="summary-card">
            <Card.Body>
              <Card.Title>Avg. Duration</Card.Title>
              <Card.Text>{Math.round(summary.avg_duration || 0)} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="recent-workouts-card">
            <Card.Body>
              <Card.Title>Recent Workouts</Card.Title>
              {summary.recent_workouts && summary.recent_workouts.length > 0 ? (
                <ul className="list-unstyled">
                  {summary.recent_workouts.map((workout) => (
                    <li key={workout.id} className="recent-workout-item">
                      <Link to={`/workouts/${workout.id}`}>
                        <strong>{workout.workout_type_display || 'Unknown Type'}</strong> - 
                        {workout.date_logged ? new Date(workout.date_logged).toLocaleDateString() : 'Unknown Date'} - 
                        {workout.duration ? `${workout.duration} minutes` : 'Unknown Duration'}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent workouts found.</p>
              )}
              <Link to="/workouts" className="btn btn-primary mt-3">View All Workouts</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Link to="/workouts/new" className="d-grid">
            <Button variant="success" size="lg" className="log-workout-btn">Log New Workout</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;