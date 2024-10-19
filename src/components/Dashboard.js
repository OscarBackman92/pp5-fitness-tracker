import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, ProgressBar } from 'react-bootstrap';
import { getWorkoutSummary } from '../services/workouts';

function Dashboard() {
  const [summary, setSummary] = useState({
    total_workouts: 0,
    recent_workouts: [],
    total_calories: 0,
    total_duration: 0,
    avg_duration: 0,
    workouts_this_week: 0,
    workouts_this_month: 0
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkoutSummary();
  }, []);

  const fetchWorkoutSummary = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching workout summary...');
      console.log('Current token:', localStorage.getItem('authToken'));
      const response = await getWorkoutSummary();
      console.log('Workout summary response:', response);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching workout summary:', error);
      setError('Failed to load workout summary. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Workouts</Card.Title>
              <Card.Text className="h2">{summary.total_workouts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Calories Burned</Card.Title>
              <Card.Text className="h2">{summary.total_calories}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Duration</Card.Title>
              <Card.Text className="h2">{(summary.total_duration / 60).toFixed(1)} hours</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Avg. Duration</Card.Title>
              <Card.Text className="h2">{Math.round(summary.avg_duration)} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Weekly Progress</Card.Title>
              <ProgressBar now={(summary.workouts_this_week / 7) * 100} label={`${summary.workouts_this_week}/7`} />
              <Card.Text className="mt-2">{summary.workouts_this_week} workouts this week</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Progress</Card.Title>
              <ProgressBar now={(summary.workouts_this_month / 30) * 100} label={`${summary.workouts_this_month}/30`} />
              <Card.Text className="mt-2">{summary.workouts_this_month} workouts this month</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Recent Workouts</Card.Title>
              {summary.recent_workouts && summary.recent_workouts.length > 0 ? (
                <ul className="list-unstyled">
                  {summary.recent_workouts.map((workout) => (
                    <li key={workout.id} className="mb-2">
                      <strong>{workout.workout_type_display}</strong> - {new Date(workout.date_logged).toLocaleDateString()} - {workout.duration_hours.toFixed(2)} hours
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