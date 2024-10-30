import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../services/api/axiosInstance';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated) return; // Don't fetch if not authenticated

            setLoading(true);
            try {
                const response = await axiosInstance.get('/profiles/me/');
                setProfile(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated]);

    return (
        <ProfileContext.Provider value={{ profile, loading, error }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};
