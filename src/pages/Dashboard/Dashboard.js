import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../context/WorkoutContext';
import WorkoutStats from '../../components/workoutstats/WorkoutStats';
import { Clock, Flame } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { workouts, loading, error, fetchWorkouts } = useWorkouts();

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading your fitness data...</p>
      </Container>
    );
  }

  const getWorkoutTypeColor = (type) => {
    const colors = {
      cardio: 'primary',
      strength: 'success',
      flexibility: 'info',
      sports: 'warning',
      other: 'secondary'
    };
    return colors[type] || 'primary';
  };

  return (
    <Container className={styles.dashboardContainer}>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Welcome back, {user?.username}!</h1>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>

      <WorkoutStats workouts={workouts} />

      <Row className="mb-4">
        <Col>
          <Button 
            variant="primary" 
            onClick={() => navigate('/workouts/new')}
            className="me-2"
          >
            Log New Workout
          </Button>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/workouts')}
          >
            View All Workouts
          </Button>
        </Col>
      </Row>

      <h2 className="mb-3">Recent Workouts</h2>
      <Row>
        {workouts.slice(0, 6).map((workout) => (
          <Col key={workout.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg={getWorkoutTypeColor(workout.workout_type)}>
                    {workout.workout_type}
                  </Badge>
                  <small className="text-muted">
                    {new Date(workout.date_logged).toLocaleDateString()}
                  </small>
                </div>
                <div className="workout-stats-row mt-3">
                  <div className="stat-item">
                    <Clock size={16} className="me-1" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="stat-item">
                    <Flame size={16} className="me-1" />
                    <span>{workout.calories} cal</span>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => navigate(`/workouts/${workout.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {workouts.length === 0 && !loading && (
          <Col xs={12}>
            <Alert variant="info">
              <h4>Welcome to Your Fitness Journey!</h4>
              <p>You haven't logged any workouts yet. Start by logging your first workout!</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/workouts/new')}
              >
                Log Your First Workout
              </Button>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;