import React, { useCallback } from 'react';
import { Alert, Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWorkouts } from '../../context/WorkoutContext';
import { Activity, Flame, Clock } from 'lucide-react';

const WorkoutList = () => {
    const { workouts = [], loading, error, fetchWorkouts } = useWorkouts();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading workouts...</p>
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
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Workouts</h2>
                <Link to="/workouts/new" className="btn btn-primary">
                    Log New Workout
                </Link>
            </div>

            {workouts && workouts.length > 0 ? (
                <div className="workout-list">
                    {workouts.map((workout) => (
                        <div 
                            key={workout.id} 
                            className="card mb-3 workout-card"
                        >
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="card-title d-flex align-items-center">
                                            <Activity size={20} className="me-2" />
                                            {workout.workout_type}
                                        </h5>
                                        <p className="text-muted mb-2">
                                            {formatDate(workout.date_logged)}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <div className="text-muted d-flex align-items-center">
                                            <Clock size={16} className="me-1" />
                                            {workout.duration} min
                                        </div>
                                        <div className="text-muted d-flex align-items-center ms-3">
                                            <Flame size={16} className="me-1" />
                                            {workout.calories} cal
                                        </div>
                                    </div>
                                </div>
                                {workout.notes && (
                                    <p className="card-text mt-2">{workout.notes}</p>
                                )}
                                <div className="mt-3">
                                    <Link 
                                        to={`/workouts/${workout.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                    >
                                        View Details
                                    </Link>
                                    <Link 
                                        to={`/workouts/edit/${workout.id}`}
                                        className="btn btn-outline-secondary btn-sm"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Alert variant="info">
                    <Alert.Heading>No Workouts Found</Alert.Heading>
                    <p>
                        You haven't logged any workouts yet. Start by logging your first workout!
                    </p>
                    <div className="d-flex">
                        <Link to="/workouts/new" className="btn btn-primary">
                            Log Your First Workout
                        </Link>
                    </div>
                </Alert>
            )}
        </Container>
    );
};

export default React.memo(WorkoutList);