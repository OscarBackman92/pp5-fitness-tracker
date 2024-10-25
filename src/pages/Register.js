// src/pages/Register.js
import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Styles/Register.css';

function Register() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: {
      name: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'profile.name') {
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          name: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
        form: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile: formData.profile.name ? { name: formData.profile.name } : {}
      };

      // Register the user
      await register(registrationData);
      setSuccess('Registration successful!');

      // Automatically log them in
      try {
        await login(formData.username, formData.password);
        // The login function in context will handle navigation to dashboard
      } catch (loginError) {
        // If auto-login fails, navigate to login page
        setSuccess('Registration successful! Please log in.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const newErrors = {};
        Object.entries(error).forEach(([key, value]) => {
          newErrors[key] = Array.isArray(value) ? value[0] : value;
        });
        setErrors(newErrors);
      } else {
        setErrors({ 
          form: error.message || 'Registration failed. Please check your connection and try again.' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow auth-card register-card">
        <h2 className="text-center mb-4">Create an Account</h2>
        
        {success && <Alert variant="success">{success}</Alert>}
        {errors.form && <Alert variant="danger">{errors.form}</Alert>}
        
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Display Name (Optional)</Form.Label>
            <Form.Control
              name="profile.name"
              type="text"
              value={formData.profile.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Must be at least 8 characters and include uppercase, lowercase, and numbers
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
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
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </Card>
    </Container>
  );
}

export default Register;