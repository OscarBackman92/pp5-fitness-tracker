import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/auth';
import '../Styles/AppNavbar.css'

function AppNavbar({ auth, setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setAuth(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Fitness Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth ? (
              <>
                <Nav.Link as={Link} to="/" className={isActive('/')}>Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/workouts" className={isActive('/workouts')}>Workouts</Nav.Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className={isActive('/login')}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className={isActive('/register')}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;