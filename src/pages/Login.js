import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import '../Styles/Login.css';

function Login({ setAuth, setUserInfo }) {  // Added setUserInfo prop
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
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null, form: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await login(formData.username, formData.password);
      
      // Check if response contains the expected data
      if (response && response.access) {
        // Store tokens
        localStorage.setItem('access_token', response.access);
        if (response.refresh) {
          localStorage.setItem('refresh_token', response.refresh);
        }

        // Update authentication state
        setAuth(true);

        // Update user info if it's included in the response
        if (response.user) {
          setUserInfo(response.user);
        }

        // Redirect to dashboard instead of home
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 401) {
          setErrors({ form: 'Invalid username or password' });
        } else if (error.response.data?.detail) {
          setErrors({ form: error.response.data.detail });
        } else {
          setErrors({ form: 'Login failed. Please try again.' });
        }
      } else if (error.request) {
        // Request was made but no response
        setErrors({ form: 'Network error. Please check your connection.' });
      } else {
        // Something else went wrong
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow auth-card login-card">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              disabled={isLoading}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              disabled={isLoading}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {errors.form && (
            <Alert variant="danger" className="mb-3">
              {errors.form}
            </Alert>
          )}

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
          {/* You might want to add these features later */}
          {/* <div className="mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}
        </div>
      </Card>
    </Container>
  );
}

export default Login;