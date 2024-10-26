import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import EditWorkout from './pages/EditWorkout';
import WorkoutList from './pages/WorkoutList';
import WorkoutDetails from './pages/WorkoutDetails';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WorkoutProvider>
          <div className="App">
            <NavBar />
            <Container className="mt-5 pt-3">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                      <LogWorkout />
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
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </div>
        </WorkoutProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;