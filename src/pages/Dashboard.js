import React from 'react';
import { useAuth } from '../components/Context'; // Ensure this path is correct
import Navbar from '../components/Navbar'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
// import LandingPage from './LandingPage'; // Ensure this path is correct
// import Login from './Login'; // Ensure this path is correct
// import Register from './Register'; // Ensure this path is correct
// import Profile from './Profile'; // Ensure this path is correct
// import WorkoutList from './WorkoutList'; // Ensure this path is correct
// import WorkoutDetails from './WorkoutDetails'; // Ensure this path is correct
// import LogWorkout from './LogWorkout'; // Ensure this path is correct
// import EditWorkout from './EditWorkout'; // Ensure this path is correct
// import './App.css'; // Ensure this path is correct

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div>
            <Navbar />
            <h1>Welcome to the Dashboard</h1>
            {isAuthenticated ? (
                <div>
                    <h2>Hello, {user.username}</h2>
                    {/* You can add more components like WorkoutList or Profile here */}
                </div>
            ) : (
                <div>
                    <h2>Please log in to access your dashboard</h2>
                    {/* Optionally redirect to Login or show a link to the login page */}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Dashboard;