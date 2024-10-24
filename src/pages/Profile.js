// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Image } from 'react-bootstrap';
import { useAuth } from '../components/Context';
import '../Styles/Profile.css';

const Profile = () => {
  const { user, updateProfile, error: contextError } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    weight: '',
    height: '',
    fitness_goals: '',
    date_of_birth: '',
    gender: '',
    profile_picture: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
      if (user.profile_picture) {
        setImagePreview(user.profile_picture);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setProfile(prev => ({
        ...prev,
        profile_picture: files[0]
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (profile[key] !== null) {
          formData.append(key, profile[key]);
        }
      });

      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="mb-4">User Profile</h1>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {contextError && <Alert variant="danger" dismissible>{contextError}</Alert>}
      
      <Card>
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
              <div className="profile-picture-container">
                <Image 
                  src={imagePreview || '/default-profile.png'} 
                  roundedCircle 
                  className="profile-picture mb-2"
                  alt="Profile"
                />
                {isEditing && (
                  <Form.Group>
                    <Form.Label className="btn btn-outline-primary btn-sm">
                      Change Picture
                      <Form.Control
                        type="file"
                        name="profile_picture"
                        onChange={handleChange}
                        accept="image/*"
                        hidden
                      />
                    </Form.Label>
                  </Form.Group>
                )}
              </div>
            </Col>
            <Col xs={12} md={9}>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Name:</Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        value={profile.name || ''} 
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Weight (kg):</Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="number" 
                        name="weight" 
                        value={profile.weight || ''} 
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Height (cm):</Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="number" 
                        name="height" 
                        value={profile.height || ''} 
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Date of Birth:</Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        type="date" 
                        name="date_of_birth" 
                        value={profile.date_of_birth || ''} 
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Gender:</Form.Label>
                    <Col sm={9}>
                      <Form.Select 
                        name="gender" 
                        value={profile.gender || ''} 
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Fitness Goals:</Form.Label>
                    <Col sm={9}>
                      <Form.Control 
                        as="textarea" 
                        name="fitness_goals" 
                        value={profile.fitness_goals || ''} 
                        onChange={handleChange}
                        rows={3}
                      />
                    </Col>
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button type="submit" variant="primary" className="me-2">Save Changes</Button>
                    <Button variant="secondary" onClick={() => {
                      setIsEditing(false);
                      setImagePreview(profile.profile_picture);
                    }}>Cancel</Button>
                  </div>
                </Form>
              ) : (
                <>
                  <Row className="mb-3">
                    <Col sm={3}><strong>Name:</strong></Col>
                    <Col sm={9}>{profile.name || 'Not set'}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={3}><strong>Weight:</strong></Col>
                    <Col sm={9}>{profile.weight ? `${profile.weight} kg` : 'Not set'}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={3}><strong>Height:</strong></Col>
                    <Col sm={9}>{profile.height ? `${profile.height} cm` : 'Not set'}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={3}><strong>BMI:</strong></Col>
                    <Col sm={9}>{profile.bmi ? profile.bmi.toFixed(1) : 'Not available'}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={3}><strong>Date of Birth:</strong></Col>
                    <Col sm={9}>{profile.date_of_birth || 'Not set'}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={3}><strong>Gender:</strong></Col>
                    <Col sm={9}>
                      {profile.gender ? 
                        profile.gender === 'M' ? 'Male' : 
                        profile.gender === 'F' ? 'Female' : 
                        'Other' 
                        : 'Not set'}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={3}><strong>Fitness Goals:</strong></Col>
                    <Col sm={9}>{profile.fitness_goals || 'Not set'}</Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;