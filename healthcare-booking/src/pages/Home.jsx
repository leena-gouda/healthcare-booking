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
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#1E293B' }}>

      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #2563EB 50%, #3b82f6 100%)',
        color: 'white',
        padding: '100px 40px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '16px' }}>
          Welcome to HealthCare
        </p>
        <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
          Your Health Is Our <span style={{ color: '#10B981' }}>Top Priority</span>
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.85, maxWidth: '550px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Book appointments with top-rated doctors, get expert care, and take control of your health journey.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/book-appointment" style={{
            backgroundColor: '#10B981',
            color: 'white',
            padding: '16px 36px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '17px',
            fontWeight: '700',
            boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          }}>
            📅 Book Appointment
          </Link>
          <Link to="/doctors" style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'white',
            padding: '16px 36px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '17px',
            fontWeight: '700',
            border: '2px solid rgba(255,255,255,0.4)',
          }}>
            👨‍⚕️ Our Doctors
          </Link>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '48px 40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        flexWrap: 'wrap',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', fontWeight: '800', color: '#2563EB' }}>{stat.number}</div>
            <div style={{ fontSize: '15px', color: '#64748B', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </section>
      {/* MISSION & VISION */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Mission */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{
              backgroundColor: '#EFF6FF',
              borderRadius: '20px',
              padding: '40px',
              borderLeft: '6px solid #2563EB',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#1E293B', marginBottom: '16px' }}>Our Mission</h3>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8' }}>
                To provide accessible, compassionate, and world-class healthcare to every patient. 
                We believe quality medical care is a right, not a privilege — and we work every day 
                to make that a reality for our community.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{
              backgroundColor: '#ECFDF5',
              borderRadius: '20px',
              padding: '40px',
              borderLeft: '6px solid #10B981',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔭</div>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#1E293B', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8' }}>
                To be the most trusted healthcare platform in the region — where patients feel heard, 
                doctors are empowered, and every interaction leads to better health outcomes for 
                individuals and families alike.
              </p>
            </div>
          </div>

        </div>
      </section>
      {/* SERVICES SECTION */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#2563EB', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '13px' }}>What We Offer</p>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px' }}>Our Medical Services</h2>
          <p style={{ color: '#64748B', fontSize: '16px', marginTop: '12px' }}>World-class care across a wide range of specialties</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {services.map((s, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/services" style={{
            color: '#2563EB',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '15px',
            border: '2px solid #2563EB',
            padding: '12px 28px',
            borderRadius: '50px',
          }}>
            View All Services →
          </Link>
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#2563EB', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '13px' }}>Meet The Team</p>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px' }}>Featured Doctors</h2>
          <p style={{ color: '#64748B', fontSize: '16px', marginTop: '12px' }}>Trusted by thousands of patients</p>
        </div>
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {doctors.map((doc, i) => (
            <div key={i} style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '20px',
              padding: '32px 24px',
              textAlign: 'center',
              width: '260px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <img src={doc.image} alt={doc.name} style={{
                width: '90px', height: '90px', borderRadius: '50%',
                objectFit: 'cover', border: '4px solid #2563EB', marginBottom: '16px',
              }} />
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px' }}>{doc.name}</h3>
              <p style={{ color: '#2563EB', fontSize: '14px', marginBottom: '8px' }}>{doc.specialty}</p>
              <p style={{ color: '#F59E0B', fontSize: '14px', marginBottom: '16px' }}>⭐ {doc.rating}</p>
              <Link to="/doctors" style={{
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
              }}>View Profile</Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/doctors" style={{
            color: '#2563EB', fontWeight: '600', textDecoration: 'none',
            fontSize: '15px', border: '2px solid #2563EB',
            padding: '12px 28px', borderRadius: '50px',
          }}>
            View All Doctors →
          </Link>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{
        background: 'linear-gradient(135deg, #10B981, #059669)',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '16px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '36px', maxWidth: '500px', margin: '0 auto 36px' }}>
          Join thousands of patients who trust us with their health. Book your appointment today.
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
          📅 Book Now — It's Free
        </Link>
      </section>

    </div>
  );
}

export default Home;