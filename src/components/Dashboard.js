import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { getWorkoutSummary } from '../services/workouts';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    recentWorkouts: [],
    caloriesBurned: 0
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      }
      setError('Failed to load workout summary. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
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
      {!error && (
        <>
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
                  {summary.recentWorkouts.length > 0 ? (
                    <ul className="list-unstyled">
                      {summary.recentWorkouts.map((workout, index) => (
                        <li key={index} className="mb-2">
                          <strong>{workout.name}</strong> - {new Date(workout.date).toLocaleDateString()}
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
        </>
      )}
    </Container>
  );
}

export default Dashboard;