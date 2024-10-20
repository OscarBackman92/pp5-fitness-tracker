import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-light py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <Link to="/about" className="me-3">About</Link>
            <Link to="/contact" className="me-3">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <a href="https://www.facebook.com" className="text-dark me-4">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.twitter.com" className="text-dark me-4">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com" className="text-dark me-4">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.linkedin.com" className="text-dark">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
