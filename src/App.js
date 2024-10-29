import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { ProfileProvider } from './context/ProfileContext';
import PrivateRoute from './components/auth/PrivateRoute/PrivateRoute';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import WorkoutList from './pages/Workouts/WorkoutList';
import LogWorkout from './pages/Workouts/LogWorkout';
import EditWorkout from './pages/Workouts/EditWorkout';
import WorkoutDetails from './pages/Workouts/WorkoutDetails';
import Footer from './components/layout/Footer/Footer';


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
                  <Route path="/home" />
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
