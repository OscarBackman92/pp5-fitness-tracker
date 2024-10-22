import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../services/auth';

const Navbar = () => {
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
        <nav className="navbar">
            <Link to="/" className="nav-brand">Fitness Tracker</Link>
            {isAuthenticated() ? (
                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/workouts">Workouts</Link>
                    <Link to="/feed">Social Feed</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;