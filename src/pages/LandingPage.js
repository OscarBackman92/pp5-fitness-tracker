// src/pages/LandingPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Context';
import '../Styles/LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-page">
      <div className="hero-section text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 className="display-4 mb-4">Track Your Fitness Journey</h1>
              <p className="lead mb-4">
                Log your workouts, track your progress, and connect with other fitness enthusiasts.
              </p>
              {isAuthenticated ? (
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="primary"
                  size="lg"
                  className="me-3"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    size="lg"
                    className="me-3"
                  >
                    Get Started
                  </Button>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-primary"
                    size="lg"
                  >
                    Login
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <h3>Track Workouts</h3>
                <p>Log and monitor your exercises, sets, and reps</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <h3>Monitor Progress</h3>
                <p>View detailed statistics and progress charts</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <h3>Connect</h3>
                <p>Join a community of fitness enthusiasts</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;