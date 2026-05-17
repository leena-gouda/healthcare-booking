import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function About() {
  // Animated counter hook
  function useCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        },
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
      if (!started) return;
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [started, target, duration]);

    return { count, ref };
  }

  const counter1 = useCounter(500);
  const counter2 = useCounter(10000);
  const counter3 = useCounter(50);
  const counter4 = useCounter(15);

  const values = [
    {
      icon: '💙',
      title: 'Patient First',
      desc: 'Every decision we make starts and ends with what is best for the patient. Your comfort, safety, and wellbeing come before everything else.',
    },
    {
      icon: '🔬',
      title: 'Innovation',
      desc: 'We embrace the latest in medical technology and digital health tools to deliver faster, smarter, and more accurate healthcare solutions.',
    },
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      desc: 'We believe you deserve complete clarity about your care. No hidden fees, no surprises — just honest, open communication at every step.',
    },
    {
      icon: '🌍',
      title: 'Accessibility',
      desc: 'Quality healthcare should not depend on where you live or how much you earn. We are committed to making care reachable for everyone.',
    },
  ];

  const timeline = [
    { year: '2009', title: 'Founded', desc: 'Started as a small clinic with a big dream — making healthcare accessible to all.' },
    { year: '2013', title: 'Went Digital', desc: 'Launched our first online booking platform, letting patients schedule visits from home.' },
    { year: '2017', title: 'Expanded Nationwide', desc: 'Grew to over 200 doctors across 10 cities, covering 30+ medical specialties.' },
    { year: '2021', title: 'AI Integration', desc: 'Introduced smart matching to connect patients with the most suitable specialists.' },
    { year: '2024', title: 'Where We Are Now', desc: '500+ doctors, 10,000+ happy patients, and still growing every single day.' },
  ];

  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => {
        setTeam(data);
        setLoadingTeam(false);
      })
      .catch(err => {
        console.error('Error fetching team:', err);
        setLoadingTeam(false);
      });
  }, []);

  return (
    <div>

      {/* HERO */}
      <section className="about-hero">
        <div className="container text-center">
          <p className="hero-badge fade-in-up">Who We Are</p>
          <h1 className="hero-title fade-in-up fade-in-up-delay-1">
            Healthcare Made <span>Human</span>
          </h1>
          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">
            We are a passionate team of doctors, engineers, and healthcare advocates
            on a mission to make quality medical care simple, accessible, and personal.
          </p>
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="row justify-content-center text-center g-4">
            <div className="col-6 col-md-3">
              <div className="stat-number" ref={counter1.ref}>{counter1.count}+</div>
              <div className="stat-label">Expert Doctors</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number" ref={counter2.ref}>{counter2.count.toLocaleString()}+</div>
              <div className="stat-label">Happy Patients</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number" ref={counter3.ref}>{counter3.count}+</div>
              <div className="stat-label">Specialties</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number" ref={counter4.ref}>{counter4.count}+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="section-badge">Our Story</p>
              <h2 className="section-title">From a Small Clinic to a Nationwide Platform</h2>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginTop: '20px' }}>
                What started in 2009 as a single neighborhood clinic with three doctors and a
                dream has grown into one of the most trusted healthcare platforms in the region.
              </p>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginTop: '12px' }}>
                We saw how difficult it was for patients to find the right doctor, wait weeks for
                appointments, and navigate a confusing healthcare system. So we built something better —
                a platform where booking a doctor is as easy as booking a table at your favorite restaurant.
              </p>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginTop: '12px' }}>
                Today, we connect thousands of patients with verified, top-rated doctors across
                50+ specialties — all with a few clicks.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="about-story-visual">
                <div className="story-emoji-grid">
                  <div className="story-emoji-item">🏥</div>
                  <div className="story-emoji-item">👨‍⚕️</div>
                  <div className="story-emoji-item">💻</div>
                  <div className="story-emoji-item">🌍</div>
                  <div className="story-emoji-item">❤️</div>
                  <div className="story-emoji-item">🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">Our Journey</p>
            <h2 className="section-title">Milestones That Define Us</h2>
            <p className="section-subtitle">A look at how far we have come</p>
          </div>
          <div className="about-timeline">
            {timeline.map((item, i) => (
              <div key={i} className={`about-timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="about-timeline-dot"></div>
                <div className="about-timeline-card">
                  <div className="about-timeline-year">{item.year}</div>
                  <h3 className="about-timeline-title">{item.title}</h3>
                  <p className="about-timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">What Drives Us</p>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles behind every decision we make</p>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="about-value-card">
                  <div className="about-value-icon">{v.icon}</div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR DOCTORS */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <p className="section-badge">Our Experts</p>
            <h2 className="section-title">Meet Our Doctors</h2>
            <p className="section-subtitle">Trusted professionals dedicated to your health</p>
          </div>
          <div className="row g-4 justify-content-center">
            {loadingTeam ? (
              <div className="text-center py-4">
                <p style={{ color: '#64748B', fontSize: '16px' }}>Loading doctors...</p>
              </div>
            ) : team.map((doc, i) => (
              <div key={doc._id || i} className="col-6 col-lg-3">
                <div className="about-team-card">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid #2563EB',
                      marginBottom: '16px',
                    }}
                  />
                  <h3 className="about-team-name">{doc.name}</h3>
                  <p className="about-team-role">{doc.specialty}</p>
                  <p style={{ fontSize: '13px', color: '#F59E0B', marginTop: '4px' }}>
                    ⭐ {doc.rating} · {doc.reviews} reviews
                  </p>
                  <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                    {doc.experience} years experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Experience Better Healthcare?</h2>
          <p className="cta-subtitle">
            Join thousands of patients who trust us with their health. Your journey to better care starts here.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/doctors" className="cta-btn">
              👨‍⚕️ Browse Doctors
            </Link>
            <Link to="/services" className="hero-btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
              🏥 Our Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;