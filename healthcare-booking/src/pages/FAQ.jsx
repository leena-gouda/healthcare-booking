import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

const faqs = [
  { question: "How do I book an appointment?", answer: "You can book an appointment by navigating to the 'Book Appointment' page, selecting your preferred doctor, choosing an available date and time, and filling in your details." },
  { question: "Can I cancel or reschedule my appointment?", answer: "Yes! You can cancel or reschedule your appointment from your Patient Dashboard up to 24 hours before the scheduled time." },
  { question: "How do I choose the right doctor?", answer: "Visit our Doctors List page where you can filter doctors by specialty, availability, and ratings. Each doctor has a detailed profile to help you make the best choice." },
  { question: "Is my personal information secure?", answer: "Absolutely. We use industry-standard encryption and JWT authentication to keep your data safe and private at all times." },
  { question: "Do I need to create an account to book an appointment?", answer: "Yes, you need to register and log in to book appointments. This helps us keep track of your medical history and appointment records." },
  { question: "What should I bring to my appointment?", answer: "Please bring a valid ID, your insurance card if applicable, and any previous medical records or test results relevant to your visit." },
  { question: "How will I receive my appointment confirmation?", answer: "Once your appointment is confirmed, you will receive a confirmation notification. You can also view all your appointments in your Patient Dashboard." },
  { question: "What specialties are available?", answer: "We offer a wide range of specialties including General Practice, Cardiology, Dermatology, Pediatrics, Orthopedics, and many more." },
];

const FAQ = () => {
  const { darkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
      padding: '60px 20px',
      fontFamily: 'sans-serif',
      transition: 'background-color 0.3s',
    },
    header: { textAlign: 'center', marginBottom: '50px' },
    title: { fontSize: '2.2rem', color: darkMode ? '#F1F5F9' : '#1E293B', marginBottom: '12px' },
    subtitle: { fontSize: '1rem', color: darkMode ? '#94A3B8' : '#64748B', maxWidth: '600px', margin: '0 auto' },
    link: { color: '#2563EB', textDecoration: 'none' },
    faqList: { maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' },
    faqItem: { borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    icon: { fontSize: '1.4rem', fontWeight: '300', marginLeft: '10px' },
    answer: {
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      padding: '16px 24px',
      color: darkMode ? '#94A3B8' : '#475569',
      fontSize: '0.95rem',
      lineHeight: '1.7',
      borderTop: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <p style={styles.subtitle}>
          Have questions? We've got answers. If you can't find what you're looking for, feel free to{' '}
          <a href="/contact" style={styles.link}>contact us</a>.
        </p>
      </div>

      <div style={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <button
              style={{
                width: '100%',
                padding: '18px 24px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'left',
                transition: 'background-color 0.3s',
                backgroundColor: openIndex === index ? '#2563EB' : darkMode ? '#1E293B' : '#ffffff',
                color: openIndex === index ? '#ffffff' : darkMode ? '#F1F5F9' : '#1E293B',
              }}
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              <span style={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div style={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;