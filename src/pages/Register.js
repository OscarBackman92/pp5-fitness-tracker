import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api/apiService';
import { useAuth } from '../context/AuthContext';

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
    const { isAuthenticated } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        const errors = [];
        
        if (formData.password1.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        
        if (formData.password1 !== formData.password2) {
            errors.push('Passwords do not match');
        }
        
        if (formData.username.length < 3) {
            errors.push('Username must be at least 3 characters long');
        }
        
        if (!formData.email.includes('@')) {
            errors.push('Please enter a valid email address');
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setError(validationErrors.join('\n'));
            return;
        }
    
        setLoading(true);
    
        try {
            console.log('Submitting registration data...');
            await authApi.register(formData); // Removed unused response variable
            console.log('Registration successful');
            navigate('/login', { 
                state: { 
                    message: 'Registration successful! Please log in.',
                    username: formData.username
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.response?.data) {
                const errorData = error.response.data;
                // Handle different error formats
                if (typeof errorData === 'string') {
                    setError(errorData);
                } else if (typeof errorData === 'object') {
                    const errorMessage = Object.entries(errorData)
                        .map(([key, value]) => {
                            // Format the key to be more readable
                            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
                            return `${formattedKey}: ${Array.isArray(value) ? value.join(', ') : value}`;
                        })
                        .join('\n');
                    setError(errorMessage || 'Registration failed');
                }
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
        if (error) setError('');
    };

    if (isAuthenticated) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Redirecting...</p>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            {error && (
                                <Alert 
                                    variant="danger" 
                                    onClose={() => setError('')} 
                                    dismissible 
                                    style={{ whiteSpace: 'pre-line' }}
                                >
                                    {error}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        minLength={3}
                                        disabled={loading}
                                        autoComplete="username"
                                    />
                                    <Form.Text className="text-muted">
                                        Username must be at least 3 characters long
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        autoComplete="email"
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
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                    <Form.Text className="text-muted">
                                        Password must be at least 8 characters long
                                    </Form.Text>
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
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                </Form.Group>

                                <Button 
                                    className="w-100" 
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
                                            Registering...
                                        </>
                                    ) : (
                                        'Register'
                                    )}
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