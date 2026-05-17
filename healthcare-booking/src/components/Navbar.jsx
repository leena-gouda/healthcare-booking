import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About', path: '/about' },
  ];

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

        {/* Right side buttons */}
        <div style={styles.rightButtons}>
          <Link to="/login" style={styles.loginBtn}>Login</Link>
          <Link to="/book" style={styles.bookBtn}>Book Appointment</Link>
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
          <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/book" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Book Appointment</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E2E8F0',
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
    color: '#1E293B',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  activeLink: {
    backgroundColor: '#EFF6FF',
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
    color: '#1E293B',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 24px 20px',
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#ffffff',
  },
  mobileLink: {
    padding: '12px 0',
    color: '#1E293B',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '1px solid #F1F5F9',
  },
};

export default Navbar;