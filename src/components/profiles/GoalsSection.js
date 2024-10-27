import React, { useState } from 'react';
import { Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { Target, Plus, X } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const GOAL_TYPES = [
    { value: 'weight', label: 'Weight Goal' },
    { value: 'workout', label: 'Workout Frequency' },
    { value: 'strength', label: 'Strength Goal' },
    { value: 'cardio', label: 'Cardio Goal' },
    { value: 'custom', label: 'Custom Goal' }
];

const GoalsSection = () => {
    const { goals, updateGoals, loading } = useProfile();
    const [newGoal, setNewGoal] = useState({
        type: 'weight',
        description: '',
        target: '',
        deadline: ''
    });

    const handleAddGoal = async (e) => {
        e.preventDefault();
        if (!newGoal.description || !newGoal.target) return;

        try {
            await updateGoals([...goals, { ...newGoal, id: Date.now() }]);
            setNewGoal({
                type: 'weight',
                description: '',
                target: '',
                deadline: ''
            });
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            const updatedGoals = goals.filter(goal => goal.id !== goalId);
            await updateGoals(updatedGoals);
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex align-items-center mb-4">
                    <Target size={24} className="me-2" />
                    Fitness Goals
                </Card.Title>

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
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Target</Form.Label>
                        <Form.Control
                            type="text"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            placeholder="e.g., 70"
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
                        <Plus size={18} className="me-1" />
                        Add Goal
                    </Button>
                </Form>

                <ListGroup>
                    {goals.map(goal => (
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
            </Card.Body>
        </Card>
    );
};

export default GoalsSection;