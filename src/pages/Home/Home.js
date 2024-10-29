import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthenticatedHome from './components/AuthenticatedHome/AuthenticatedHome';
import PublicHome from './components/PublicHome/PublicHome';

const Home = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <AuthenticatedHome /> : <PublicHome />;
};

export default Home;