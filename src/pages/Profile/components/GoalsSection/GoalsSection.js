import React, { useState } from 'react';
import { Card, Form, Button, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import { Target, Plus, X } from 'lucide-react';
import { useProfile } from '../../../../context/ProfileContext';
import { profileService } from '../../../../services/profileService';

const GOAL_TYPES = [
    { value: 'weight', label: 'Weight Goal' },
    { value: 'workout', label: 'Workout Frequency' },
    { value: 'strength', label: 'Strength Goal' },
    { value: 'cardio', label: 'Cardio Goal' },
    { value: 'custom', label: 'Custom Goal' }
];

const GoalsSection = () => {
    const { goals, loading, error } = useProfile();
    const [newGoal, setNewGoal] = useState({
        type: 'weight',
        description: '',
        target: '',
        deadline: ''
    });
    const [submitError, setSubmitError] = useState('');

    const handleAddGoal = async (e) => {
        e.preventDefault();
        if (!newGoal.description || !newGoal.target) {
            setSubmitError('Please fill in all required fields');
            return;
        }

        try {
            await profileService.createGoal(newGoal);
            setNewGoal({
                type: 'weight',
                description: '',
                target: '',
                deadline: ''
            });
            setSubmitError('');
        } catch (error) {
            console.error('Error adding goal:', error);
            setSubmitError(error.response?.data?.detail || 'Failed to add goal');
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            await profileService.deleteGoal(goalId);
        } catch (error) {
            console.error('Error deleting goal:', error);
            setSubmitError(error.response?.data?.detail || 'Failed to delete goal');
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex align-items-center mb-4">
                    <Target size={24} className="me-2" />
                    Fitness Goals
                </Card.Title>

                {(error || submitError) && (
                    <Alert variant="danger" className="mb-3" dismissible onClose={() => setSubmitError('')}>
                        {error || submitError}
                    </Alert>
                )}

                <Form onSubmit={handleAddGoal} className="mb-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Goal Type</Form.Label>
                        <Form.Select
                            value={newGoal.type}
                            onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                        >
                            {GOAL_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={newGoal.description}
                            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                            placeholder="e.g., Reach 70kg"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Target</Form.Label>
                        <Form.Control
                            type="text"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            placeholder="e.g., 70"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Target Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        />
                    </Form.Group>

                    <Button 
                        type="submit" 
                        variant="primary"
                        disabled={loading}
                        className="w-100"
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
                                Adding Goal...
                            </>
                        ) : (
                            <>
                                <Plus size={18} className="me-1" />
                                Add Goal
                            </>
                        )}
                    </Button>
                </Form>

                <ListGroup>
                    {goals?.map(goal => (
                        <ListGroup.Item
                            key={goal.id}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <Badge bg="primary" className="me-2">
                                    {GOAL_TYPES.find(t => t.value === goal.type)?.label}
                                </Badge>
                                <span>{goal.description}</span>
                                <small className="text-muted d-block">
                                    Target: {goal.target}
                                    {goal.deadline && ` | Due: ${new Date(goal.deadline).toLocaleDateString()}`}
                                </small>
                            </div>
                            <Button
                                variant="link"
                                className="text-danger"
                                onClick={() => handleDeleteGoal(goal.id)}
                                disabled={loading}
                            >
                                <X size={18} />
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {goals?.length === 0 && (
                    <Alert variant="info">
                        No goals set yet. Add your first goal above!
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default GoalsSection;