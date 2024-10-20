import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { isAuthenticated } from './services/auth';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetails from './pages/WorkoutDetails';
import LogWorkout from './pages/LogWorkout';
import EditWorkout from './pages/EditWorkout';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const PrivateRoute = ({ children }) => {
    return auth ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Container className="mt-4">
                <Dashboard />
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
                <LogWorkout />
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