import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import '../Styles/Login.css';

function Login({ setAuth, setUserInfo }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null, form: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      console.log('Attempting login with:', formData.username);
      const response = await login(formData.username, formData.password);
      console.log('Login successful:', response);
      
      setAuth(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: error.response?.data?.non_field_errors?.[0] || 
              error.response?.data?.detail ||
              'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow auth-card login-card">
        <h2 className="text-center mb-4">Login</h2>
        
        {errors.form && (
          <Alert variant="danger" className="mb-4">
            {errors.form}
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
              isInvalid={!!errors.username}
              disabled={isLoading}
              autoComplete="username"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading} 
            className="w-100 mb-3"
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <div>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
          {/* Uncomment when implementing forgot password
          <div className="mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          */}
        </div>
      </Card>
    </Container>
  );
}

export default Login;