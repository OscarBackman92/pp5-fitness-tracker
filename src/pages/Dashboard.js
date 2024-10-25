import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import axiosInstance from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axiosInstance.get('/workouts/');
        setWorkouts(response.data.results);
      } catch (error) {
        setError('Failed to fetch workouts');
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">Welcome, {user?.username}!</h1>
      <Row>
        {workouts.map((workout) => (
          <Col key={workout.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{workout.title}</Card.Title>
                <Card.Text>{workout.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Duration: {workout.duration} min
                  </small>
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
