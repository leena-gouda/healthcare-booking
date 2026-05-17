import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
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
        const res = await fetch(
          `http://localhost:5000/api/doctors/${formData.doctor}/slots?date=${formData.date}`
        );
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
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

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successBox}>
          <span style={{ fontSize: '4rem' }}>🎉</span>
          <h2 style={{ color: '#10B981', margin: '16px 0 8px', fontSize: '1.8rem' }}>
            Appointment Booked!
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '30px' }}>
            Your appointment has been successfully scheduled. You can view and manage it from your dashboard.
          </p>
          <div style={styles.successButtons}>
            <button
              style={styles.primaryButton}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => {
                setSubmitted(false);
                setFormData({ doctor: '', date: '', time: '', reason: '' });
              }}
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Book an Appointment</h1>
        <p style={styles.subtitle}>
          Fill in the details below to schedule your visit with one of our doctors.
        </p>
      </div>

      <div style={styles.formCard}>

        {/* Doctor Selection */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Select Doctor <span style={styles.required}>*</span></label>
          {loadingDoctors ? (
            <p style={styles.loadingText}>Loading doctors...</p>
          ) : (
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">-- Choose a Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} — {doc.specialty} {doc.fee ? `(${doc.fee} EGP)` : ''}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Date */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Appointment Date <span style={styles.required}>*</span></label>
          <input
            style={styles.input}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
          />
        </div>

        {/* Time */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Preferred Time <span style={styles.required}>*</span></label>
          {loadingSlots ? (
            <p style={styles.loadingText}>Loading available slots...</p>
          ) : (
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={styles.input}
              disabled={!formData.doctor || !formData.date}
            >
              <option value="">
                {!formData.doctor || !formData.date
                  ? '-- Select a doctor and date first --'
                  : timeSlots.length === 0
                  ? '-- No slots available for this day --'
                  : '-- Choose a Time Slot --'}
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          )}
        </div>

        {/* Reason */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Reason for Visit</label>
          <textarea
            style={{ ...styles.input, height: '120px', resize: 'vertical' }}
            name="reason"
            placeholder="Briefly describe your symptoms or reason for the visit (optional)..."
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        {/* Error message */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit */}
        <button
          style={{
            ...styles.primaryButton,
            width: '100%',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>

        <p style={styles.note}>
          Need to view your appointments? Visit your{' '}
          <span
            style={{ color: '#2563EB', cursor: 'pointer', fontWeight: '600' }}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </span>
        </p>

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
    marginBottom: '40px',
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
  formCard: {
    maxWidth: '620px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#1E293B',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  required: {
    color: '#EF4444',
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
  loadingText: {
    color: '#64748B',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.9rem',
  },
  primaryButton: {
    padding: '14px 28px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '14px 28px',
    backgroundColor: '#ffffff',
    color: '#2563EB',
    border: '2px solid #2563EB',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  successBox: {
    maxWidth: '500px',
    margin: '80px auto',
    backgroundColor: '#ffffff',
    padding: '60px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  successButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  note: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#64748B',
    fontSize: '0.9rem',
  },
};

export default BookAppointment;