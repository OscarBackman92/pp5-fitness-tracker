import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Activity, LayoutDashboard, Dumbbell, UserCircle, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from './Navbar.module.css';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/workouts', icon: <Dumbbell size={20} />, label: 'Workouts' },
    { path: '/profile', icon: <UserCircle size={20} />, label: 'Profile' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <nav className={styles.navbar}>
      <Container className={styles.container}>
        <Link to="/" className={styles.brand}>
          <Activity className={styles.brandIcon} size={28} />
          <span>PEAKFORM</span>
        </Link>

        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.navContent} ${isOpen ? styles.show : ''}`}>
          {/* User Info - Mobile Only */}
          <div className={styles.mobileUserInfo}>
            <img 
              src={user?.profile_picture || "/api/placeholder/32/32"}
              alt="Profile" 
              className={styles.avatar}
            />
            <span className={styles.username}>{user?.username}</span>
          </div>

          {/* Navigation Links */}
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavigationBar;