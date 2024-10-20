import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, Users, Award } from 'lucide-react';
import '../Styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="hero-title">Transform Your Fitness Journey</h1>
              <p className="hero-subtitle">Track workouts, analyze progress, and achieve your goals with Fitness Tracker. Your personal fitness companion, right in your pocket.</p>
              <Link to="/register">
                <Button variant="primary" size="lg" className="me-3 mb-2">Start Free Trial</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-light" size="lg" className="mb-2">Log In</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features">
        <Container>
          <h2 className="section-title">Why Choose Fitness Tracker?</h2>
          <Row>
            {[
              { icon: <Activity size={40} />, title: "Easy Workout Logging", description: "Log your exercises, duration, and calories burned with just a few taps." },
              { icon: <BarChart2 size={40} />, title: "Insightful Analytics", description: "Visualize your progress over time with intuitive charts and graphs." },
              { icon: <Users size={40} />, title: "Community Support", description: "Connect with fellow fitness enthusiasts for motivation and tips." },
              { icon: <Award size={40} />, title: "Goal Setting & Achievements", description: "Set personalized goals and earn badges for your accomplishments." }
            ].map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="feature-card">
                  <Card.Body>
                    <div className="feature-icon">{feature.icon}</div>
                    <Card.Title className="feature-title">{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="section-title">What Our Users Say</h2>
              <blockquote className="testimonial-quote">
                <p>"Fitness Tracker has revolutionized my workout routine. I've never been more consistent and motivated!"</p>
                <footer className="testimonial-author">Sarah J., lost 20 lbs in 3 months</footer>
              </blockquote>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="section-title">Ready to Start Your Fitness Journey?</h2>
              <p className="cta-subtitle">Join thousands of users who are transforming their lives with Fitness Tracker.</p>
              <Link to="/register">
                <Button variant="primary" size="lg" className="cta-button">Sign Up Now - It's Free!</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;