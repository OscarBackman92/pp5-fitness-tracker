// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Context';
import '../Styles/Navbar.css';

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to={isAuthenticated ? "/dashboard" : "/"} className="brand">
          FitnessTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/dashboard" className="nav-link">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/workouts" className="nav-link">
                  Workouts
                </Nav.Link>
                <Nav.Link as={Link} to="/feed" className="nav-link">
                  Social Feed
                </Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown 
                  title={
                    <span className="text-light">
                      {user?.profile?.name || user?.username || 'Profile'}
                    </span>
                  } 
                  id="nav-dropdown"
                  className="nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/about" className="nav-link">
                  About
                </Nav.Link>
                {/* Add more public navigation links here */}
              </Nav>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="outline-light"
                  className="ms-2 register-btn"
                >
                  Register
                </Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;