import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { getUserProfile } from './services/auth';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetails from './pages/WorkoutDetails';
import LogWorkout from './pages/LogWorkout';
import EditWorkout from './pages/EditWorkout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [auth, setAuth] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            console.log('Checking auth with token:', token);

            if (!token) {
                console.log('No token found, setting auth false');
                setAuth(false);
                setUserInfo(null);
                return;
            }

            try {
                const userProfile = await getUserProfile();
                console.log('User profile fetched:', userProfile);
                setAuth(true);
                setUserInfo(userProfile);
            } catch (error) {
                console.error('Profile fetch failed:', error);
                if (error.response?.status === 403) {
                    localStorage.removeItem('access_token');
                    setAuth(false);
                    setUserInfo(null);
                }
            }
        } catch (err) {
            console.error('Auth check error:', err);
            setAuth(false);
            setUserInfo(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (auth) {
            checkAuth();
        }
    }, [auth]);

    const PrivateRoute = ({ children }) => {
        if (loading) return <Loading />;
        return auth ? children : <Navigate to="/login" />;
    };

    if (loading) return <Loading />;

    return (
        <Router>
            <div className="App d-flex flex-column min-vh-100">
                <Navbar auth={auth} setAuth={setAuth} userInfo={userInfo} />
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                <Container className="mt-4 flex-grow-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login setAuth={setAuth} setUserInfo={setUserInfo} />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/dashboard" 
                            element={
                                <PrivateRoute>
                                    <Dashboard userInfo={userInfo} />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                <PrivateRoute>
                                    <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/workouts" 
                            element={
                                <PrivateRoute>
                                    <WorkoutList />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/workouts/new" 
                            element={
                                <PrivateRoute>
                                    <LogWorkout userInfo={userInfo} />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/workouts/:id" 
                            element={
                                <PrivateRoute>
                                    <WorkoutDetails />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/workouts/edit/:id" 
                            element={
                                <PrivateRoute>
                                    <EditWorkout />
                                </PrivateRoute>
                            } 
                        />
                    </Routes>
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

export default App;