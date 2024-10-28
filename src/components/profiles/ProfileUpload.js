import React, { useState } from 'react';
import { Card, Button, Image, Spinner } from 'react-bootstrap';
import { Camera } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const ProfileUpload = () => {
    const { profile, uploadProfilePicture, loading } = useProfile();
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = React.useRef(null);

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        try {
            await uploadProfilePicture(file);
            setPreviewUrl(null); // Clear preview after successful upload
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <Card className="text-center profile-upload-card">
            <Card.Body>
                <div className="profile-picture-container">
                    {profile?.profile_picture || previewUrl ? (
                        <Image 
                            src={previewUrl || profile.profile_picture} 
                            roundedCircle 
                            className="profile-picture"
                            alt="Profile"
                        />
                    ) : (
                        <div className="profile-picture-placeholder">
                            <Camera size={32} />
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="d-none"
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </div>
                <Button
                    variant="outline-primary"
                    className="mt-3"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Uploading...
                        </>
                    ) : (
                        'Change Profile Picture'
                    )}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProfileUpload;