import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ fullscreen = true }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...(fullscreen ? {
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 9999
    } : {
      padding: '2rem'
    })
  };

  return (
    <div style={containerStyle}>
      <Spinner 
        animation="border" 
        role="status" 
        variant="primary"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-3 text-muted">Loading...</p>
    </div>
  );
};

export default Loading;