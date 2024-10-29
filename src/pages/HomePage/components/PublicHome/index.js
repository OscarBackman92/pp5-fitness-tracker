import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const PublicHome = () => (
    <div className={styles.publicHome}>
        <section className={styles.heroSection}>
            <Container>
                <Row className="align-items-center min-vh-100">
                    <Col md={6} className="text-white">
                        <h1 className="display-4 fw-bold mb-4">
                            Transform Your Fitness Journey
                        </h1>
                        <p className="lead mb-4">
                            Track workouts, set goals, and achieve results with our comprehensive fitness platform.
                        </p>
                        <div className="d-flex gap-3">
                            <Link to="/register">
                                <Button size="lg" variant="light">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="lg" variant="outline-light">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </Col>
                    <Col md={6} className="d-none d-md-block">
                        <img 
                            src="/api/placeholder/600/400" 
                            alt="Fitness Tracking" 
                            className="img-fluid rounded shadow-lg"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    </div>
);

export default PublicHome;