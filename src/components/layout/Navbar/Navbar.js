import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  LayoutDashboard, 
  Activity,
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navigationLinks = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/workouts', icon: <Activity size={20} />, label: 'Workouts' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <Dumbbell className={styles.logoIcon} size={28} />
          <span className={styles.logoText}>FITPRO</span>
        </Link>

        <div className={`${styles.navContent} ${isOpen ? styles.show : ''}`}>
          <div className={styles.navLinks}>
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span className={styles.linkText}>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className={styles.userSection}>
            <Link to="/profile" className={styles.profileLink}>
              <img 
                src={user?.profile_picture || "/api/placeholder/32/32"}
                alt="Profile"
                className={styles.avatar}
              />
              <span className={styles.username}>{user?.username}</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;