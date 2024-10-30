import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/layout/Loading';
import Navbar from './components/layout/Navbar/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';  // Added useAuth import
import { WorkoutProvider } from './context/WorkoutContext';
import { ProfileProvider } from './context/ProfileContext';

// Lazy load route components
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Register = lazy(() => import('./pages/Auth/Register/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const WorkoutList = lazy(() => import('./pages/Workouts/WorkoutList'));
const LogWorkout = lazy(() => import('./pages/Workouts/LogWorkout'));
const EditWorkout = lazy(() => import('./pages/Workouts/EditWorkout'));
const WorkoutDetails = lazy(() => import('./pages/Workouts/WorkoutDetails'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error:', error);
    console.error('Info:', info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="text-center">
            <h2>Something went wrong</h2>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Move PrivateRoute outside of App component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullscreen={false} />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ProfileProvider>
            <WorkoutProvider>
              <div className="app-container d-flex flex-column min-vh-100">
                <Navbar />
                <Suspense fallback={<Loading fullscreen={false} />}>
                  <main className="flex-grow-1 container mt-4">
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
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

                      {/* Catch all route - redirect to home */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </Suspense>
              </div>
            </WorkoutProvider>
          </ProfileProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;