import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWorkoutSummary } from '../services/workouts';

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
      const response = await getWorkoutSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching workout summary:', error);
      setError('Failed to load workout summary. Please try refreshing the page.');
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
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Total Workouts</Card.Title>
              <Card.Text className="h2">{summary.total_workouts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Calories Burned</Card.Title>
              <Card.Text className="h2">{summary.total_calories}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Total Duration</Card.Title>
              <Card.Text className="h2">{(summary.total_duration / 60).toFixed(1)} hours</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Avg. Duration</Card.Title>
              <Card.Text className="h2">{Math.round(summary.avg_duration)} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Recent Workouts</Card.Title>
              {summary.recent_workouts && summary.recent_workouts.length > 0 ? (
                <ul className="list-unstyled">
                  {summary.recent_workouts.map((workout) => (
                    <li key={workout.id} className="mb-2">
                      <Link to={`/workouts/${workout.id}`}>
                        <strong>{workout.workout_type_display}</strong> - {new Date(workout.date_logged).toLocaleDateString()} - {workout.duration} minutes
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
            <Button variant="success" size="lg">Log New Workout</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;