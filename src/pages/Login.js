// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Add handleChange function
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const response = await login(formData.username, formData.password);
      if (response?.key) {
        localStorage.setItem('access_token', response.key);
        navigate('/'); // Redirect to home/main page first
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  className="w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Log In'}
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