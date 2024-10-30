import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PublicHome from './components/PublicHome/PublicHome';
import AuthenticatedHome from './components/AuthenticatedHome/AuthenticatedHome';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthenticatedHome /> : <PublicHome />;
};

export default Home;