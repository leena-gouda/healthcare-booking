import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('patient') || 'null');

  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add doctor form
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '', specialty: '', experience: '', fee: '', education: '',
    about: '', image: '', available: true,
  });
  const [doctorMsg, setDoctorMsg] = useState('');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [statsRes, doctorsRes, patientsRes, apptsRes, blogRes, reviewsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats', { headers }),
        fetch('http://localhost:5000/api/doctors'),
        fetch('http://localhost:5000/api/admin/patients', { headers }),
        fetch('http://localhost:5000/api/admin/appointments', { headers }),
        fetch('http://localhost:5000/api/blog'),
        fetch('http://localhost:5000/api/admin/reviews', { headers }),
      ]);

      setStats(await statsRes.json());
      setDoctors(await doctorsRes.json());
      setPatients(await patientsRes.json());
      setAppointments(await apptsRes.json());
      setBlogPosts(await blogRes.json());
      setReviews(await reviewsRes.json());
      setLoading(false);
    } catch (err) {
      console.error('Error loading admin data:', err);
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    await fetch(`http://localhost:5000/api/admin/doctors/${id}`, { method: 'DELETE', headers });
    setDoctors(prev => prev.filter(d => d._id !== id));
  };

  const handleToggleDoctorAvailability = async (doc) => {
    const updated = await fetch(`http://localhost:5000/api/admin/doctors/${doc._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ available: !doc.available }),
    }).then(r => r.json());
    setDoctors(prev => prev.map(d => d._id === doc._id ? updated : d));
  };

  const handleAddDoctor = async () => {
    setDoctorMsg('');
    if (!newDoctor.name || !newDoctor.specialty) {
      setDoctorMsg('Name and specialty are required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/admin/doctors', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...newDoctor,
          experience: Number(newDoctor.experience) || 0,
          fee: Number(newDoctor.fee) || 0,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDoctors(prev => [...prev, data]);
        setNewDoctor({ name: '', specialty: '', experience: '', fee: '', education: '', about: '', image: '', available: true });
        setShowAddDoctor(false);
        setDoctorMsg('');
      } else {
        setDoctorMsg(data.message || 'Failed to add doctor');
      }
    } catch (err) {
      setDoctorMsg('Server error');
    }
  };

  const handleDeletePatient = async (id) => {
    if (!window.confirm('Delete this patient and all their appointments?')) return;
    await fetch(`http://localhost:5000/api/admin/patients/${id}`, { method: 'DELETE', headers });
    setPatients(prev => prev.filter(p => p._id !== id));
  };

  const handleUpdateAppointmentStatus = async (id, status) => {
    const updated = await fetch(`http://localhost:5000/api/admin/appointments/${id}/status`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status }),
    }).then(r => r.json());
    setAppointments(prev => prev.map(a => a._id === id ? updated : a));
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await fetch(`http://localhost:5000/api/admin/blog/${id}`, { method: 'DELETE', headers });
    setBlogPosts(prev => prev.filter(b => b._id !== id));
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    await fetch(`http://localhost:5000/api/admin/reviews/${id}`, { method: 'DELETE', headers });
    setReviews(prev => prev.filter(r => r._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('patient');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748B', fontSize: '18px' }}>Loading admin panel...</p>
      </div>
    );
  }

  const sidebarItems = [
    { key: 'overview', label: '📊 Overview' },
    { key: 'doctors', label: '👨‍⚕️ Doctors' },
    { key: 'patients', label: '👥 Patients' },
    { key: 'appointments', label: '📅 Appointments' },
    { key: 'blog', label: '📝 Blog Posts' },
    { key: 'reviews', label: '⭐ Reviews' },
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
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #F1F5F9',
    textAlign: 'left',
  };

  const tableCellStyle = {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#1E293B',
    borderBottom: '1px solid #F8FAFC',
  };

  const statusBadge = (status) => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'upcoming' ? '#ECFDF5' : status === 'completed' ? '#EFF6FF' : '#FEF2F2',
    color: status === 'upcoming' ? '#10B981' : status === 'completed' ? '#2563EB' : '#EF4444',
  });

  const actionBtn = (color) => ({
    padding: '6px 14px',
    borderRadius: '8px',
    border: `1.5px solid ${color}`,
    backgroundColor: 'transparent',
    color: color,
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '6px',
    transition: 'all 0.2s',
  });

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
                  background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '28px',
                  color: 'white',
                  fontWeight: '800',
                }}>
                  ⚙
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', margin: '0 0 4px' }}>
                  {user?.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600', margin: 0 }}>Administrator</p>
              </div>

              {sidebarItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '12px',
                    backgroundColor: activeSection === item.key ? '#FEF2F2' : 'transparent',
                    color: activeSection === item.key ? '#EF4444' : '#475569',
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

              <button onClick={handleLogout} style={{
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
              }}>
                🚪 Logout
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-lg-9">

            {/* ── OVERVIEW ── */}
            {activeSection === 'overview' && stats && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  Admin Dashboard
                </h2>
                <div className="row g-3 mb-4">
                  {[
                    { label: 'Doctors', value: stats.totalDoctors, color: '#2563EB', icon: '👨‍⚕️' },
                    { label: 'Patients', value: stats.totalPatients, color: '#10B981', icon: '👥' },
                    { label: 'Appointments', value: stats.totalAppointments, color: '#F59E0B', icon: '📅' },
                    { label: 'Blog Posts', value: stats.totalBlogPosts, color: '#8B5CF6', icon: '📝' },
                  ].map((stat, i) => (
                    <div key={i} className="col-6 col-md-3">
                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        textAlign: 'center',
                        borderTop: `4px solid ${stat.color}`,
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '32px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                        <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <div style={{ ...cardStyle, textAlign: 'center', borderTop: '4px solid #10B981' }}>
                      <div style={{ fontSize: '36px', fontWeight: '800', color: '#10B981' }}>{stats.upcomingAppointments}</div>
                      <div style={{ fontSize: '14px', color: '#64748B' }}>Upcoming Appointments</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{ ...cardStyle, textAlign: 'center', borderTop: '4px solid #2563EB' }}>
                      <div style={{ fontSize: '36px', fontWeight: '800', color: '#2563EB' }}>{stats.completedAppointments}</div>
                      <div style={{ fontSize: '14px', color: '#64748B' }}>Completed</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{ ...cardStyle, textAlign: 'center', borderTop: '4px solid #EF4444' }}>
                      <div style={{ fontSize: '36px', fontWeight: '800', color: '#EF4444' }}>{stats.cancelledAppointments}</div>
                      <div style={{ fontSize: '14px', color: '#64748B' }}>Cancelled</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── DOCTORS ── */}
            {activeSection === 'doctors' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', margin: 0 }}>
                    Manage Doctors ({doctors.length})
                  </h2>
                  <button
                    onClick={() => setShowAddDoctor(!showAddDoctor)}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#10B981',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {showAddDoctor ? '✕ Cancel' : '+ Add Doctor'}
                  </button>
                </div>

                {/* Add Doctor Form */}
                {showAddDoctor && (
                  <div style={{ ...cardStyle, marginBottom: '20px', maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>New Doctor</h3>
                    {doctorMsg && <p style={{ color: '#EF4444', fontSize: '14px', marginBottom: '12px' }}>{doctorMsg}</p>}
                    <div className="row g-3">
                      <div className="col-6">
                        <label className="form-label-custom">Name *</label>
                        <input className="form-input-custom" placeholder="Dr. Jane Smith" value={newDoctor.name}
                          onChange={e => setNewDoctor(p => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div className="col-6">
                        <label className="form-label-custom">Specialty *</label>
                        <input className="form-input-custom" placeholder="Cardiologist" value={newDoctor.specialty}
                          onChange={e => setNewDoctor(p => ({ ...p, specialty: e.target.value }))} />
                      </div>
                      <div className="col-6">
                        <label className="form-label-custom">Experience (years)</label>
                        <input className="form-input-custom" type="number" placeholder="10" value={newDoctor.experience}
                          onChange={e => setNewDoctor(p => ({ ...p, experience: e.target.value }))} />
                      </div>
                      <div className="col-6">
                        <label className="form-label-custom">Fee (EGP)</label>
                        <input className="form-input-custom" type="number" placeholder="300" value={newDoctor.fee}
                          onChange={e => setNewDoctor(p => ({ ...p, fee: e.target.value }))} />
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">Education</label>
                        <input className="form-input-custom" placeholder="MD from Cairo University" value={newDoctor.education}
                          onChange={e => setNewDoctor(p => ({ ...p, education: e.target.value }))} />
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">Image URL</label>
                        <input className="form-input-custom" placeholder="https://..." value={newDoctor.image}
                          onChange={e => setNewDoctor(p => ({ ...p, image: e.target.value }))} />
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">About</label>
                        <textarea className="form-input-custom" rows="2" placeholder="Brief bio..." value={newDoctor.about}
                          onChange={e => setNewDoctor(p => ({ ...p, about: e.target.value }))} />
                      </div>
                      <div className="col-12">
                        <button onClick={handleAddDoctor} className="submit-btn" style={{ backgroundColor: '#10B981' }}>
                          Add Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div style={cardStyle}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={tableHeaderStyle}>Doctor</th>
                          <th style={tableHeaderStyle}>Specialty</th>
                          <th style={tableHeaderStyle}>Experience</th>
                          <th style={tableHeaderStyle}>Fee</th>
                          <th style={tableHeaderStyle}>Rating</th>
                          <th style={tableHeaderStyle}>Status</th>
                          <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors.map(doc => (
                          <tr key={doc._id}>
                            <td style={tableCellStyle}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={doc.image || 'https://randomuser.me/api/portraits/men/1.jpg'} alt={doc.name}
                                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ fontWeight: '600' }}>{doc.name}</span>
                              </div>
                            </td>
                            <td style={tableCellStyle}>{doc.specialty}</td>
                            <td style={tableCellStyle}>{doc.experience} yrs</td>
                            <td style={tableCellStyle}>EGP {doc.fee}</td>
                            <td style={tableCellStyle}>⭐ {doc.rating}</td>
                            <td style={tableCellStyle}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                backgroundColor: doc.available ? '#ECFDF5' : '#FEF2F2',
                                color: doc.available ? '#10B981' : '#EF4444',
                              }}>
                                {doc.available ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td style={tableCellStyle}>
                              <button onClick={() => handleToggleDoctorAvailability(doc)}
                                style={actionBtn(doc.available ? '#F59E0B' : '#10B981')}>
                                {doc.available ? 'Disable' : 'Enable'}
                              </button>
                              <button onClick={() => handleDeleteDoctor(doc._id)} style={actionBtn('#EF4444')}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── PATIENTS ── */}
            {activeSection === 'patients' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  Registered Patients ({patients.length})
                </h2>
                <div style={cardStyle}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={tableHeaderStyle}>Name</th>
                          <th style={tableHeaderStyle}>Email</th>
                          <th style={tableHeaderStyle}>Gender</th>
                          <th style={tableHeaderStyle}>Joined</th>
                          <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.map(p => (
                          <tr key={p._id}>
                            <td style={tableCellStyle}>
                              <span style={{ fontWeight: '600' }}>{p.name}</span>
                            </td>
                            <td style={tableCellStyle}>{p.email}</td>
                            <td style={tableCellStyle}>{p.gender || '—'}</td>
                            <td style={tableCellStyle}>{new Date(p.createdAt).toLocaleDateString()}</td>
                            <td style={tableCellStyle}>
                              <button onClick={() => handleDeletePatient(p._id)} style={actionBtn('#EF4444')}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── APPOINTMENTS ── */}
            {activeSection === 'appointments' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  All Appointments ({appointments.length})
                </h2>
                <div style={cardStyle}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={tableHeaderStyle}>Patient</th>
                          <th style={tableHeaderStyle}>Doctor</th>
                          <th style={tableHeaderStyle}>Date</th>
                          <th style={tableHeaderStyle}>Time</th>
                          <th style={tableHeaderStyle}>Status</th>
                          <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map(appt => (
                          <tr key={appt._id}>
                            <td style={tableCellStyle}>
                              <span style={{ fontWeight: '600' }}>{appt.patient?.name || 'Unknown'}</span>
                              <br />
                              <span style={{ fontSize: '12px', color: '#64748B' }}>{appt.patient?.email}</span>
                            </td>
                            <td style={tableCellStyle}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={appt.doctor?.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
                                  alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                  <span style={{ fontWeight: '600', fontSize: '13px' }}>{appt.doctor?.name}</span>
                                  <br />
                                  <span style={{ fontSize: '12px', color: '#64748B' }}>{appt.doctor?.specialty}</span>
                                </div>
                              </div>
                            </td>
                            <td style={tableCellStyle}>{appt.date}</td>
                            <td style={tableCellStyle}>{appt.time}</td>
                            <td style={tableCellStyle}>
                              <span style={statusBadge(appt.status)}>
                                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                              </span>
                            </td>
                            <td style={tableCellStyle}>
                              {appt.status === 'upcoming' && (
                                <>
                                  <button onClick={() => handleUpdateAppointmentStatus(appt._id, 'completed')}
                                    style={actionBtn('#10B981')}>
                                    Complete
                                  </button>
                                  <button onClick={() => handleUpdateAppointmentStatus(appt._id, 'cancelled')}
                                    style={actionBtn('#EF4444')}>
                                    Cancel
                                  </button>
                                </>
                              )}
                              {appt.status !== 'upcoming' && (
                                <span style={{ fontSize: '12px', color: '#94A3B8' }}>No actions</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── BLOG POSTS ── */}
            {activeSection === 'blog' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  Blog Posts ({blogPosts.length})
                </h2>
                <div style={cardStyle}>
                  {blogPosts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#64748B', padding: '32px 0' }}>No blog posts yet</p>
                  ) : (
                    blogPosts.map(post => (
                      <div key={post._id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        marginBottom: '8px',
                      }}>
                        <div>
                          <p style={{ fontWeight: '700', fontSize: '15px', color: '#1E293B', margin: '0 0 4px' }}>
                            {post.title}
                          </p>
                          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                            {post.category} · by {post.author} · {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button onClick={() => handleDeleteBlog(post._id)} style={actionBtn('#EF4444')}>
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── REVIEWS ── */}
            {activeSection === 'reviews' && (
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
                  Patient Reviews ({reviews.length})
                </h2>
                <div style={cardStyle}>
                  {reviews.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#64748B', padding: '32px 0' }}>No reviews yet</p>
                  ) : (
                    reviews.map(review => (
                      <div key={review._id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        marginBottom: '8px',
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '700', fontSize: '14px', color: '#1E293B' }}>{review.author}</span>
                            <span style={{ color: '#F59E0B', fontSize: '13px' }}>
                              {'⭐'.repeat(review.rating)}
                            </span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 4px' }}>{review.comment}</p>
                          <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
                            For: {review.doctorId?.name || 'Unknown doctor'} · {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button onClick={() => handleDeleteReview(review._id)} style={actionBtn('#EF4444')}>
                          Delete
                        </button>
                      </div>
                    ))
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

export default AdminPanel;