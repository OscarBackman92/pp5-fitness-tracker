import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, Users, Award } from 'lucide-react';
import Loading from '../components/Loading';

// Public HomePage Component
const PublicHomePage = () => (
  <div className="home-page">
    <section className="hero">
      <Container>
        <Row className="align-items-center">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="hero-title">Transform Your Fitness Journey</h1>
            <p className="hero-subtitle">
              Track workouts, analyze progress, and achieve your goals with Fitness Tracker.
              Your personal fitness companion, right in your pocket.
            </p>
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

    <section className="features">
      <Container>
        <h2 className="section-title">Why Choose Fitness Tracker?</h2>
        <Row>
          {[
            {
              icon: <Activity size={40} />,
              title: "Easy Workout Logging",
              description: "Log your exercises, duration, and calories burned with just a few taps."
            },
            {
              icon: <BarChart2 size={40} />,
              title: "Insightful Analytics",
              description: "Visualize your progress over time with intuitive charts and graphs."
            },
            {
              icon: <Users size={40} />,
              title: "Community Support",
              description: "Connect with fellow fitness enthusiasts for motivation and tips."
            },
            {
              icon: <Award size={40} />,
              title: "Goal Setting & Achievements",
              description: "Set personalized goals and earn badges for your accomplishments."
            }
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

    <section className="cta">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="section-title">Ready to Start Your Fitness Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of users who are transforming their lives with Fitness Tracker.
            </p>
            <Link to="/register">
              <Button variant="primary" size="lg" className="cta-button">Sign Up Now - It's Free!</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  </div>
);

// Authenticated User Dashboard Component
const UserDashboard = ({ userInfo }) => (
  <Container className="mt-4">
    <h1>Welcome back, {userInfo.username || 'User'}!</h1>
    <Row className="mt-4">
      <Col md={6} lg={3} className="mb-4">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Quick Stats</Card.Title>
            <Card.Text>
              Total Workouts: {userInfo.total_workouts || 0}<br />
              This Week: {userInfo.workouts_this_week || 0}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={3} className="mb-4">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Recent Activity</Card.Title>
            <Card.Text>
              Last Workout: {userInfo.last_workout_date || 'N/A'}<br />
              Type: {userInfo.last_workout_type || 'N/A'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={3} className="mb-4">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Goals</Card.Title>
            <Card.Text>
              Weekly Goal: {userInfo.weekly_goal || 'Not set'}<br />
              Progress: {userInfo.goal_progress || '0%'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={3} className="mb-4">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Quick Actions</Card.Title>
            <Link to="/workouts/new">
              <Button variant="primary" className="mb-2 w-100">Log Workout</Button>
            </Link>
            <Link to="/workouts">
              <Button variant="outline-primary" className="w-100">View History</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

// Main HomePage Component
const HomePage = ({ isLoggedIn, userInfo, loading, error }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (isLoggedIn && userInfo) {
    return <UserDashboard userInfo={userInfo} />;
  }

  return <PublicHomePage />;
};

export default HomePage;
