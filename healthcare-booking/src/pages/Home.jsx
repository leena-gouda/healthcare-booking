import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { number: '500+', label: 'Expert Doctors' },
    { number: '10,000+', label: 'Happy Patients' },
    { number: '50+', label: 'Specialties' },
    { number: '15+', label: 'Years of Excellence' },
  ];

  const steps = [
    { icon: '🔍', step: '01', title: 'Search', desc: 'Search for a doctor by name, specialty, or condition.' },
    { icon: '📅', step: '02', title: 'Book', desc: 'Pick a time that works for you and confirm your appointment.' },
    { icon: '💊', step: '03', title: 'Get Care', desc: 'Visit your doctor and get the care you deserve.' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(135deg, rgba(30, 64, 175, 0.25) 0%, rgba(37, 99, 235, 0.20) 50%, rgba(59, 130, 246, 0.15) 100%), url(${process.env.PUBLIC_URL}/hospital_interior2.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container">
          <p className="hero-badge fade-in-up">Welcome to HealthCare</p>
          <h1 className="hero-title fade-in-up fade-in-up-delay-1">
            Your Health Is Our <span>Top Priority</span>
          </h1>
          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">
            Book appointments with top-rated doctors, get expert care, and take control of your health journey.
          </p>

          {/* SEARCH BAR */}
          <div className="fade-in-up fade-in-up-delay-3" style={{ maxWidth: '560px', margin: '0 auto 32px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0', borderRadius: '50px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <input
                type="text"
                placeholder="Search by doctor, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: '#1E293B',
                  backgroundColor: 'white',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '16px 28px',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                🔍 Search
              </button>
            </form>
          </div>

          <div className="d-flex gap-3 justify-content-center flex-wrap fade-in-up fade-in-up-delay-3">
            <Link to="/book-appointment" className="hero-btn-primary">
              📅 Book Appointment
            </Link>
            <Link to="/doctors" className="hero-btn-secondary">
              👨‍⚕️ Our Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-section">
        <div className="container">
          <div className="row justify-content-center text-center g-4">
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className={`stat-number fade-in-up fade-in-up-delay-${i + 1}`}>{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* MISSION & VISION */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="mission-card">
                <div className="mv-icon">🎯</div>
                <h3 className="mv-title">Our Mission</h3>
                <p className="mv-text">
                  To provide accessible, compassionate, and world-class healthcare to every patient.
                  We believe quality medical care is a right, not a privilege — and we work every day
                  to make that a reality for our community.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="vision-card">
                <div className="mv-icon">🔭</div>
                <h3 className="mv-title">Our Vision</h3>
                <p className="mv-text">
                  To be the most trusted healthcare platform in the region — where patients feel heard,
                  doctors are empowered, and every interaction leads to better health outcomes for
                  individuals and families alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get the care you need in 3 easy steps</p>
          </div>
          <div className="row g-4 justify-content-center">
            {steps.map((s, i) => (
              <div key={i} className="col-12 col-sm-4">
                <div style={{
                  textAlign: 'center',
                  padding: '40px 24px',
                  borderRadius: '20px',
                  backgroundColor: '#F8FAFC',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  height: '100%',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,99,235,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '20px',
                    fontSize: '13px',
                    fontWeight: '800',
                    color: '#E2E8F0',
                    letterSpacing: '1px',
                  }}>{s.step}</div>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#1E293B' }}>{s.title}</h3>
                  <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.7', margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">What We Offer</p>
            <h2 className="section-title">Our Medical Services</h2>
            <p className="section-subtitle">World-class care across a wide range of specialties</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
            {[
              { icon: '🫀', title: 'Cardiology' },
              { icon: '🧠', title: 'Neurology' },
              { icon: '🦷', title: 'Dental Care' },
              { icon: '👁️', title: 'Ophthalmology' },
              { icon: '🦴', title: 'Orthopedics' },
              { icon: '👶', title: 'Pediatrics' },
              { icon: '🩺', title: 'General Medicine' },
              { icon: '🧬', title: 'Dermatology' },
              { icon: '🏃', title: 'Physical Therapy' },
            ].map((s, i) => (
              <Link
                key={i}
                to={`/book-appointment?specialty=${s.title}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'white',
                  border: '2px solid #E2E8F0',
                  borderRadius: '50px',
                  padding: '12px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1E293B',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.color = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.color = '#1E293B';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <span>{s.icon}</span> {s.title}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="btn-outline-primary-custom">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4 text-center">
          <p className="section-badge">Meet The Team</p>
          <h2 className="section-title">World-Class Doctors</h2>
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '12px auto 32px' }}>
            Our team of 500+ verified specialists are dedicated to giving you the best care possible.
          </p>
          <Link to="/doctors" className="btn-outline-primary-custom">
            👨‍⚕️ Meet Our Doctors →
          </Link>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Join thousands of patients who trust us with their health. Book your appointment today.
          </p>
          <Link to="/book-appointment" className="cta-btn">
            📅 Book Now — It's Free
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;