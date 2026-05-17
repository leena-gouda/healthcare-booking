import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  const token = localStorage.getItem('token');

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

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748B', fontSize: '18px' }}>Loading your dashboard...</p>
      </div>
    );
  }

  const upcomingAppts = appointments.filter(a => a.status === 'upcoming');
  const completedAppts = appointments.filter(a => a.status === 'completed');
  const cancelledAppts = appointments.filter(a => a.status === 'cancelled');

  const sidebarItems = [
    { key: 'overview', label: '📊 Overview' },
    { key: 'appointments', label: '📅 My Appointments' },
    { key: 'profile', label: '👤 My Profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <div className="container py-4">
        <div className="row g-4">

          {/* SIDEBAR */}
          <div className="col-lg-3">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '28px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
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

              {/* Book Appointment — links to friend's page */}
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

                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-3">
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#2563EB' }}>{appointments.length}</div>
                      <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Total Appointments</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#10B981' }}>{upcomingAppts.length}</div>
                      <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Upcoming</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#64748B' }}>{completedAppts.length}</div>
                      <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Completed</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#EF4444' }}>{cancelledAppts.length}</div>
                      <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Cancelled</div>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>
                    📅 Upcoming Appointments
                  </h3>
                  {upcomingAppts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>
                      <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
                      <p style={{ color: '#64748B', fontSize: '15px' }}>No upcoming appointments</p>
                      <a
                        href="/book-appointment"
                        className="hero-btn-primary"
                        style={{ fontSize: '14px', padding: '10px 24px', marginTop: '12px', display: 'inline-block' }}
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
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: '#ECFDF5',
                          color: '#10B981',
                        }}>
                          Upcoming
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── MY APPOINTMENTS ── */}
            {activeSection === 'appointments' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  My Appointments
                </h2>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  {appointments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <p style={{ fontSize: '48px', marginBottom: '12px' }}>📋</p>
                      <p style={{ color: '#64748B', fontSize: '16px' }}>No appointments yet</p>
                    </div>
                  ) : (
                    appointments.map(appt => (
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
                          {appt.reason && (
                            <p style={{ fontSize: '12px', color: '#94A3B8', margin: '4px 0 0' }}>
                              Reason: {appt.reason}
                            </p>
                          )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor:
                              appt.status === 'upcoming' ? '#ECFDF5' :
                              appt.status === 'completed' ? '#EFF6FF' : '#FEF2F2',
                            color:
                              appt.status === 'upcoming' ? '#10B981' :
                              appt.status === 'completed' ? '#2563EB' : '#EF4444',
                          }}>
                            {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                          </span>
                          {appt.status === 'upcoming' && (
                            <button
                              onClick={() => handleCancelAppointment(appt._id)}
                              style={{
                                display: 'block',
                                marginTop: '8px',
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
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── PROFILE ── */}
            {activeSection === 'profile' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  My Profile
                </h2>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  maxWidth: '600px',
                }}>
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
                    }}>
                      {patient?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1E293B', margin: '0 0 4px' }}>
                        {patient?.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>{patient?.email}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Phone</span>
                      <p style={{ fontSize: '15px', color: '#1E293B', margin: '4px 0 0' }}>{patient?.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Date of Birth</span>
                      <p style={{ fontSize: '15px', color: '#1E293B', margin: '4px 0 0' }}>
                        {patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Not set'}
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Gender</span>
                      <p style={{ fontSize: '15px', color: '#1E293B', margin: '4px 0 0' }}>{patient?.gender || 'Not set'}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Blood Type</span>
                      <p style={{ fontSize: '15px', color: '#1E293B', margin: '4px 0 0' }}>{patient?.bloodType || 'Not set'}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Member Since</span>
                      <p style={{ fontSize: '15px', color: '#1E293B', margin: '4px 0 0' }}>
                        {patient?.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
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