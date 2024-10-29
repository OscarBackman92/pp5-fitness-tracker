import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Spinner } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="text-center">
                    <Spinner animation="border" role="status" variant="primary" />
                    <p className="mt-2 text-muted">Loading...</p>
                </div>
            </Container>
        );
    }

    return isAuthenticated ? (
        children
    ) : (
        <Navigate 
            to="/login" 
            state={{ from: location.pathname }}
            replace 
        />
    );
};

export default PrivateRoute;