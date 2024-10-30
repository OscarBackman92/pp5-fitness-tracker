import React, { useMemo } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Activity, Flame, Clock, TrendingUp } from 'lucide-react';
import styles from './WorkoutStats.module.css';

const WorkoutStats = ({ workouts }) => {
  const stats = useMemo(() => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyWorkouts = workouts.filter(workout => 
      new Date(workout.date_logged) >= lastWeek
    );

    const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);

    return {
      totalWorkouts: workouts.length,
      weeklyWorkouts: weeklyWorkouts.length,
      avgCalories: workouts.length ? Math.round(totalCalories / workouts.length) : 0,
      totalDuration
    };
  }, [workouts]);

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Card className={styles.statCard}>
          <Card.Body>
            <div className="d-flex align-items-center">
              <Activity size={24} className={styles.statIcon} />
              <div className="ms-3">
                <h3 className="mb-0">{stats.totalWorkouts}</h3>
                <p className="text-muted mb-0">Total Workouts</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className={styles.statCard}>
          <Card.Body>
            <div className="d-flex align-items-center">
              <TrendingUp size={24} className={styles.statIcon} />
              <div className="ms-3">
                <h3 className="mb-0">{stats.weeklyWorkouts}</h3>
                <p className="text-muted mb-0">This Week</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className={styles.statCard}>
          <Card.Body>
            <div className="d-flex align-items-center">
              <Flame size={24} className={styles.statIcon} />
              <div className="ms-3">
                <h3 className="mb-0">{stats.avgCalories}</h3>
                <p className="text-muted mb-0">Avg Calories</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className={styles.statCard}>
          <Card.Body>
            <div className="d-flex align-items-center">
              <Clock size={24} className={styles.statIcon} />
              <div className="ms-3">
                <h3 className="mb-0">{stats.totalDuration}</h3>
                <p className="text-muted mb-0">Total Minutes</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default WorkoutStats;