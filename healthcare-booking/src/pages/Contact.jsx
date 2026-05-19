import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

const Contact = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) setSubmitted(true);
      else alert('Error: ' + data.error);
    } catch (err) {
      alert('Could not connect to server. Make sure the backend is running.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
      padding: '60px 20px',
      fontFamily: 'sans-serif',
      transition: 'background-color 0.3s',
    },
    title: { fontSize: '2.2rem', color: darkMode ? '#F1F5F9' : '#1E293B', marginBottom: '12px' },
    subtitle: { fontSize: '1rem', color: darkMode ? '#94A3B8' : '#64748B', maxWidth: '600px', margin: '0 auto' },
    infoItem: {
      display: 'flex', alignItems: 'flex-start', gap: '16px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      padding: '20px', borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    infoTitle: { margin: '0 0 4px', color: darkMode ? '#F1F5F9' : '#1E293B', fontSize: '0.95rem', fontWeight: '700' },
    infoText: { margin: '0', color: darkMode ? '#94A3B8' : '#64748B', fontSize: '0.9rem', lineHeight: '1.6' },
    formBox: {
      flex: '2', minWidth: '300px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      padding: '36px', borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    },
    label: { display: 'block', marginBottom: '6px', color: darkMode ? '#F1F5F9' : '#1E293B', fontWeight: '600', fontSize: '0.9rem' },
    input: {
      width: '100%', padding: '12px 16px',
      border: `1.5px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      borderRadius: '8px', fontSize: '0.95rem',
      color: darkMode ? '#F1F5F9' : '#1E293B',
      backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
      boxSizing: 'border-box', outline: 'none',
    },
    submitButton: {
      width: '100%', padding: '14px',
      backgroundColor: '#2563EB', color: '#ffffff',
      border: 'none', borderRadius: '8px',
      fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
    },
    resetButton: {
      marginTop: '20px', padding: '12px 24px',
      backgroundColor: '#10B981', color: '#ffffff',
      border: 'none', borderRadius: '8px',
      fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>Have a question or need help? We're here for you.</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Left - Info */}
        <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {[
            { icon: '📍', title: 'Address', text: '123 Medical Center St, Cairo, Egypt' },
            { icon: '📞', title: 'Phone', text: '+20 100 123 4567' },
            { icon: '✉️', title: 'Email', text: 'support@healthcarebooking.com' },
            { icon: '🕐', title: 'Working Hours', text: 'Saturday – Thursday: 9am – 6pm\nFriday: Closed' },
          ].map((item, i) => (
            <div key={i} style={styles.infoItem}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <h3 style={styles.infoTitle}>{item.title}</h3>
                {item.text.split('\n').map((line, j) => (
                  <p key={j} style={styles.infoText}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right - Form */}
        <div style={styles.formBox}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <span style={{ fontSize: '3rem' }}>✅</span>
              <h2 style={{ color: '#10B981', margin: '16px 0 8px' }}>Message Sent!</h2>
              <p style={{ color: darkMode ? '#94A3B8' : '#475569' }}>We'll get back to you soon.</p>
              <button style={styles.resetButton} onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Subject', name: 'subject', type: 'text', placeholder: 'What is this about?' },
              ].map((field) => (
                <div key={field.name} style={{ marginBottom: '20px' }}>
                  <label style={styles.label}>{field.label}</label>
                  <input style={styles.input} type={field.type} name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange} required />
                </div>
              ))}
              <div style={{ marginBottom: '20px' }}>
                <label style={styles.label}>Message</label>
                <textarea style={{ ...styles.input, height: '140px', resize: 'vertical' }} name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} required />
              </div>
              <button style={styles.submitButton} onClick={handleSubmit}>Send Message</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;