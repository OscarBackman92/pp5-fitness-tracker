import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PublicHome from './components/PublicHome/PublicHome';
import AuthenticatedHome from './components/AuthenticatedHome';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <AuthenticatedHome /> : <PublicHome />;
};

export default HomePage;