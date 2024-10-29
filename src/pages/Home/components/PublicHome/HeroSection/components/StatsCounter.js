import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styles from './StatsCounter.module.css';

const StatsCounter = ({ stats }) => (
    <Row className={styles.statsContainer}>
        {stats.map(({ label, value }, index) => (
            <Col md={4} key={index}>
                <div className={styles.statItem}>
                    <div className="text-white-50 mb-1">{label}</div>
                    <h3 className="mb-0">{value}</h3>
                </div>
            </Col>
        ))}
    </Row>
);

StatsCounter.propTypes = {
    stats: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired
};

export default StatsCounter;