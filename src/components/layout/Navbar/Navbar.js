import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, UserCircle, Settings, TrendingUp } from 'lucide-react';
import styles from './Navbar.module.css';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar className={styles.navbar} fixed="top">
      <Container>
        <Link to="/" className={styles.brand}>
          <Dumbbell size={24} />
          <span>PEAKFORM</span>
        </Link>

        <Nav className={styles.mainNav}>
          <Link 
            to="/dashboard" 
            className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/workouts" 
            className={`${styles.navLink} ${location.pathname.includes('/workouts') ? styles.active : ''}`}
          >
            <TrendingUp size={18} />
            <span>Workouts</span>
          </Link>

          <Link 
            to="/profile" 
            className={`${styles.navLink} ${location.pathname === '/profile' ? styles.active : ''}`}
          >
            <UserCircle size={18} />
            <span>Profile</span>
          </Link>

          <Link 
            to="/settings" 
            className={`${styles.navLink} ${location.pathname === '/settings' ? styles.active : ''}`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </Nav>

        <Dropdown align="end">
          <Dropdown.Toggle className={styles.profileToggle}>
            <img 
              src="/api/placeholder/36/36" 
              alt="Profile" 
              className={styles.profilePic}
            />
            <span>John Doe</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;