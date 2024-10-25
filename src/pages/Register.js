import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api/apiService';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate form
        if (formData.password1 !== formData.password2) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Log the data being sent
            console.log('Submitting registration data:', formData);
            
            const response = await authApi.register(formData);
            console.log('Registration success:', response);
            navigate('/login');
        } catch (error) {
            console.error('Registration error details:', error.response?.data);
            
            // Handle different types of error responses
            if (error.response?.data) {
                const errorData = error.response.data;
                const errorMessage = Object.entries(errorData)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n');
                setError(errorMessage || 'Registration failed');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            {error && (
                                <Alert variant="danger" style={{ whiteSpace: 'pre-line' }}>
                                    {error}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        minLength={3}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password1"
                                        value={formData.password1}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password2"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                    />
                                </Form.Group>

                                <Button 
                                    className="w-100" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-2">
                                Already have an account? <Link to="/login">Log In</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;