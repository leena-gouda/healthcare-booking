import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px',
      backgroundColor: '#F8FAFC',
    }}>
      <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏥</div>
      <h1 style={{ fontSize: '120px', fontWeight: '900', color: '#2563EB', margin: 0, lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B', margin: '16px 0 8px' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '400px', marginBottom: '32px' }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        backgroundColor: '#2563EB',
        color: 'white',
        padding: '12px 32px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '16px',
      }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;