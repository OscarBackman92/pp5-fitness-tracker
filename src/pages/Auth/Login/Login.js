import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError('');
            setLoading(true);
            console.log('Attempting login with:', formData.username);
            await login(formData.username, formData.password);
            
            const from = location.state?.from || '/dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 400) {
                setError('Invalid username or password');
            } else if (err.response?.status === 429) {
                setError('Too many login attempts. Please try again later.');
            } else {
                setError(err.response?.data?.detail || 'Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
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
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && (
                                <Alert 
                                    variant="danger" 
                                    onClose={() => setError('')} 
                                    dismissible
                                >
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
                                        disabled={loading}
                                        autoComplete="username"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        autoComplete="current-password"
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
                                            Logging in...
                                        </>
                                    ) : (
                                        'Log In'
                                    )}
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                Need an account? <Link to="/register">Sign Up</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;