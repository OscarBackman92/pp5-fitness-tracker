import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { getUserProfile, updateUserProfile } from '../services/auth';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (err) {
      setError('Failed to fetch profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container>
      <h1 className="mb-4">User Profile</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Card>
        <Card.Body>
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Username:</Form.Label>
                <Col sm={9}>
                  <Form.Control 
                    type="text" 
                    name="username" 
                    value={profile.username} 
                    onChange={handleChange}
                    readOnly 
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>First Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control 
                    type="text" 
                    name="first_name" 
                    value={profile.first_name} 
                    onChange={handleChange} 
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Last Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control 
                    type="text" 
                    name="last_name" 
                    value={profile.last_name} 
                    onChange={handleChange} 
                  />
                </Col>
              </Form.Group>
              <Button type="submit" variant="primary">Save Changes</Button>
              <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Form>
          ) : (
            <>
              <Row className="mb-3">
                <Col sm={3}><strong>Username:</strong></Col>
                <Col sm={9}>{profile.username}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}><strong>Email:</strong></Col>
                <Col sm={9}>{profile.email}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}><strong>First Name:</strong></Col>
                <Col sm={9}>{profile.first_name}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}><strong>Last Name:</strong></Col>
                <Col sm={9}>{profile.last_name}</Col>
              </Row>
              <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;