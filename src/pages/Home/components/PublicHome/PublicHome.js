import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, Users, Award } from 'lucide-react';
import styles from './PublicHome.module.css';

const PublicHome = () => {
    return (
        <div className={styles.publicHome}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Container>
                    <Row className="align-items-center min-vh-100">
                        <Col lg={6} className="text-white">
                            <span className={styles.badge}>🚀 Your Fitness Journey Starts Here</span>
                            <h1 className={styles.title}>Transform Your Fitness Journey</h1>
                            <p className={styles.subtitle}>
                                Track workouts, analyze progress, and achieve your goals with our comprehensive fitness tracking platform.
                            </p>
                            <div className={styles.cta}>
                                <Link to="/register">
                                    <Button size="lg" variant="light" className="me-3">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button size="lg" variant="outline-light">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={6} className="d-none d-lg-block">
                            <img 
                                src="/api/placeholder/600/400" 
                                alt="Fitness Tracking"
                                className={styles.heroImage}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <Container>
                    <h2 className={styles.sectionTitle}>Why Choose Our Platform?</h2>
                    <Row>
                        {FEATURES.map((feature, index) => (
                            <Col key={index} md={3} className="mb-4">
                                <div className={styles.featureCard}>
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                    <p className={styles.featureText}>{feature.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

const FEATURES = [
    {
        icon: <Activity size={32} />,
        title: "Easy Tracking",
        description: "Log your workouts with just a few taps"
    },
    {
        icon: <BarChart2 size={32} />,
        title: "Detailed Analytics",
        description: "Visualize your progress over time"
    },
    {
        icon: <Users size={32} />,
        title: "Community",
        description: "Connect with other fitness enthusiasts"
    },
    {
        icon: <Award size={32} />,
        title: "Achievements",
        description: "Earn badges as you reach your goals"
    }
];

export default PublicHome;