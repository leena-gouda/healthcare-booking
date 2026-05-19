import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isStaffMode, setIsStaffMode] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    bloodType: '',
  });

  const [staffRegisterData, setStaffRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecret: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleStaffRegisterChange = (e) => {
    const { name, value } = e.target;
    setStaffRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    else if (!loginData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (!loginData.password) newErrors.password = 'Password is required';
    else if (loginData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrors({ email: data.message || 'Login failed' });
          setLoading(false);
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('patient', JSON.stringify(data.patient));
        setSuccessMsg('Login successful! Redirecting...');
        setTimeout(() => {
          if (data.patient.role === 'admin') navigate('/admin');
          else navigate('/dashboard');
        }, 1500);
      } catch (err) {
        setErrors({ email: 'Server error. Is the backend running?' });
        setLoading(false);
      }
    }
  };

  const handleRegisterSubmit = async () => {
    const newErrors = {};
    if (!registerData.fullName) newErrors.fullName = 'Full name is required';
    if (!registerData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) newErrors.email = 'Enter a valid email address';
    if (!registerData.password) newErrors.password = 'Password is required';
    else if (registerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!registerData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!registerData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!registerData.gender) newErrors.gender = 'Please select a gender';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: registerData.fullName,
            email: registerData.email,
            password: registerData.password,
            dateOfBirth: registerData.dateOfBirth,
            gender: registerData.gender,
            phone: registerData.phone,
            bloodType: registerData.bloodType,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrors({ email: data.message || 'Registration failed' });
          setLoading(false);
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('patient', JSON.stringify(data.patient));
        setSuccessMsg('Account created! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
      } catch (err) {
        setErrors({ email: 'Server error. Is the backend running?' });
        setLoading(false);
      }
    }
  };

  const handleStaffRegisterSubmit = async () => {
    const newErrors = {};
    if (!staffRegisterData.fullName) newErrors.fullName = 'Full name is required';
    if (!staffRegisterData.email) newErrors.email = 'Email is required';
    else if (!staffRegisterData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (!staffRegisterData.password) newErrors.password = 'Password is required';
    else if (staffRegisterData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!staffRegisterData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (staffRegisterData.password !== staffRegisterData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!staffRegisterData.adminSecret) newErrors.adminSecret = 'Staff authorization code is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/auth/register-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: staffRegisterData.fullName,
            email: staffRegisterData.email,
            password: staffRegisterData.password,
            adminSecret: staffRegisterData.adminSecret,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrors({ adminSecret: data.message || 'Registration failed' });
          setLoading(false);
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('patient', JSON.stringify(data.patient));
        setSuccessMsg('Staff account created! Redirecting...');
        setTimeout(() => navigate('/admin'), 1500);
      } catch (err) {
        setErrors({ email: 'Server error. Is the backend running?' });
        setLoading(false);
      }
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setSuccessMsg('');
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* TOP LOGO */}
        <div className="login-header" style={{
          background: isStaffMode
            ? 'linear-gradient(135deg, #991B1B, #EF4444)'
            : 'linear-gradient(135deg, #1e40af, #2563EB)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>{isStaffMode ? '⚙️' : '🏥'}</div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>
            {isStaffMode ? 'Staff Portal' : 'HealthCare'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '6px' }}>
            {isStaffMode ? 'Administrative access only' : 'Your health, our priority'}
          </p>
        </div>

        {/* MODE TOGGLE */}
        <div style={{
          textAlign: 'center',
          padding: '12px',
          backgroundColor: isStaffMode ? '#FEF2F2' : '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          <button
            onClick={() => {
              setIsStaffMode(!isStaffMode);
              setErrors({});
              setSuccessMsg('');
              setActiveTab('login');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: isStaffMode ? '#EF4444' : '#2563EB',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {isStaffMode ? '← Back to Patient Login' : 'Staff Member? Click here →'}
          </button>
        </div>

        {/* TABS */}
        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === 'login' ? 'active' : 'inactive'}`}
            onClick={() => switchTab('login')}
            style={activeTab === 'login' && isStaffMode ? { color: '#EF4444', borderBottomColor: '#EF4444' } : {}}
          >
            🔐 Login
          </button>
          <button
            className={`login-tab ${activeTab === 'register' ? 'active' : 'inactive'}`}
            onClick={() => switchTab('register')}
            style={activeTab === 'register' && isStaffMode ? { color: '#EF4444', borderBottomColor: '#EF4444' } : {}}
          >
            📝 Register
          </button>
        </div>

        {/* FORM AREA */}
        <div className="login-form-area">

          {successMsg && <div className="success-box">✅ {successMsg}</div>}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <div className="fade-in-up">
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: '#1E293B' }}>
                {isStaffMode ? 'Staff Login' : 'Welcome Back'}
              </h2>

              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input type="email" name="email" placeholder="you@example.com" value={loginData.email} onChange={handleLoginChange} className={`form-input-custom ${errors.email ? 'form-input-error' : ''}`} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <input type="password" name="password" placeholder="••••••••" value={loginData.password} onChange={handleLoginChange} className={`form-input-custom ${errors.password ? 'form-input-error' : ''}`} />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              {!isStaffMode && (
                <div className="d-flex align-items-center gap-2 mb-4">
                  <input type="checkbox" name="rememberMe" id="rememberMe" checked={loginData.rememberMe} onChange={handleLoginChange} style={{ width: '16px', height: '16px', accentColor: '#2563EB' }} />
                  <label htmlFor="rememberMe" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer', margin: 0 }}>Remember me</label>
                </div>
              )}

              <button onClick={handleLoginSubmit} className="submit-btn" disabled={loading} style={isStaffMode ? { backgroundColor: '#EF4444' } : {}}>
                {loading ? 'Logging in...' : 'Login →'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748B' }}>
                Don't have an account?{' '}
                <span onClick={() => switchTab('register')} style={{ color: isStaffMode ? '#EF4444' : '#2563EB', fontWeight: '700', cursor: 'pointer' }}>
                  Register here
                </span>
              </p>
            </div>
          )}

          {/* PATIENT REGISTER FORM */}
          {activeTab === 'register' && !isStaffMode && (
            <div className="fade-in-up">
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: '#1E293B' }}>
                Create Account
              </h2>

              <div className="mb-3">
                <label className="form-label-custom">Full Name</label>
                <input type="text" name="fullName" placeholder="John Doe" value={registerData.fullName} onChange={handleRegisterChange} className={`form-input-custom ${errors.fullName ? 'form-input-error' : ''}`} />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input type="email" name="email" placeholder="you@example.com" value={registerData.email} onChange={handleRegisterChange} className={`form-input-custom ${errors.email ? 'form-input-error' : ''}`} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Phone Number <span style={{ color: '#94A3B8', fontWeight: '400' }}>(optional)</span></label>
                <input type="tel" name="phone" placeholder="e.g. +20 1234567890" value={registerData.phone} onChange={handleRegisterChange} className="form-input-custom" />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label-custom">Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={registerData.dateOfBirth} onChange={handleRegisterChange} className={`form-input-custom ${errors.dateOfBirth ? 'form-input-error' : ''}`} />
                  {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
                </div>
                <div className="col-6">
                  <label className="form-label-custom">Gender</label>
                  <select name="gender" value={registerData.gender} onChange={handleRegisterChange} className={`form-input-custom ${errors.gender ? 'form-input-error' : ''}`}>
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="error-text">{errors.gender}</p>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Blood Type <span style={{ color: '#94A3B8', fontWeight: '400' }}>(optional)</span></label>
                <select name="bloodType" value={registerData.bloodType} onChange={handleRegisterChange} className="form-input-custom">
                  <option value="">Select blood type...</option>
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

              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <input type="password" name="password" placeholder="••••••••" value={registerData.password} onChange={handleRegisterChange} className={`form-input-custom ${errors.password ? 'form-input-error' : ''}`} />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div className="mb-4">
                <label className="form-label-custom">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="••••••••" value={registerData.confirmPassword} onChange={handleRegisterChange} className={`form-input-custom ${errors.confirmPassword ? 'form-input-error' : ''}`} />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>

              <button onClick={handleRegisterSubmit} className="submit-btn" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748B' }}>
                Already have an account?{' '}
                <span onClick={() => switchTab('login')} style={{ color: '#2563EB', fontWeight: '700', cursor: 'pointer' }}>
                  Login here
                </span>
              </p>
            </div>
          )}

          {/* STAFF REGISTER FORM */}
          {activeTab === 'register' && isStaffMode && (
            <div className="fade-in-up">
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: '#1E293B' }}>
                Staff Registration
              </h2>

              <div style={{ backgroundColor: '#FEF2F2', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', fontSize: '13px', color: '#991B1B', borderLeft: '4px solid #EF4444' }}>
                🔒 You need the staff authorization code to register. Contact your administrator if you don't have it.
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Full Name</label>
                <input type="text" name="fullName" placeholder="Dr. Jane Smith" value={staffRegisterData.fullName} onChange={handleStaffRegisterChange} className={`form-input-custom ${errors.fullName ? 'form-input-error' : ''}`} />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input type="email" name="email" placeholder="you@healthcare.com" value={staffRegisterData.email} onChange={handleStaffRegisterChange} className={`form-input-custom ${errors.email ? 'form-input-error' : ''}`} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <input type="password" name="password" placeholder="••••••••" value={staffRegisterData.password} onChange={handleStaffRegisterChange} className={`form-input-custom ${errors.password ? 'form-input-error' : ''}`} />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="••••••••" value={staffRegisterData.confirmPassword} onChange={handleStaffRegisterChange} className={`form-input-custom ${errors.confirmPassword ? 'form-input-error' : ''}`} />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>

              <div className="mb-4">
                <label className="form-label-custom">🔑 Staff Authorization Code</label>
                <input type="password" name="adminSecret" placeholder="Enter the code provided by your administrator" value={staffRegisterData.adminSecret} onChange={handleStaffRegisterChange} className={`form-input-custom ${errors.adminSecret ? 'form-input-error' : ''}`} />
                {errors.adminSecret && <p className="error-text">{errors.adminSecret}</p>}
              </div>

              <button onClick={handleStaffRegisterSubmit} className="submit-btn" disabled={loading} style={{ backgroundColor: '#EF4444' }}>
                {loading ? 'Creating staff account...' : 'Register as Staff →'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748B' }}>
                Already have a staff account?{' '}
                <span onClick={() => switchTab('login')} style={{ color: '#EF4444', fontWeight: '700', cursor: 'pointer' }}>
                  Login here
                </span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;