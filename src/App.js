import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { ProfileProvider } from './context/ProfileContext';

// Page imports
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import WorkoutList from './pages/WorkoutList';
import LogWorkout from './pages/LogWorkout';
import EditWorkout from './pages/EditWorkout';
import WorkoutDetails from './pages/WorkoutDetails';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <div className="app-container d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <PrivateRoute>
                        <Settings />
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
                        <LogWorkout />
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
                    path="/workouts/:id"
                    element={
                      <PrivateRoute>
                        <WorkoutDetails />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;