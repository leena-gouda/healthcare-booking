import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function DoctorProfile() {
  const { id } = useParams();
const navigate = useNavigate();

const [doctor, setDoctor] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedDay, setSelectedDay] = useState('Monday');
const [reviewName, setReviewName] = useState('');
const [reviewComment, setReviewComment] = useState('');
const [reviewRating, setReviewRating] = useState(5);
const [reviews, setReviews] = useState([]);
const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  fetch(`http://localhost:5000/api/doctors/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setDoctor(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });

  fetch(`http://localhost:5000/api/reviews/${id}`)
    .then((res) => res.json())
    .then((data) => setReviews(Array.isArray(data) ? data : []))
    .catch((err) => {
      console.log(err);
      setReviews([]);
    });
}, [id]);

const avgRating = reviews.length
  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  : doctor?.rating;
  


  if (loading) {
  return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748B' }}>
      Loading doctor profile...
    </div>
  );
}


  if (!doctor) {
    return (
      <div style={styles.notFound}>
        <h2>Doctor not found</h2>
        <button onClick={() => navigate('/doctors')} style={styles.backBtn}>
          Back to Doctors
        </button>
      </div>
    );
  }

  const handleReviewSubmit = async (e) => {
  e.preventDefault();
  if (!reviewName || !reviewComment) return;
  try {
    const response = await fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: id,
        author: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      }),
    });
    const newReview = await response.json();
    setReviews([newReview, ...reviews]);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  } catch (err) {
    console.log(err);
  }
};

const days = doctor?.availability ? Object.keys(doctor.availability) : [];
  return (
    <div style={styles.page}>

      {/* Back button */}
      <button onClick={() => navigate('/doctors')} style={styles.backBtn}>
        ← Back to Doctors
      </button>

      {/* Top profile card */}
      <div style={styles.profileCard}>
        <img src={doctor.image} alt={doctor.name} style={styles.profileImage} />
        <div style={styles.profileInfo}>
          <div style={styles.profileTop}>
            <div>
              <h1 style={styles.profileName}>{doctor.name}</h1>
              <p style={styles.profileSpecialty}>{doctor.specialty}</p>
            </div>
            <span style={{
              ...styles.availBadge,
              backgroundColor: doctor.available ? '#D1FAE5' : '#FEE2E2',
              color: doctor.available ? '#065F46' : '#991B1B',
            }}>
              {doctor.available ? '● Available' : '● Unavailable'}
            </span>
          </div>

          {/* Stats row */}
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{doctor.experience}</span>
              <span style={styles.statLabel}>Years exp.</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>{avgRating}</span>
              <span style={styles.statLabel}>Rating</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>{reviews.length}</span>
              <span style={styles.statLabel}>Reviews</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>EGP {doctor.fee}</span>
              <span style={styles.statLabel}>Per session</span>
            </div>
          </div>

          {/* Tags */}
          <div style={styles.tagsRow}>
            {(doctor.languages || []).map((lang) => (
              <span key={lang} style={styles.tag}>🌐 {lang}</span>
            ))}
            <span style={styles.tag}>🎓 {doctor.education?.split(',')[0]}</span>
          </div>

          {/* Book button */}
          <button
            style={styles.bookBtn}
            onClick={() => navigate(`/book?doctor=${encodeURIComponent(doctor.name)}`)}
          >
            Book Appointment with {doctor.name?.split(' ')[1]}
          </button>
        </div>
      </div>

      <div style={styles.twoCol}>

        {/* Left column */}
        <div style={styles.leftCol}>

          {/* About */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>About</h2>
            <p style={styles.aboutText}>{doctor.about}</p>
          </div>

          {/* Education */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Education & Training</h2>
            <p style={styles.aboutText}>{doctor.education}</p>
          </div>

          {/* Reviews */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Patient Reviews</h2>
            {(reviews || []).map((review, index) => (
              <div key={index} style={styles.reviewCard}>
                <div style={styles.reviewTop}>
                  <div style={styles.reviewAvatar}>
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p style={styles.reviewAuthor}>{review.author}</p>
                    <p style={styles.reviewDate}>{review.date}</p>
                  </div>
                  <span style={styles.reviewRating}>
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p style={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Leave a review form */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Leave a Review</h2>
            {submitted && (
              <div style={styles.successMsg}>
                ✅ Thank you! Your review has been submitted.
              </div>
            )}
            <form onSubmit={handleReviewSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Your name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                style={styles.input}
                required
              />
              <div style={styles.ratingRow}>
                <label style={styles.ratingLabel}>Your rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    style={{
                      ...styles.starBtn,
                      color: star <= reviewRating ? '#F59E0B' : '#CBD5E1',
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Share your experience with this doctor..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                style={styles.textarea}
                rows={4}
                required
              />
              <button type="submit" style={styles.submitBtn}>
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Right column - Availability */}
        <div style={styles.rightCol}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Availability</h2>

            {/* Day selector */}
            <div style={styles.daySelector}>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  style={{
                    ...styles.dayBtn,
                    ...(selectedDay === day ? styles.dayBtnActive : {}),
                  }}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* Time slots */}
            <div style={styles.slots}>
              {(doctor.availability?.[selectedDay] || []).length === 0 ? (
                <p style={styles.noSlots}>No slots available on {selectedDay}</p>
              ) : (
                (doctor.availability?.[selectedDay] || []).map((time) => (
                  <div key={time} style={styles.slot}>
                    🕐 {time}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  notFound: {
    textAlign: 'center',
    padding: '80px',
  },
  backBtn: {
    background: 'none',
    border: '1.5px solid #E2E8F0',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    color: '#64748B',
    cursor: 'pointer',
    marginBottom: '24px',
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '20px',
    padding: '32px',
    display: 'flex',
    gap: '32px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  profileImage: {
    width: '160px',
    height: '160px',
    borderRadius: '16px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
    minWidth: '280px',
  },
  profileTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  profileName: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '4px',
  },
  profileSpecialty: {
    fontSize: '16px',
    color: '#2563EB',
    fontWeight: '600',
  },
  availBadge: {
    fontSize: '13px',
    fontWeight: '600',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  statsRow: {
    display: 'flex',
    gap: '0',
    marginBottom: '20px',
    backgroundColor: '#F8FAFC',
    borderRadius: '12px',
    padding: '16px',
  },
  stat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statNumber: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: '12px',
    color: '#94A3B8',
  },
  statDivider: {
    width: '1px',
    backgroundColor: '#E2E8F0',
    margin: '0 8px',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  tag: {
    fontSize: '13px',
    backgroundColor: '#F1F5F9',
    color: '#475569',
    padding: '6px 12px',
    borderRadius: '20px',
  },
  bookBtn: {
    padding: '14px 28px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '16px',
  },
  aboutText: {
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.7',
  },
  reviewCard: {
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '16px',
    marginBottom: '16px',
  },
  reviewTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  reviewAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
    flexShrink: 0,
  },
  reviewAuthor: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1E293B',
    margin: 0,
  },
  reviewDate: {
    fontSize: '12px',
    color: '#94A3B8',
    margin: 0,
  },
  reviewRating: {
    marginLeft: 'auto',
    fontSize: '13px',
  },
  reviewComment: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.6',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px 16px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#F8FAFC',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  ratingLabel: {
    fontSize: '14px',
    color: '#64748B',
    marginRight: '4px',
  },
  starBtn: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    padding: '0',
    lineHeight: 1,
  },
  textarea: {
    padding: '12px 16px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#F8FAFC',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  successMsg: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '12px',
  },
  daySelector: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  dayBtn: {
    padding: '8px 12px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#64748B',
  },
  dayBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
    color: '#ffffff',
  },
  slots: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  slot: {
    padding: '10px 16px',
    backgroundColor: '#F0FDF4',
    border: '1px solid #BBF7D0',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#166534',
    fontWeight: '500',
  },
  noSlots: {
    color: '#94A3B8',
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px 0',
  },
};

export default DoctorProfile;