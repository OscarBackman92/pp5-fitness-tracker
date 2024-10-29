import React from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useProfile } from '../../context/ProfileContext';
import ProfileUpload from './components/ProfileUpload/ProfileUpload';
import GoalsSection from './components/GoalsSection/GoalsSection';
import ProgressCharts from './components/ProgressChart/ProgressCharts';


const Profile = () => {
    const { loading, error } = useProfile();

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading profile...</p>
            </Container>
        );
    }

    return (
        <Container className="profile-container">
            {error && (
                <Alert variant="danger" className="mb-4">
                    {error}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <div className="profile-sidebar">
                        <ProfileUpload />
                        <div className="mt-4">
                            <GoalsSection />
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    <div className="profile-main">
                        <div className="mb-4">
                            <ProgressCharts />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;