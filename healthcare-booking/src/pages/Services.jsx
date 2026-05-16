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

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#1E293B' }}>

      {/* PAGE HEADER */}
      <section style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #2563EB 100%)',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '12px' }}>
          What We Offer
        </p>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>Our Medical Services</h1>
        <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '550px', margin: '0 auto' }}>
          World-class care across a wide range of specialties — all under one roof.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '60px 40px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            { icon: '🏆', title: 'Award Winning', desc: 'Recognized for excellence in patient care' },
            { icon: '👨‍⚕️', title: '500+ Specialists', desc: 'Board-certified doctors in every field' },
            { icon: '🕐', title: '24/7 Available', desc: 'Round the clock emergency services' },
            { icon: '💳', title: 'Insurance Accepted', desc: 'We work with all major providers' },
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '28px 24px',
              textAlign: 'center',
              width: '220px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.icon}</div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ color: '#64748B', fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#2563EB', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '13px' }}>
            All Specialties
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px' }}>Browse By Service</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {services.map((service, i) => (
            <div key={i} style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '20px',
              padding: '36px 28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,99,235,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ fontSize: '44px', marginBottom: '16px' }}>{service.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{service.title}</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>{service.desc}</p>

              {/* Feature list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {service.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '14px', color: '#475569', marginBottom: '8px' }}>
                    <span style={{ color: '#10B981', fontWeight: '700', marginRight: '8px' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/book-appointment" style={{
                display: 'inline-block',
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
              }}>
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{
        background: 'linear-gradient(135deg, #10B981, #059669)',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '16px' }}>
          Not Sure Which Service You Need?
        </h2>
        <p style={{ fontSize: '17px', opacity: 0.9, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
          Talk to one of our general practitioners and they'll guide you to the right specialist.
        </p>
        <Link to="/book-appointment" style={{
          backgroundColor: 'white',
          color: '#059669',
          padding: '16px 40px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '17px',
          fontWeight: '800',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          📅 Book a Consultation
        </Link>
      </section>

    </div>
  );
}

export default Services;
