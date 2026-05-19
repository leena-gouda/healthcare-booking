import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const BookAppointment = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({ doctor: '', date: '', time: '', reason: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/doctors?available=true');
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError('Failed to load doctors. Please try again.');
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.doctor || !formData.date) return;
      setLoadingSlots(true);
      setFormData(prev => ({ ...prev, time: '' }));
      try {
        const res = await fetch(`http://localhost:5000/api/doctors/${formData.doctor}/slots?date=${formData.date}`);
        const data = await res.json();
        setTimeSlots(data.slots || []);
      } catch (err) {
        setError('Could not load time slots. Please try again.');
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [formData.doctor, formData.date]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.doctor || !formData.date || !formData.time) {
      setError('Please fill in all required fields.');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (formData.date < today) {
      setError('Please select a future date.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError('Could not connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

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
    formCard: {
      maxWidth: '620px', margin: '0 auto',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      padding: '40px', borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    },
    label: { display: 'block', marginBottom: '8px', color: darkMode ? '#F1F5F9' : '#1E293B', fontWeight: '600', fontSize: '0.95rem' },
    input: {
      width: '100%', padding: '12px 16px',
      border: `1.5px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      borderRadius: '8px', fontSize: '0.95rem',
      color: darkMode ? '#F1F5F9' : '#1E293B',
      backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
      boxSizing: 'border-box', outline: 'none',
    },
    errorBox: {
      backgroundColor: '#FEF2F2', border: '1px solid #FECACA',
      color: '#DC2626', padding: '12px 16px',
      borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem',
    },
    primaryButton: {
      padding: '14px 28px', backgroundColor: '#2563EB',
      color: '#ffffff', border: 'none', borderRadius: '8px',
      fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
    },
    secondaryButton: {
      padding: '14px 28px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      color: '#2563EB', border: '2px solid #2563EB',
      borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
    },
    successBox: {
      maxWidth: '500px', margin: '80px auto',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      padding: '60px 40px', borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center',
    },
    note: { textAlign: 'center', marginTop: '20px', color: darkMode ? '#94A3B8' : '#64748B', fontSize: '0.9rem' },
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successBox}>
          <span style={{ fontSize: '4rem' }}>🎉</span>
          <h2 style={{ color: '#10B981', margin: '16px 0 8px', fontSize: '1.8rem' }}>Appointment Booked!</h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#475569', fontSize: '1rem', marginBottom: '30px' }}>
            Your appointment has been successfully scheduled.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={styles.primaryButton} onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <button style={styles.secondaryButton} onClick={() => { setSubmitted(false); setFormData({ doctor: '', date: '', time: '', reason: '' }); }}>Book Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={styles.title}>Book an Appointment</h1>
        <p style={styles.subtitle}>Fill in the details below to schedule your visit with one of our doctors.</p>
      </div>

      <div style={styles.formCard}>
        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Select Doctor <span style={{ color: '#EF4444' }}>*</span></label>
          {loadingDoctors ? (
            <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '0.9rem', fontStyle: 'italic' }}>Loading doctors...</p>
          ) : (
            <select name="doctor" value={formData.doctor} onChange={handleChange} style={styles.input}>
              <option value="">-- Choose a Doctor --</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>{doc.name} — {doc.specialty} {doc.fee ? `(${doc.fee} EGP)` : ''}</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Appointment Date <span style={{ color: '#EF4444' }}>*</span></label>
          <input style={styles.input} type="date" name="date" value={formData.date} onChange={handleChange} min={today} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Preferred Time <span style={{ color: '#EF4444' }}>*</span></label>
          {loadingSlots ? (
            <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '0.9rem', fontStyle: 'italic' }}>Loading available slots...</p>
          ) : (
            <select name="time" value={formData.time} onChange={handleChange} style={styles.input} disabled={!formData.doctor || !formData.date}>
              <option value="">{!formData.doctor || !formData.date ? '-- Select a doctor and date first --' : timeSlots.length === 0 ? '-- No slots available --' : '-- Choose a Time Slot --'}</option>
              {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
            </select>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Reason for Visit</label>
          <textarea style={{ ...styles.input, height: '120px', resize: 'vertical' }} name="reason" placeholder="Briefly describe your symptoms or reason for the visit (optional)..." value={formData.reason} onChange={handleChange} />
        </div>

        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        <button style={{ ...styles.primaryButton, width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>

        <p style={styles.note}>
          Need to view your appointments?{' '}
          <span style={{ color: '#2563EB', cursor: 'pointer', fontWeight: '600' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
        </p>
      </div>
    </div>
  );
};

export default BookAppointment;