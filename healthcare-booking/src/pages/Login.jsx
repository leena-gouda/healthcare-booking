import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

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
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    else if (!loginData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (!loginData.password) newErrors.password = 'Password is required';
    else if (loginData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSuccessMsg('Login successful! Redirecting...');
      setTimeout(() => navigate('/book-appointment'), 1500);
    }
  };

  const handleRegisterSubmit = () => {
    const newErrors = {};
    if (!registerData.fullName) newErrors.fullName = 'Full name is required';
    if (!registerData.email) newErrors.email = 'Email is required';
    else if (!registerData.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (!registerData.password) newErrors.password = 'Password is required';
    else if (registerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!registerData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!registerData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!registerData.gender) newErrors.gender = 'Please select a gender';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSuccessMsg('Account created! Redirecting...');
      setTimeout(() => navigate('/book-appointment'), 1500);
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
        <div className="login-header">
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏥</div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>HealthCare</h1>
          <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '6px' }}>Your health, our priority</p>
        </div>

        {/* TABS */}
        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === 'login' ? 'active' : 'inactive'}`}
            onClick={() => switchTab('login')}
          >
            🔐 Login
          </button>
          <button
            className={`login-tab ${activeTab === 'register' ? 'active' : 'inactive'}`}
            onClick={() => switchTab('register')}
          >
            📝 Register
          </button>
        </div>

        {/* FORM AREA */}
        <div className="login-form-area">

          {/* SUCCESS MESSAGE */}
          {successMsg && (
            <div className="success-box">✅ {successMsg}</div>
          )}

          {/* ── LOGIN FORM ── */}
          {activeTab === 'login' && (
            <div className="fade-in-up">
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: '#1E293B' }}>
                Welcome Back
              </h2>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className={`form-input-custom ${errors.email ? 'form-input-error' : ''}`}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className={`form-input-custom ${errors.password ? 'form-input-error' : ''}`}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              {/* Remember me */}
              <div className="d-flex align-items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                  style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer', margin: 0 }}>
                  Remember me
                </label>
              </div>

              <button onClick={handleLoginSubmit} className="submit-btn">
                Login →
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748B' }}>
                Don't have an account?{' '}
                <span
                  onClick={() => switchTab('register')}
                  style={{ color: '#2563EB', fontWeight: '700', cursor: 'pointer' }}
                >
                  Register here
                </span>
              </p>
            </div>
          )}

          {/* ── REGISTER FORM ── */}
          {activeTab === 'register' && (
            <div className="fade-in-up">
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: '#1E293B' }}>
                Create Account
              </h2>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label-custom">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  className={`form-input-custom ${errors.fullName ? 'form-input-error' : ''}`}
                />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className={`form-input-custom ${errors.email ? 'form-input-error' : ''}`}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* Date of Birth + Gender side by side */}
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label-custom">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={registerData.dateOfBirth}
                    onChange={handleRegisterChange}
                    className={`form-input-custom ${errors.dateOfBirth ? 'form-input-error' : ''}`}
                  />
                  {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
                </div>
                <div className="col-6">
                  <label className="form-label-custom">Gender</label>
                  <select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleRegisterChange}
                    className={`form-input-custom ${errors.gender ? 'form-input-error' : ''}`}
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="error-text">{errors.gender}</p>}
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className={`form-input-custom ${errors.password ? 'form-input-error' : ''}`}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label-custom">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className={`form-input-custom ${errors.confirmPassword ? 'form-input-error' : ''}`}
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>

              <button onClick={handleRegisterSubmit} className="submit-btn">
                Create Account →
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748B' }}>
                Already have an account?{' '}
                <span
                  onClick={() => switchTab('login')}
                  style={{ color: '#2563EB', fontWeight: '700', cursor: 'pointer' }}
                >
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