import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, User, LogOut, BarChart2, Settings } from 'lucide-react';
import '../Styles/Navbar.css';

const NavigationBar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-custom">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <Activity size={24} className="me-2" />
                    Fitness App
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link 
                                    as={Link} 
                                    to="/dashboard"
                                    className={isActive('/dashboard') ? 'active' : ''}
                                >
                                    <BarChart2 size={18} className="me-1" />
                                    Dashboard
                                </Nav.Link>
                                
                                <Dropdown align="end" className="ms-2">
                                    <Dropdown.Toggle 
                                        variant="dark" 
                                        id="dropdown-basic"
                                        className="nav-dropdown-toggle"
                                    >
                                        {user?.profile_picture ? (
                                            <img 
                                                src={user.profile_picture} 
                                                alt={user.username}
                                                className="profile-picture me-2"
                                            />
                                        ) : (
                                            <User size={18} className="me-2" />
                                        )}
                                        {user?.username}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/profile">
                                            <User size={16} className="me-2" />
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/settings">
                                            <Settings size={16} className="me-2" />
                                            Settings
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item 
                                            onClick={handleLogout}
                                            className="text-danger"
                                            disabled={isLoggingOut}
                                        >
                                            {isLoggingOut ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
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
                                    className={isActive('/login') ? 'active' : ''}
                                >
                                    Login
                                </Nav.Link>
                                <Button
                                    as={Link}
                                    to="/register"
                                    variant="outline-light"
                                    className="ms-2"
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default NavigationBar;