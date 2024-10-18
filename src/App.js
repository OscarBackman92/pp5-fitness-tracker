import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { isAuthenticated } from './services/auth';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import WorkoutList from './components/WorkoutList';
import LogWorkout from './components/LogWorkout';
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
        <Container className="mt-4">
          <Routes>
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/workouts" element={
              <PrivateRoute>
                <WorkoutList />
              </PrivateRoute>
            } />
            <Route path="/workouts/new" element={
              <PrivateRoute>
                <LogWorkout />
              </PrivateRoute>
            } />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;