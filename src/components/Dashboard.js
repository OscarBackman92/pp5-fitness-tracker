import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { getWorkoutSummary } from '../services/workouts';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    recentWorkouts: [],
    caloriesBurned: 0,
    totalDuration: 0,
    avgDuration: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkoutSummary();
  }, []);

  const fetchWorkoutSummary = async () => {
    try {
      console.log('Fetching workout summary...');
      console.log('Current token:', localStorage.getItem('authToken'));
      const response = await getWorkoutSummary();
      console.log('Workout summary response:', response);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching workout summary:', error);
      setError('Failed to load workout summary. Please try refreshing the page.');
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Workouts</Card.Title>
              <Card.Text className="h2">{summary.totalWorkouts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Calories Burned</Card.Title>
              <Card.Text className="h2">{summary.caloriesBurned}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Recent Workouts</Card.Title>
              {summary.recentWorkouts && summary.recentWorkouts.length > 0 ? (
                <ul className="list-unstyled">
                  {summary.recentWorkouts.map((workout, index) => (
                    <li key={index} className="mb-2">
                      <strong>{workout.workout_type}</strong> - {new Date(workout.date_logged).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent workouts found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;