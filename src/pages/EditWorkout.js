import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Activity, Clock, Flame, Calendar, FileText } from 'lucide-react';
import { useWorkouts } from '../context/WorkoutContext';

const WORKOUT_TYPES = [
    { value: 'cardio', label: 'Cardio', icon: <Activity /> },
    { value: 'strength', label: 'Strength Training', icon: <Activity /> },
    { value: 'flexibility', label: 'Flexibility', icon: <Activity /> },
    { value: 'sports', label: 'Sports', icon: <Activity /> },
    { value: 'other', label: 'Other', icon: <Activity /> }
];

const INTENSITY_LEVELS = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' }
];

function EditWorkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { workouts, updateWorkout, loading, error: contextError } = useWorkouts();
    
    const [workoutData, setWorkoutData] = useState({
        workout_type: '',
        duration: '',
        calories: '',
        date_logged: '',
        notes: '',
        intensity: 'moderate'
    });
    
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    // Load workout data
    useEffect(() => {
        const workout = workouts.find(w => w.id === Number(id));
        if (workout) {
            setWorkoutData({
                workout_type: workout.workout_type,
                duration: workout.duration,
                calories: workout.calories,
                date_logged: workout.date_logged,
                notes: workout.notes || '',
                intensity: workout.intensity || 'moderate'
            });
        } else {
            setSubmitError('Workout not found');
        }
    }, [id, workouts]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!workoutData.workout_type) {
            newErrors.workout_type = 'Please select a workout type';
        }
        if (!workoutData.duration) {
            newErrors.duration = 'Duration is required';
        } else if (workoutData.duration < 1 || workoutData.duration > 1440) {
            newErrors.duration = 'Duration must be between 1 and 1440 minutes';
        }
        if (!workoutData.calories) {
            newErrors.calories = 'Calories is required';
        } else if (workoutData.calories < 0) {
            newErrors.calories = 'Calories cannot be negative';
        }
        if (!workoutData.date_logged) {
            newErrors.date_logged = 'Date is required';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData(prevData => ({
            ...prevData,
            [name]: name === 'duration' || name === 'calories' ? Number(value) || '' : value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setSubmitError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            await updateWorkout(id, workoutData);
            navigate(`/workouts/${id}`, { 
                state: { message: 'Workout updated successfully!' }
            });
        } catch (error) {
            setSubmitError(
                error.response?.data?.detail || 
                'Failed to update workout. Please try again.'
            );
        }
    };

    if (!workoutData.workout_type && !loading) {
        return (
            <Container>
                <Alert variant="danger">
                    Workout not found. 
                    <Link to="/workouts" className="ms-2">Return to workouts list</Link>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="edit-workout-container">
            <Card>
                <Card.Body>
                    <div className="text-center mb-4">
                        <h2>Edit Workout</h2>
                        <p className="text-muted">Update your workout details</p>
                    </div>

                    {(submitError || contextError) && (
                        <Alert 
                            variant="danger" 
                            dismissible 
                            onClose={() => setSubmitError('')}
                        >
                            {submitError || contextError}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center">
                                        <Activity size={18} className="me-2" />
                                        Workout Type
                                    </Form.Label>
                                    <Form.Select
                                        name="workout_type"
                                        value={workoutData.workout_type}
                                        onChange={handleChange}
                                        isInvalid={!!errors.workout_type}
                                    >
                                        <option value="">Select a workout type</option>
                                        {WORKOUT_TYPES.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.workout_type}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Intensity Level</Form.Label>
                                    <Form.Select
                                        name="intensity"
                                        value={workoutData.intensity}
                                        onChange={handleChange}
                                    >
                                        {INTENSITY_LEVELS.map(level => (
                                            <option key={level.value} value={level.value}>
                                                {level.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center">
                                        <Clock size={18} className="me-2" />
                                        Duration (minutes)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="duration"
                                        value={workoutData.duration}
                                        onChange={handleChange}
                                        isInvalid={!!errors.duration}
                                        min="1"
                                        max="1440"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.duration}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center">
                                        <Calendar size={18} className="me-2" />
                                        Date
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_logged"
                                        value={workoutData.date_logged}
                                        onChange={handleChange}
                                        isInvalid={!!errors.date_logged}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.date_logged}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center">
                                        <Flame size={18} className="me-2" />
                                        Calories Burned
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="calories"
                                        value={workoutData.calories}
                                        onChange={handleChange}
                                        isInvalid={!!errors.calories}
                                        min="0"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.calories}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex align-items-center">
                                        <FileText size={18} className="me-2" />
                                        Notes
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="notes"
                                        value={workoutData.notes}
                                        onChange={handleChange}
                                        placeholder="Add any additional notes about your workout..."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-between">
                            <Button 
                                variant="outline-secondary" 
                                as={Link} 
                                to={`/workouts/${id}`}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="primary" 
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
                                        Updating...
                                    </>
                                ) : (
                                    'Update Workout'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditWorkout;