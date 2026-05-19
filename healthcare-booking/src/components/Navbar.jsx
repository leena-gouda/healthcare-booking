import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useTheme();
  const token = localStorage.getItem('token');
  const patient = JSON.parse(localStorage.getItem('patient') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('patient');
    navigate('/login');
    setMenuOpen(false);
  };

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About', path: '/about' },
  ];

  const styles = {
    nav: {
      backgroundColor: darkMode ? '#0F172A' : '#ffffff',
      borderBottom: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#2563EB',
      textDecoration: 'none',
    },
    desktopLinks: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    link: {
      padding: '8px 14px',
      borderRadius: '8px',
      color: darkMode ? '#F1F5F9' : '#1E293B',
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'background 0.2s',
    },
    activeLink: {
      backgroundColor: darkMode ? '#1E3A5F' : '#EFF6FF',
      color: '#2563EB',
    },
    rightButtons: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    loginBtn: {
      padding: '8px 18px',
      borderRadius: '8px',
      border: '1.5px solid #2563EB',
      color: '#2563EB',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
    },
    bookBtn: {
      padding: '8px 18px',
      borderRadius: '8px',
      backgroundColor: '#2563EB',
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
    },
    hamburger: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: darkMode ? '#F1F5F9' : '#1E293B',
    },
    mobileMenu: {
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 24px 20px',
      borderTop: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      backgroundColor: darkMode ? '#0F172A' : '#ffffff',
    },
    mobileLink: {
      padding: '12px 0',
      color: darkMode ? '#F1F5F9' : '#1E293B',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      borderBottom: `1px solid ${darkMode ? '#334155' : '#F1F5F9'}`,
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>

        {/* Logo */}
        <Link to="/" style={styles.logo}>
          🏥 HealthCare
        </Link>

        {/* Desktop links */}
        <div style={styles.desktopLinks}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.link,
                ...(location.pathname === link.path ? styles.activeLink : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'none',
            border: `1.5px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '18px',
            marginRight: '8px',
            transition: 'all 0.2s',
          }}
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Right side buttons */}
        <div style={styles.rightButtons}>
          {token ? (
            <>
              <Link to={patient?.role === 'admin' ? '/admin' : '/dashboard'} style={{
                ...styles.loginBtn,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: patient?.role === 'admin' ? '#EF4444' : '#2563EB',
                color: patient?.role === 'admin' ? '#EF4444' : '#2563EB',
              }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: patient?.role === 'admin'
                    ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                    : 'linear-gradient(135deg, #2563EB, #3b82f6)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: '700',
                }}>
                  {patient?.role === 'admin' ? '⚙' : patient?.name?.charAt(0) || 'P'}
                </span>
                {patient?.role === 'admin' ? 'Admin Panel' : patient?.name?.split(' ')[0] || 'Dashboard'}
              </Link>
              <button onClick={handleLogout} style={{
                padding: '8px 18px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: '1.5px solid #EF4444',
                color: '#EF4444',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/login" style={styles.bookBtn}>Book Appointment</Link>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {token ? (
            <>
              <Link
                to={patient?.role === 'admin' ? '/admin' : '/dashboard'}
                style={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {patient?.role === 'admin' ? '⚙️ Admin Panel' : '📊 Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  ...styles.mobileLink,
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Book Appointment</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;