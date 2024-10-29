import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Activity, Clock, Flame, Plus } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import SocialFeed from '../../../Social/SocialFeed';
import styles from './AuthenticatedHome.module.css';

const AuthenticatedHome = () => {
    const { user } = useAuth();
    const stats = {
        totalWorkouts: 9,
        thisWeek: 9,
        avgCalories: 130,
        totalDuration: 224
    };

    return (
        <Container className={styles.container}>
            <Row>
                {/* Left Column - Stats & Actions */}
                <Col lg={8}>
                    {/* Welcome Section */}
                    <div className={styles.welcome}>
                        <h1>Welcome back, {user?.username}! 👋</h1>
                        <p>Track your progress and crush your fitness goals.</p>
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.actions}>
                        <Link to="/workouts/new">
                            <Button variant="primary" className={styles.mainAction}>
                                <Plus size={20} className="me-2" />
                                Log New Workout
                            </Button>
                        </Link>
                        <Link to="/workouts">
                            <Button variant="outline-primary">
                                View All Workouts
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Overview */}
                    <Row className="g-4 mt-2">
                        <Col md={3}>
                            <Card className={styles.statCard}>
                                <Card.Body>
                                    <div className={styles.statIcon}>
                                        <Activity size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.totalWorkouts}</div>
                                    <div className={styles.statLabel}>Total Workouts</div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className={styles.statCard}>
                                <Card.Body>
                                    <div className={`${styles.statIcon} ${styles.thisWeek}`}>
                                        <Activity size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.thisWeek}</div>
                                    <div className={styles.statLabel}>This Week</div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className={styles.statCard}>
                                <Card.Body>
                                    <div className={`${styles.statIcon} ${styles.calories}`}>
                                        <Flame size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.avgCalories}</div>
                                    <div className={styles.statLabel}>Avg Calories</div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className={styles.statCard}>
                                <Card.Body>
                                    <div className={`${styles.statIcon} ${styles.duration}`}>
                                        <Clock size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.totalDuration}</div>
                                    <div className={styles.statLabel}>Total Duration (min)</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                {/* Right Column - Social Feed */}
                <Col lg={4} className="mt-4 mt-lg-0">
                    <Card className={styles.feedCard}>
                        <Card.Body>
                            <h5 className={styles.feedTitle}>Community Feed</h5>
                            <SocialFeed />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthenticatedHome;