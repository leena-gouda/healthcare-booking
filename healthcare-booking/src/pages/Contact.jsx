import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Could not connect to server. Make sure the backend is running.');
    }
};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have a question or need help? We're here for you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div style={styles.content}>

        {/* Left side - contact info */}
        <div style={styles.infoBox}>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📍</span>
            <div>
              <h3 style={styles.infoTitle}>Address</h3>
              <p style={styles.infoText}>123 Medical Center St, Cairo, Egypt</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📞</span>
            <div>
              <h3 style={styles.infoTitle}>Phone</h3>
              <p style={styles.infoText}>+20 100 123 4567</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>✉️</span>
            <div>
              <h3 style={styles.infoTitle}>Email</h3>
              <p style={styles.infoText}>support@healthcarebooking.com</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>🕐</span>
            <div>
              <h3 style={styles.infoTitle}>Working Hours</h3>
              <p style={styles.infoText}>Saturday – Thursday: 9am – 6pm</p>
              <p style={styles.infoText}>Friday: Closed</p>
            </div>
          </div>
        </div>

        {/* Right side - form */}
        <div style={styles.formBox}>
          {submitted ? (
            <div style={styles.successBox}>
              <span style={{ fontSize: '3rem' }}>✅</span>
              <h2 style={{ color: '#10B981', margin: '16px 0 8px' }}>Message Sent!</h2>
              <p style={{ color: '#475569' }}>Thank you for reaching out. We'll get back to you soon.</p>
              <button
                style={styles.resetButton}
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  style={styles.input}
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  style={{ ...styles.input, height: '140px', resize: 'vertical' }}
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button style={styles.submitButton} onClick={handleSubmit}>
                Send Message
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    padding: '60px 20px',
    fontFamily: 'sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  title: {
    fontSize: '2.2rem',
    color: '#1E293B',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748B',
    maxWidth: '600px',
    margin: '0 auto',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  infoBox: {
    flex: '1',
    minWidth: '260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  infoIcon: {
    fontSize: '1.5rem',
  },
  infoTitle: {
    margin: '0 0 4px',
    color: '#1E293B',
    fontSize: '0.95rem',
    fontWeight: '700',
  },
  infoText: {
    margin: '0',
    color: '#64748B',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  formBox: {
    flex: '2',
    minWidth: '300px',
    backgroundColor: '#ffffff',
    padding: '36px',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#1E293B',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
    boxSizing: 'border-box',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  successBox: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  resetButton: {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#10B981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Contact;