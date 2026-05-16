import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const stats = [
    { number: '500+', label: 'Expert Doctors' },
    { number: '10,000+', label: 'Happy Patients' },
    { number: '50+', label: 'Specialties' },
    { number: '15+', label: 'Years of Excellence' },
  ];

  const services = [
    { icon: '🫀', title: 'Cardiology', desc: 'Expert heart care and cardiovascular treatment.' },
    { icon: '🧠', title: 'Neurology', desc: 'Advanced brain and nervous system specialists.' },
    { icon: '🦷', title: 'Dental Care', desc: 'Complete dental health for the whole family.' },
    { icon: '👁️', title: 'Ophthalmology', desc: 'Comprehensive eye care and vision treatment.' },
    { icon: '🦴', title: 'Orthopedics', desc: 'Bone, joint, and muscle care specialists.' },
    { icon: '👶', title: 'Pediatrics', desc: 'Dedicated healthcare for children of all ages.' },
  ];

  const doctors = [
    { name: 'Dr. Sarah Mitchell', specialty: 'Cardiologist', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Dr. James Carter', specialty: 'Neurologist', rating: 4.8, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Dr. Emily Chen', specialty: 'Pediatrician', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  ];

  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <p className="hero-badge fade-in-up">Welcome to HealthCare</p>
          <h1 className="hero-title fade-in-up fade-in-up-delay-1">
            Your Health Is Our <span>Top Priority</span>
          </h1>
          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">
            Book appointments with top-rated doctors, get expert care, and take control of your health journey.
          </p>
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

      {/* SERVICES SECTION */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">What We Offer</p>
            <h2 className="section-title">Our Medical Services</h2>
            <p className="section-subtitle">World-class care across a wide range of specialties</p>
          </div>
          <div className="row g-4">
            {services.map((s, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-4">
                <div className="service-card">
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/services" className="btn-outline-primary-custom">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">Meet The Team</p>
            <h2 className="section-title">Featured Doctors</h2>
            <p className="section-subtitle">Trusted by thousands of patients</p>
          </div>
          <div className="row g-4 justify-content-center">
            {doctors.map((doc, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-4">
                <div className="doctor-card">
                  <img src={doc.image} alt={doc.name} className="doctor-img" />
                  <h3 className="doctor-name">{doc.name}</h3>
                  <p className="doctor-specialty">{doc.specialty}</p>
                  <p className="doctor-rating">⭐ {doc.rating}</p>
                  <Link to="/doctors" className="hero-btn-primary" style={{ fontSize: '14px', padding: '10px 24px' }}>
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/doctors" className="btn-outline-primary-custom">
              View All Doctors →
            </Link>
          </div>
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