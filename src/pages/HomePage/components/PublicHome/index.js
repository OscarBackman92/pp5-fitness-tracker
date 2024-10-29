import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StatsCounter } from './components';
import { useHeroAnimation } from './hooks/useHeroAnimation';
import { HERO_CONTENT } from './constants';
import styles from './styles.module.css';

// Background shapes component defined in the same file for simplicity
const BackgroundShapes = () => {
    return (
        <div className={styles.backgroundShapes}>
            <div className={`${styles.shape} ${styles.shape1}`} />
            <div className={`${styles.shape} ${styles.shape2}`} />
            <div className={styles.gridPattern} />
        </div>
    );
};

const HeroSection = ({ customContent, onCtaClick }) => {
    const { animationRef } = useHeroAnimation();

    const content = {
        ...HERO_CONTENT,
        ...customContent
    };

    return (
        <section className={styles.heroSection} ref={animationRef}>
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col lg={6} className="py-5">
                        <Badge 
                            bg="light" 
                            text="dark" 
                            className={styles.heroBadge}
                        >
                            {content.badge}
                        </Badge>
                        
                        <h1 className={styles.heroTitle}>
                            {content.title}
                        </h1>

                        <p className={styles.heroDescription}>
                            {content.description}
                        </p>

                        <div className={styles.ctaContainer}>
                            <Link to="/register">
                                <Button 
                                    variant="light" 
                                    size="lg" 
                                    className={styles.primaryCta}
                                    onClick={() => onCtaClick?.('register')}
                                >
                                    {content.primaryCta}
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button 
                                    variant="outline-light" 
                                    size="lg"
                                    className={styles.secondaryCta}
                                    onClick={() => onCtaClick?.('login')}
                                >
                                    {content.secondaryCta}
                                </Button>
                            </Link>
                        </div>
                        
                        <StatsCounter stats={content.stats} />
                    </Col>

                    <Col lg={6} className="d-none d-lg-block">
                        <img 
                            src={content.heroImage}
                            alt={content.imageAlt}
                            className={styles.heroImage}
                        />
                    </Col>
                </Row>
            </Container>

            <BackgroundShapes />
        </section>
    );
};

HeroSection.propTypes = {
    customContent: PropTypes.shape({
        badge: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        primaryCta: PropTypes.string,
        secondaryCta: PropTypes.string,
        heroImage: PropTypes.string,
        imageAlt: PropTypes.string,
        stats: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }))
    }),
    onCtaClick: PropTypes.func
};

export default HeroSection;