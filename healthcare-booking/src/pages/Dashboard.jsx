import { useTheme } from '../ThemeContext';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Profile edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [profileMsg, setProfileMsg] = useState('');
  const [profileMsgType, setProfileMsgType] = useState('');

  const token = localStorage.getItem('token');
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileRes.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('patient');
          navigate('/login');
          return;
        }
        const profileData = await profileRes.json();
        setPatient(profileData);
        setEditForm({
          name: profileData.name || '',
          phone: profileData.phone || '',
          gender: profileData.gender || '',
          dateOfBirth: profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : '',
          bloodType: profileData.bloodType || '',
        });

        const apptRes = await fetch('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apptData = await apptRes.json();
        setAppointments(apptData);

        setLoading(false);
      } catch (err) {
        console.error('Error loading dashboard:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('patient');
    navigate('/login');
  };

  const handleCancelAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(prev => prev.map(a => (a._id === id ? data : a)));
      }
    } catch (err) {
      console.error('Error cancelling:', err);
    }
  };

  const handleSaveProfile = async () => {
    setProfileMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setPatient(data);
        setIsEditing(false);
        setProfileMsg('Profile updated successfully!');
        setProfileMsgType('success');
        setTimeout(() => setProfileMsg(''), 3000);
      } else {
        setProfileMsg(data.message || 'Failed to update profile');
        setProfileMsgType('error');
      }
    } catch (err) {
      setProfileMsg('Server error. Please try again.');
      setProfileMsgType('error');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', border: '4px solid #F1F5F9',
            borderTopColor: '#2563EB', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
          }} />
          <p style={{ color: '#64748B', fontSize: '16px' }}>Loading your dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const upcomingAppts = appointments.filter(a => a.status === 'upcoming');
  const completedAppts = appointments.filter(a => a.status === 'completed');
  const cancelledAppts = appointments.filter(a => a.status === 'cancelled');

  // Status tracker helper
  const getStatusSteps = (status) => {
    const steps = [
      { label: 'Booked', key: 'booked' },
      { label: 'Upcoming', key: 'upcoming' },
      { label: 'Completed', key: 'completed' },
    ];
    if (status === 'cancelled') {
      return [
        { label: 'Booked', key: 'booked', done: true },
        { label: 'Cancelled', key: 'cancelled', done: true, isCancelled: true },
      ];
    }
    const currentIdx = status === 'completed' ? 2 : 1;
    return steps.map((s, i) => ({ ...s, done: i <= currentIdx }));
  };

  const sidebarItems = [
    { key: 'overview', label: '📊 Overview' },
    { key: 'appointments', label: '📅 My Appointments' },
    { key: 'profile', label: '👤 My Profile' },
  ];

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  };

  const tableHeaderStyle = {
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: '700',
    color: darkMode ? '#94A3B8' : '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: `2px solid ${darkMode ? '#334155' : '#F1F5F9'}`,
    textAlign: 'left',
  };

  const tableCellStyle = {
    padding: '14px 16px',
    fontSize: '14px',
    color: darkMode ? '#F1F5F9' : '#1E293B',
    borderBottom: `1px solid ${darkMode ? '#334155' : '#F8FAFC'}`,
  };

  const statusBadge = (status) => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
    backgroundColor:
      status === 'upcoming' ? '#ECFDF5' :
      status === 'completed' ? '#EFF6FF' : '#FEF2F2',
    color:
      status === 'upcoming' ? '#10B981' :
      status === 'completed' ? '#2563EB' : '#EF4444',
  });

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: `1.5px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
    fontSize: '14px',
    color: darkMode ? '#F1F5F9' : '#1E293B',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: darkMode ? '#0F172A' : '#FAFBFC',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: darkMode ? '#94A3B8' : '#64748B',
    marginBottom: '6px',
    display: 'block',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0F172A' : '#F8FAFC' }}>
      <div className="container py-4">
        <div className="row g-4">

          {/* SIDEBAR */}
          <div className="col-lg-3">
            <div style={{
              backgroundColor: darkMode ? '#1E293B' : 'white',
              borderRadius: '20px',
              padding: '28px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: '20px',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB, #3b82f6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '28px',
                  color: 'white',
                  fontWeight: '800',
                }}>
                  {patient?.name?.charAt(0) || 'P'}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', margin: '0 0 4px' }}>
                  {patient?.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{patient?.email}</p>
              </div>

              {/* Nav Items */}
              {sidebarItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '12px',
                    backgroundColor: activeSection === item.key ? '#EFF6FF' : 'transparent',
                    color: activeSection === item.key ? '#2563EB' : '#475569',
                    fontWeight: activeSection === item.key ? '700' : '500',
                    fontSize: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    marginBottom: '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* Book Appointment */}
              <a
                href="/book-appointment"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                  fontWeight: '600',
                  fontSize: '14px',
                  textAlign: 'left',
                  textDecoration: 'none',
                  marginBottom: '4px',
                  transition: 'all 0.2s',
                }}
              >
                ➕ Book Appointment
              </a>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1.5px solid #EF4444',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  color: '#EF4444',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '16px',
                  transition: 'all 0.2s',
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-lg-9">

            {/* ── OVERVIEW ── */}
            {activeSection === 'overview' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  Welcome back, {patient?.name?.split(' ')[0]}! 👋
                </h2>

                {/* Stat Cards */}
                <div className="row g-3 mb-4">
                  {[
                    { label: 'Total Appointments', value: appointments.length, color: '#2563EB', icon: '📋' },
                    { label: 'Upcoming', value: upcomingAppts.length, color: '#10B981', icon: '🕐' },
                    { label: 'Completed', value: completedAppts.length, color: '#64748B', icon: '✅' },
                    { label: 'Cancelled', value: cancelledAppts.length, color: '#EF4444', icon: '❌' },
                  ].map((stat, i) => (
                    <div key={i} className="col-6 col-md-3">
                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        textAlign: 'center',
                        borderLeft: `4px solid ${stat.color}`,
                      }}>
                        <div style={{ fontSize: '18px', marginBottom: '4px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '32px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontWeight: '600' }}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Appointments Widget */}
                <div style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', margin: 0 }}>
                      📅 Upcoming Appointments
                    </h3>
                    {upcomingAppts.length > 3 && (
                      <button
                        onClick={() => setActiveSection('appointments')}
                        style={{
                          background: 'none', border: 'none', color: '#2563EB',
                          fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                        }}
                      >
                        View All →
                      </button>
                    )}
                  </div>
                  {upcomingAppts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>
                      <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
                      <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '16px' }}>No upcoming appointments</p>
                      <a
                        href="/book-appointment"
                        style={{
                          display: 'inline-block',
                          padding: '10px 24px',
                          borderRadius: '12px',
                          backgroundColor: '#2563EB',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '14px',
                          textDecoration: 'none',
                        }}
                      >
                        Book Your First Appointment
                      </a>
                    </div>
                  ) : (
                    upcomingAppts.slice(0, 3).map(appt => (
                      <div key={appt._id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        marginBottom: '8px',
                      }}>
                        <img
                          src={appt.doctor?.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
                          alt={appt.doctor?.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563EB' }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '700', fontSize: '15px', color: '#1E293B', margin: '0 0 2px' }}>
                            {appt.doctor?.name}
                          </p>
                          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                            {appt.doctor?.specialty} · {appt.date} at {appt.time}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={statusBadge('upcoming')}>Upcoming</span>
                          <button
                            onClick={() => handleCancelAppointment(appt._id)}
                            style={{
                              display: 'block',
                              marginTop: '6px',
                              background: 'none',
                              border: 'none',
                              color: '#EF4444',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── MY APPOINTMENTS (TABLE + STATUS TRACKER) ── */}
            {activeSection === 'appointments' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  My Appointments
                </h2>

                <div style={cardStyle}>
                  {appointments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <p style={{ fontSize: '48px', marginBottom: '12px' }}>📋</p>
                      <p style={{ color: '#64748B', fontSize: '16px', marginBottom: '16px' }}>No appointments yet</p>
                      <a
                        href="/book-appointment"
                        style={{
                          display: 'inline-block',
                          padding: '10px 24px',
                          borderRadius: '12px',
                          backgroundColor: '#2563EB',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '14px',
                          textDecoration: 'none',
                        }}
                      >
                        Book an Appointment
                      </a>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th style={tableHeaderStyle}>Doctor</th>
                            <th style={tableHeaderStyle}>Date & Time</th>
                            <th style={tableHeaderStyle}>Reason</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Progress</th>
                            <th style={tableHeaderStyle}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map(appt => (
                            <tr key={appt._id}>
                              <td style={tableCellStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <img
                                    src={appt.doctor?.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
                                    alt={appt.doctor?.name}
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                                  />
                                  <div>
                                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{appt.doctor?.name}</span>
                                    <br />
                                    <span style={{ fontSize: '12px', color: '#64748B' }}>{appt.doctor?.specialty}</span>
                                  </div>
                                </div>
                              </td>
                              <td style={tableCellStyle}>
                                <span style={{ fontWeight: '600', fontSize: '13px' }}>{appt.date}</span>
                                <br />
                                <span style={{ fontSize: '12px', color: '#64748B' }}>{appt.time}</span>
                              </td>
                              <td style={{ ...tableCellStyle, maxWidth: '150px' }}>
                                <span style={{ fontSize: '13px', color: '#475569' }}>
                                  {appt.reason || '—'}
                                </span>
                              </td>
                              <td style={tableCellStyle}>
                                <span style={statusBadge(appt.status)}>
                                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                </span>
                              </td>
                              {/* Status Tracker */}
                              <td style={tableCellStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '140px' }}>
                                  {getStatusSteps(appt.status).map((step, i, arr) => (
                                    <React.Fragment key={step.key}>
                                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{
                                          width: '20px',
                                          height: '20px',
                                          borderRadius: '50%',
                                          backgroundColor: step.isCancelled ? '#EF4444' : step.done ? '#10B981' : '#E2E8F0',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '10px',
                                          color: 'white',
                                          fontWeight: '700',
                                        }}>
                                          {step.isCancelled ? '✕' : step.done ? '✓' : ''}
                                        </div>
                                        <span style={{
                                          fontSize: '9px',
                                          color: step.isCancelled ? '#EF4444' : step.done ? '#10B981' : '#94A3B8',
                                          fontWeight: '600',
                                          marginTop: '2px',
                                          whiteSpace: 'nowrap',
                                        }}>
                                          {step.label}
                                        </span>
                                      </div>
                                      {i < arr.length - 1 && (
                                        <div style={{
                                          flex: 1,
                                          height: '2px',
                                          backgroundColor: arr[i + 1]?.done ? '#10B981' : '#E2E8F0',
                                          marginBottom: '14px',
                                          minWidth: '16px',
                                        }} />
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </td>
                              <td style={tableCellStyle}>
                                {appt.status === 'upcoming' ? (
                                  <button
                                    onClick={() => handleCancelAppointment(appt._id)}
                                    style={{
                                      padding: '6px 14px',
                                      borderRadius: '8px',
                                      border: '1.5px solid #EF4444',
                                      backgroundColor: 'transparent',
                                      color: '#EF4444',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Cancel
                                  </button>
                                ) : (
                                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── PROFILE (VIEW + EDIT) ── */}
            {activeSection === 'profile' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', margin: 0 }}>
                    My Profile
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditForm({
                          name: patient?.name || '',
                          phone: patient?.phone || '',
                          gender: patient?.gender || '',
                          dateOfBirth: patient?.dateOfBirth ? patient.dateOfBirth.split('T')[0] : '',
                          bloodType: patient?.bloodType || '',
                        });
                      }}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: '#2563EB',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      ✏️ Edit Profile
                    </button>
                  )}
                </div>

                {/* Success/Error Message */}
                {profileMsg && (
                  <div style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    backgroundColor: profileMsgType === 'success' ? '#ECFDF5' : '#FEF2F2',
                    color: profileMsgType === 'success' ? '#10B981' : '#EF4444',
                    fontWeight: '600',
                    fontSize: '14px',
                  }}>
                    {profileMsg}
                  </div>
                )}

                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  maxWidth: '650px',
                }}>
                  {/* Profile Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563EB, #3b82f6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: 'white',
                      fontWeight: '800',
                      flexShrink: 0,
                    }}>
                      {patient?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1E293B', margin: '0 0 4px' }}>
                        {patient?.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>{patient?.email}</p>
                      <p style={{ fontSize: '12px', color: '#94A3B8', margin: '4px 0 0' }}>
                        Member since {patient?.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* View Mode */}
                  {!isEditing ? (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {[
                        { label: 'Full Name', value: patient?.name },
                        { label: 'Email', value: patient?.email },
                        { label: 'Phone', value: patient?.phone },
                        { label: 'Date of Birth', value: patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : null },
                        { label: 'Gender', value: patient?.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : null },
                        { label: 'Blood Type', value: patient?.bloodType },
                      ].map((field, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: i < 5 ? '1px solid #F8FAFC' : 'none',
                        }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>{field.label}</span>
                          <span style={{ fontSize: '15px', color: field.value ? '#1E293B' : '#CBD5E1', fontWeight: field.value ? '500' : '400' }}>
                            {field.value || 'Not set'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Edit Mode */
                    <div style={{ display: 'grid', gap: '18px' }}>
                      <div>
                        <label style={labelStyle}>Full Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                          style={inputStyle}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone Number</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))}
                          style={inputStyle}
                          placeholder="e.g. +20 1234567890"
                        />
                      </div>
                      <div className="row g-3">
                        <div className="col-6">
                          <label style={labelStyle}>Date of Birth</label>
                          <input
                            type="date"
                            value={editForm.dateOfBirth}
                            onChange={e => setEditForm(p => ({ ...p, dateOfBirth: e.target.value }))}
                            style={inputStyle}
                          />
                        </div>
                        <div className="col-6">
                          <label style={labelStyle}>Gender</label>
                          <select
                            value={editForm.gender}
                            onChange={e => setEditForm(p => ({ ...p, gender: e.target.value }))}
                            style={inputStyle}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Blood Type</label>
                        <select
                          value={editForm.bloodType}
                          onChange={e => setEditForm(p => ({ ...p, bloodType: e.target.value }))}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      {/* Save / Cancel Buttons */}
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button
                          onClick={handleSaveProfile}
                          style={{
                            padding: '12px 32px',
                            borderRadius: '12px',
                            border: 'none',
                            backgroundColor: '#10B981',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '14px',
                            cursor: 'pointer',
                          }}
                        >
                          💾 Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setProfileMsg('');
                          }}
                          style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: '1.5px solid #E2E8F0',
                            backgroundColor: 'transparent',
                            color: '#64748B',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
