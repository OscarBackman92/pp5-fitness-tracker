import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Dashboard({ userInfo }) {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Example labels
    datasets: [
      {
        label: 'Workouts',
        data: userInfo?.weekly_workout_data || [0, 0, 0, 0, 0, 0, 0], // Example data
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Container className="mt-4">
      <h1>Welcome back, {userInfo?.username || userInfo?.name || 'User'}!</h1>
      
      <Row className="mt-4">
        {/* Quick Stats Card */}
        <Col md={6} lg={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Quick Stats</Card.Title>
              <Card.Text>
                Total Workouts: {userInfo?.total_workouts || 0}<br />
                This Week: {userInfo?.workouts_this_week || 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activity Card */}
        <Col md={6} lg={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <Card.Text>
                Last Workout: {userInfo?.last_workout_date || 'N/A'}<br />
                Type: {userInfo?.last_workout_type || 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Goals Card */}
        <Col md={6} lg={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Goals</Card.Title>
              <Card.Text>
                Weekly Goal: {userInfo?.weekly_goal || 'Not set'}<br />
                Progress: {userInfo?.goal_progress || '0%'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions Card */}
        <Col md={6} lg={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <Link to="/workouts/new" className="btn btn-primary d-block mb-2">Log Workout</Link>
              <Link to="/workouts" className="btn btn-outline-primary d-block">View History</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Progress Chart */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Weekly Progress</Card.Title>
              <Line data={data} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
