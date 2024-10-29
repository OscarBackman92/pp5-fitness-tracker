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
        <Container>
            <Row>
                {/* Left Column - Stats & Actions */}
                <Col lg={8}>
                    <div className={styles.welcome}>
                        <h1>Welcome back, {user?.username}! 👋</h1>
                        <p>Track your progress and crush your fitness goals.</p>
                    </div>

                    <div className={styles.actions}>
                        <Link to="/workouts/new">
                            <Button variant="primary" className={`${styles.mainAction} hover-lift`}>
                                <Plus size={20} className="me-2" />
                                Log New Workout
                            </Button>
                        </Link>
                        <Link to="/workouts">
                            <Button variant="outline-primary" className="hover-lift">
                                View All Workouts
                            </Button>
                        </Link>
                    </div>

                    <Row className="g-4">
                        {/* Total Workouts */}
                        <Col md={3}>
                            <Card className="shadow-sm hover-lift">
                                <Card.Body>
                                    <div className={`${styles.statIcon} ${styles.primary}`}>
                                        <Activity size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.totalWorkouts}</div>
                                    <div className={styles.statLabel}>Total Workouts</div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* This Week */}
                        <Col md={3}>
                            <Card className="shadow-sm hover-lift">
                                <Card.Body>
                                    <div className={`${styles.statIcon} ${styles.thisWeek}`}>
                                        <Activity size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.thisWeek}</div>
                                    <div className={styles.statLabel}>This Week</div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Calories */}
                        <Col md={3}>
                            <Card className="shadow-sm hover-lift">
                                <Card.Body>
                                    <div className={`${styles.statIcon} ${styles.calories}`}>
                                        <Flame size={24} />
                                    </div>
                                    <div className={styles.statValue}>{stats.avgCalories}</div>
                                    <div className={styles.statLabel}>Avg Calories</div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Duration */}
                        <Col md={3}>
                            <Card className="shadow-sm hover-lift">
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
                    <Card className="shadow-sm">
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