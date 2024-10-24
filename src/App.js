import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetails from './pages/WorkoutDetails';
import LogWorkout from './pages/LogWorkout';
import EditWorkout from './pages/EditWorkout';

// Contexts
import { AuthProvider, useAuth } from './components/Context'; // Import useAuth from Context
import { WorkoutProvider } from './components/WorkoutContext'; // Import WorkoutProvider

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Layout = ({ children }) => {
    return (
        <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <Container fluid className="flex-grow-1 p-0 mt-5 pt-4">
                {children}
            </Container>
            <Footer />
        </div>
    );
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Use useAuth to get authentication state

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

function AppContent() {
    const { isAuthenticated } = useAuth(); // Use useAuth here

    return (
        <Layout>
            <Routes>
                {/* Public Routes */}
                <Route 
                    path="/" 
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} 
                />
                <Route 
                    path="/login" 
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
                />
                <Route 
                    path="/register" 
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
                />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workouts"
                    element={
                        <ProtectedRoute>
                            <WorkoutList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workouts/new"
                    element={
                        <ProtectedRoute>
                            <LogWorkout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workouts/:id"
                    element={
                        <ProtectedRoute>
                            <WorkoutDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workouts/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditWorkout />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <WorkoutProvider> {/* Wrap AppContent with WorkoutProvider */}
                    <AppContent />
                </WorkoutProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
