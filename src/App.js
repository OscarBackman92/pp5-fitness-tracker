import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { isAuthenticated, getUserInfo } from './services/auth';
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
import Loading from './components/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const isAuth = isAuthenticated();
        setAuth(isAuth);
        if (isAuth) {
          const info = await getUserInfo();
          setUserInfo(info);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Failed to load user information. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const PrivateRoute = ({ children }) => {
    if (loading) return <Loading />;
    return auth ? children : <Navigate to="/login" />;
  };

  if (loading) return <Loading />;

  return (
    <Router>
      <div className="App">
        <Navbar auth={auth} setAuth={setAuth} userInfo={userInfo} />
        {error && <Alert variant="danger">{error}</Alert>}
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                isLoggedIn={auth} 
                userInfo={userInfo} 
                loading={loading} 
                error={error} 
              />
            } 
          />
          <Route path="/login" element={<Login setAuth={setAuth} setUserInfo={setUserInfo} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Container className="mt-4">
                <Dashboard userInfo={userInfo} />
              </Container>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Container className="mt-4">
                <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
              </Container>
            </PrivateRoute>
          } />
          <Route path="/workouts" element={
            <PrivateRoute>
              <Container className="mt-4">
                <WorkoutList />
              </Container>
            </PrivateRoute>
          } />
          <Route path="/workouts/new" element={
            <PrivateRoute>
              <Container className="mt-4">
                <LogWorkout userInfo={userInfo} />
              </Container>
            </PrivateRoute>
          } />
          <Route path="/workouts/:id" element={
            <PrivateRoute>
              <Container className="mt-4">
                <WorkoutDetails />
              </Container>
            </PrivateRoute>
          } />
          <Route path="/workouts/edit/:id" element={
            <PrivateRoute>
              <Container className="mt-4">
                <EditWorkout />
              </Container>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;