import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWorkoutSummary } from '../services/workouts';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    recentWorkouts: [],
    caloriesBurned: 0
  });

  useEffect(() => {
    fetchWorkoutSummary();
  }, []);

  const fetchWorkoutSummary = async () => {
    try {
      const response = await getWorkoutSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching workout summary:', error);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Workouts</Card.Title>
              <Card.Text>{summary.totalWorkouts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Calories Burned</Card.Title>
              <Card.Text>{summary.caloriesBurned} kcal</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <Button as={Link} to="/workouts/new" variant="primary" className="me-2">
                Log Workout
              </Button>
              <Button as={Link} to="/workouts" variant="secondary">
                View All
              </Button>
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
                <ul>
                  {summary.recentWorkouts.map((workout, index) => (
                    <li key={index}>
                      {workout.name} - {workout.date}
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