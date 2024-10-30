import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Activity, Clock, Flame, Calendar } from 'lucide-react';
import { useWorkouts } from '../../context/WorkoutContext';

const WORKOUT_TYPES = [
    { value: 'cardio', label: 'Cardio' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' }
];

const LogWorkout = () => {
    const navigate = useNavigate();
    const { createWorkout } = useWorkouts();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [workoutData, setWorkoutData] = useState({
        workout_type: '',
        duration: '',
        calories: '',
        date_logged: new Date().toISOString().split('T')[0],
        notes: '',
        intensity: 'moderate'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData(prev => ({
            ...prev,
            [name]: name === 'duration' || name === 'calories' ? 
                    Number(value) || '' : 
                    value
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        const errors = {};
        if (!workoutData.workout_type) errors.workout_type = 'Please select a workout type';
        if (!workoutData.duration) errors.duration = 'Duration is required';
        if (workoutData.duration < 1 || workoutData.duration > 1440) {
            errors.duration = 'Duration must be between 1 and 1440 minutes';
        }
        if (!workoutData.calories) errors.calories = 'Calories is required';
        if (!workoutData.date_logged) errors.date_logged = 'Date is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setError('Please fill all required fields correctly');
            return;
        }

        try {
            setLoading(true);
            setError('');
            console.log('Submitting workout:', workoutData); // Debug log

            await createWorkout(workoutData);
            navigate('/workouts', { 
                state: { message: 'Workout logged successfully!' }
            });
        } catch (err) {
            console.error('Error logging workout:', err); // Debug log
            setError(err.response?.data?.detail || 'Failed to log workout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log New Workout</h2>
                    
                    {error && (
                        <Alert variant="danger" dismissible onClose={() => setError('')}>
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <Activity className="me-2" />
                                        Workout Type
                                    </Form.Label>
                                    <Form.Select
                                        name="workout_type"
                                        value={workoutData.workout_type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        {WORKOUT_TYPES.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <Clock className="me-2" />
                                        Duration (minutes)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="duration"
                                        value={workoutData.duration}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="1440"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <Flame className="me-2" />
                                        Calories Burned
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="calories"
                                        value={workoutData.calories}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <Calendar className="me-2" />
                                        Date
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_logged"
                                        value={workoutData.date_logged}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notes"
                                value={workoutData.notes}
                                onChange={handleChange}
                                rows={3}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate('/workouts')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Logging Workout...
                                    </>
                                ) : (
                                    'Log Workout'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LogWorkout;