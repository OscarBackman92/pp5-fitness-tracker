import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import '../Styles/Navbar.css';

function Navigation({ auth, setAuth, userInfo }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setAuth(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          FitnessTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {auth ? (
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
                <Nav.Link as={Link} to="/profile" className="nav-link profile-link">
                  {userInfo?.profile?.name || userInfo?.username || 'Profile'}
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/register" 
                className="nav-link register-link"
              >
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;