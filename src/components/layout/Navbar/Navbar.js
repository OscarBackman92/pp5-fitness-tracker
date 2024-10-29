import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Activity, LayoutDashboard, Dumbbell } from 'lucide-react';
// Fix the import statement
import styles from './Navbar.module.css';

// Rest of your component code stays the same
const NavigationBar = () => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Navbar className={styles.navbar} bg="white" expand="lg" fixed="top">
            <Container>
                {/* Brand */}
                <Navbar.Brand as={Link} to="/" className={styles.brand}>
                    <Activity className="text-primary" size={24} />
                    <span className="ms-2 fw-bold">FitTrack</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center gap-3">
                        {isAuthenticated && (
                            <>
                                <Nav.Link 
                                    as={Link} 
                                    to="/home"
                                    className={`${styles.navLink} ${isActive('/home') ? styles.active : ''}`}
                                >
                                    Home
                                </Nav.Link>

                                <Nav.Link 
                                    as={Link} 
                                    to="/dashboard"
                                    className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
                                >
                                    <LayoutDashboard size={18} className="me-2" />
                                    Dashboard
                                </Nav.Link>

                                <Nav.Link 
                                    as={Link} 
                                    to="/workouts"
                                    className={`${styles.navLink} ${isActive('/workouts') ? styles.active : ''}`}
                                >
                                    <Dumbbell size={18} className="me-2" />
                                    Workouts
                                </Nav.Link>

                                <Dropdown align="end">
                                    <Dropdown.Toggle className={styles.profileDropdown}>
                                        <img 
                                            src={user?.profile_picture || '/default-avatar.png'} 
                                            alt={user?.username}
                                            className={styles.profilePicture}
                                        />
                                        <span className="ms-2">{user?.username}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={() => {}} className="text-danger">
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;