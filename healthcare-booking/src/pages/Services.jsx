import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  const services = [
    {
      icon: '🫀',
      title: 'Cardiology',
      desc: 'Our cardiology department offers comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.',
      features: ['Heart Disease Treatment', 'ECG & Echocardiography', 'Preventive Cardiology'],
    },
    {
      icon: '🧠',
      title: 'Neurology',
      desc: 'Expert care for conditions affecting the brain, spinal cord, and nervous system with the latest diagnostic technology.',
      features: ['Stroke Treatment', 'Epilepsy Management', 'Migraine Therapy'],
    },
    {
      icon: '🦷',
      title: 'Dental Care',
      desc: 'Complete dental health services for the whole family, from routine checkups to advanced cosmetic procedures.',
      features: ['Teeth Cleaning', 'Cosmetic Dentistry', 'Orthodontics'],
    },
    {
      icon: '👁️',
      title: 'Ophthalmology',
      desc: 'Comprehensive eye care services including vision correction, treatment of eye diseases, and surgical procedures.',
      features: ['Vision Testing', 'Cataract Surgery', 'Laser Eye Treatment'],
    },
    {
      icon: '🦴',
      title: 'Orthopedics',
      desc: 'Specialized care for bones, joints, muscles, and ligaments with both surgical and non-surgical treatment options.',
      features: ['Joint Replacement', 'Sports Injuries', 'Spine Care'],
    },
    {
      icon: '👶',
      title: 'Pediatrics',
      desc: 'Dedicated healthcare for children from newborns to teenagers, delivered with compassion and expertise.',
      features: ['Newborn Care', 'Vaccinations', 'Child Development'],
    },
    {
      icon: '🩺',
      title: 'General Medicine',
      desc: 'Primary healthcare services for adults covering routine checkups, chronic disease management, and preventive care.',
      features: ['Annual Checkups', 'Chronic Disease Care', 'Health Screenings'],
    },
    {
      icon: '🧬',
      title: 'Dermatology',
      desc: 'Expert diagnosis and treatment of skin, hair, and nail conditions using the most advanced dermatological techniques.',
      features: ['Skin Disease Treatment', 'Cosmetic Procedures', 'Allergy Testing'],
    },
    {
      icon: '🏃',
      title: 'Physical Therapy',
      desc: 'Rehabilitation and physical therapy programs designed to restore movement, reduce pain, and improve quality of life.',
      features: ['Post-Surgery Rehab', 'Pain Management', 'Sports Recovery'],
    },
  ];

  const whyUs = [
    { icon: '🏆', title: 'Award Winning', desc: 'Recognized for excellence in patient care' },
    { icon: '👨‍⚕️', title: '500+ Specialists', desc: 'Board-certified doctors in every field' },
    { icon: '🕐', title: '24/7 Available', desc: 'Round the clock emergency services' },
    { icon: '💳', title: 'Insurance Accepted', desc: 'We work with all major providers' },
  ];

  return (
    <div>

      {/* PAGE HEADER */}
      {/* PAGE HEADER */}
        <section style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 40%, #10B981 100%)',
          color: 'white',
          padding: '100px 20px',
          textAlign: 'center',
        }}>
        <div className="container">
          <p className="hero-badge fade-in-up">What We Offer</p>
          <h1 className="hero-title fade-in-up fade-in-up-delay-1">
            Our Medical <span>Services</span>
          </h1>
          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">
            World-class care across a wide range of specialties — all under one roof.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">Why Choose Us</p>
            <h2 className="section-title">The HealthCare Difference</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {whyUs.map((item, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="why-card">
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.icon}</div>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>{item.title}</h4>
                  <p style={{ color: '#64748B', fontSize: '14px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">All Specialties</p>
            <h2 className="section-title">Browse By Service</h2>
          </div>
          <div className="row g-4">
            {services.map((service, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="service-page-card">
                  <div style={{ fontSize: '44px', marginBottom: '16px' }}>{service.icon}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{service.title}</h3>
                  <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>{service.desc}</p>
                  <ul className="service-feature-list">
                    {service.features.map((f, j) => (
                      <li key={j}>
                        <span>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/book-appointment?specialty=${service.title}`}
                    className="hero-btn-primary"
                    style={{ fontSize: '14px', padding: '10px 24px' }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Not Sure Which Service You Need?</h2>
          <p className="cta-subtitle">
            Talk to one of our general practitioners and they'll guide you to the right specialist.
          </p>
          <Link to="/book-appointment" className="cta-btn">
            📅 Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Services;