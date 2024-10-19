import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getWorkoutDetails } from '../services/workouts';

function WorkoutDetails() {
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  const fetchWorkoutDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getWorkoutDetails(id);
      setWorkout(response.data);
    } catch (error) {
      console.error('Error fetching workout details:', error);
      setError('Failed to load workout details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWorkoutDetails();
  }, [fetchWorkoutDetails]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!workout) return <div>No workout found</div>;

  return (
    <Container>
      <h1 className="mb-4">Workout Details</h1>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h2>{workout.workout_type_display}</h2>
              <p>Date: {new Date(workout.date_logged).toLocaleDateString()}</p>
              <p>Duration: {workout.duration} minutes</p>
              <p>Calories Burned: {workout.calories}</p>
            </Col>
            <Col md={6}>
              <h3>Notes</h3>
              <p>{workout.notes || 'No notes for this workout.'}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default WorkoutDetails;