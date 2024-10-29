import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { profileService } from '../../services/profileService';
import { Bell, Shield, Sliders } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();
    const { loading, error } = useProfile();
    const [successMessage, setSuccessMessage] = useState('');
    const [submitError, setError] = useState('');
    const [settings, setSettings] = useState({
        emailNotifications: true,
        workoutReminders: true,
        goalUpdates: true,
        weeklyReports: true,

        theme: 'light',
        language: 'en',
        measurementUnit: 'metric',
        timeFormat: '24h',

        profileVisibility: 'public',
        showWorkouts: true,
        showProgress: true,

        defaultWorkoutDuration: 60,
        calorieTracking: true,
        autoPause: true,
    });

    useEffect(() => {
        if (user?.settings) {
            setSettings(prevSettings => ({
                ...prevSettings,
                ...user.settings
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSuccessMessage('');
            setError('');
            const response = await profileService.updateSettings(settings);
            console.log('Settings update response:', response);
            setSuccessMessage('Settings updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error updating settings:', error);
            setError(error.response?.data?.detail || 'Failed to update settings');
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">Settings</h2>

            {error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )}

            {submitError && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {submitError}
                </Alert>
            )}

            {successMessage && (
                <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                {/* Notification Settings */}
                <Card className="mb-4">
                    <Card.Header className="d-flex align-items-center">
                        <Bell size={18} className="me-2" />
                        <h5 className="mb-0">Notification Preferences</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="emailNotifications"
                                        name="emailNotifications"
                                        label="Email Notifications"
                                        checked={settings.emailNotifications}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="workoutReminders"
                                        name="workoutReminders"
                                        label="Workout Reminders"
                                        checked={settings.workoutReminders}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Display Settings */}
                <Card className="mb-4">
                    <Card.Header className="d-flex align-items-center">
                        <Sliders size={18} className="me-2" />
                        <h5 className="mb-0">Display Settings</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Theme</Form.Label>
                                    <Form.Select
                                        name="theme"
                                        value={settings.theme}
                                        onChange={handleChange}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="system">System Default</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Measurement Unit</Form.Label>
                                    <Form.Select
                                        name="measurementUnit"
                                        value={settings.measurementUnit}
                                        onChange={handleChange}
                                    >
                                        <option value="metric">Metric (kg, km)</option>
                                        <option value="imperial">Imperial (lbs, miles)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Privacy Settings */}
                <Card className="mb-4">
                    <Card.Header className="d-flex align-items-center">
                        <Shield size={18} className="me-2" />
                        <h5 className="mb-0">Privacy Settings</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Profile Visibility</Form.Label>
                                    <Form.Select
                                        name="profileVisibility"
                                        value={settings.profileVisibility}
                                        onChange={handleChange}
                                    >
                                        <option value="public">Public</option>
                                        <option value="friends">Friends Only</option>
                                        <option value="private">Private</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="showWorkouts"
                                        name="showWorkouts"
                                        label="Share Workout History"
                                        checked={settings.showWorkouts}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <div className="d-flex justify-content-end">
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
                                Saving...
                            </>
                        ) : (
                            'Save Settings'
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Settings;