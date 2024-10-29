import React, { useState, useRef } from 'react';
import { Navbar, Nav, Container, Dropdown, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, User, LogOut, BarChart2, Settings, Dumbbell, Home } from 'lucide-react';

const NavigationBar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const navToggleRef = useRef(null);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            setExpanded(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const isActive = (path) => location.pathname === path;

    // Handle navigation and collapse
    const handleNavigation = () => {
        setExpanded(false);
    };

    return (
        <Navbar 
            bg="white" 
            expand="lg" 
            fixed="top" 
            className="navbar-light border-bottom"
            expanded={expanded}
            onToggle={setExpanded}
        >
            <Container>
                {/* Brand */}
                <Navbar.Brand 
                    as={Link} 
                    to="/" 
                    className="d-flex align-items-center"
                    onClick={handleNavigation}
                >
                    <Activity size={24} className="text-primary me-2" />
                    <span className="fw-bold">FitTrack</span>
                </Navbar.Brand>

                <Navbar.Toggle 
                    ref={navToggleRef}
                    aria-controls="basic-navbar-nav" 
                />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2">
                        {/* Home Link - Always visible */}
                        <Nav.Link 
                            as={Link} 
                            to="/"
                            className={`d-flex align-items-center ${isActive('/') ? 'active fw-bold' : ''}`}
                            onClick={handleNavigation}
                        >
                            <Home size={16} className="me-1" />
                            Home
                        </Nav.Link>

                        {isAuthenticated ? (
                            <>
                                {/* Dashboard Link */}
                                <Nav.Link 
                                    as={Link} 
                                    to="/dashboard"
                                    className={`d-flex align-items-center ${isActive('/dashboard') ? 'active fw-bold' : ''}`}
                                    onClick={handleNavigation}
                                >
                                    <BarChart2 size={16} className="me-1" />
                                    Dashboard
                                </Nav.Link>

                                {/* Workouts Link */}
                                <Nav.Link 
                                    as={Link} 
                                    to="/workouts"
                                    className={`d-flex align-items-center ${isActive('/workouts') ? 'active fw-bold' : ''}`}
                                    onClick={handleNavigation}
                                >
                                    <Dumbbell size={16} className="me-1" />
                                    Workouts
                                </Nav.Link>

                                {/* Profile Dropdown */}
                                <Dropdown align="end">
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        id="dropdown-basic"
                                        className="d-flex align-items-center rounded-pill border shadow-sm py-1"
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            {user?.profile_picture ? (
                                                <img 
                                                    src={user.profile_picture} 
                                                    alt={user.username}
                                                    className="rounded-circle"
                                                    style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                                                     style={{ width: '28px', height: '28px' }}>
                                                    <User size={16} />
                                                </div>
                                            )}
                                            <span className="d-none d-md-block me-1">{user?.username}</span>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="shadow-sm border-0">
                                        <Dropdown.Item 
                                            as={Link} 
                                            to="/profile" 
                                            className="d-flex align-items-center"
                                            onClick={handleNavigation}
                                        >
                                            <User size={16} className="me-2" />
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item 
                                            as={Link} 
                                            to="/settings" 
                                            className="d-flex align-items-center"
                                            onClick={handleNavigation}
                                        >
                                            <Settings size={16} className="me-2" />
                                            Settings
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item 
                                            onClick={() => {
                                                handleNavigation();
                                                handleLogout();
                                            }}
                                            className="text-danger d-flex align-items-center"
                                            disabled={isLoggingOut}
                                        >
                                            {isLoggingOut ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        className="me-2"
                                                    />
                                                    Logging out...
                                                </>
                                            ) : (
                                                <>
                                                    <LogOut size={16} className="me-2" />
                                                    Logout
                                                </>
                                            )}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link 
                                    as={Link} 
                                    to="/login"
                                    className={`btn btn-outline-primary me-2 ${isActive('/login') ? 'active' : ''}`}
                                    onClick={handleNavigation}
                                >
                                    Login
                                </Nav.Link>
                                <Button
                                    as={Link}
                                    to="/register"
                                    variant="primary"
                                    className="rounded-pill px-4"
                                    onClick={handleNavigation}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;