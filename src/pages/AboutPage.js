// src/pages/AboutPage.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">About Fitness Tracker</h1>
          <p className="lead">
            Fitness Tracker is a comprehensive platform designed to help you achieve
            your fitness goals through effective workout tracking and community support.
          </p>
          <hr className="my-4" />
          <h2>Our Mission</h2>
          <p>
            We believe in making fitness tracking simple and accessible to everyone.
            Our platform helps you monitor your progress, connect with like-minded
            individuals, and stay motivated on your fitness journey.
          </p>
          <h2>Features</h2>
          <ul>
            <li>Track your workouts and progress</li>
            <li>Connect with other fitness enthusiasts</li>
            <li>Get insights into your fitness journey</li>
            <li>Share your achievements</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;