// App.js
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
      {/* Wrapping the app with AuthProvider and WorkoutProvider to provide context access */}
      <AuthProvider>
        <WorkoutProvider>
          <div className="App">
            {/* Navigation bar included for global navigation */}
            <NavBar />
            
            {/* Container for the main content with padding */}
            <Container className="mt-5 pt-3">
              <Routes>
                {/* Public routes for login and registration */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private routes, accessible only if authenticated */}
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

                {/* Default route for Dashboard as the homepage */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                
                {/* Additional route for Dashboard explicitly */}
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
