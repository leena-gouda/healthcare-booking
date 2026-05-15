import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const specialties = ['All', 'Cardiologist', 'Neurologist', 'Dermatologist', 'Orthopedic Surgeon', 'Pediatrician', 'Psychiatrist'];

function DoctorsList() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('http://localhost:5000/api/doctors')
    .then((res) => res.json())
    .then((data) => {
      setDoctors(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}, []);


  const filtered = doctors
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
      const matchesAvailability = availableOnly ? doc.available : true;
      return matchesSearch && matchesSpecialty && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'fee') return a.fee - b.fee;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    if (loading) {
  return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748B' }}>
      Loading doctors...
    </div>
  );
}

return (
  <div style={styles.page}>
      {/* Page header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Find a Doctor</h1>
        <p style={styles.subtitle}>
          Browse our {doctors.length} specialists and book your appointment today
        </p>
      </div>

      {/* Search bar */}
      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Filters row */}
      <div style={styles.filtersRow}>

        {/* Specialty chips */}
        <div style={styles.chips}>
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSpecialty(s)}
              style={{
                ...styles.chip,
                ...(selectedSpecialty === s ? styles.chipActive : {}),
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div style={styles.controls}>

          {/* Available toggle */}
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              style={{ marginRight: '6px' }}
            />
            Available only
          </label>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="rating">Sort: Top Rated</option>
            <option value="experience">Sort: Most Experienced</option>
            <option value="fee">Sort: Lowest Fee</option>
            <option value="name">Sort: Name A–Z</option>
          </select>

          {/* View toggle */}
          <div style={styles.viewToggle}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'grid' ? styles.viewBtnActive : {}),
              }}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'list' ? styles.viewBtnActive : {}),
              }}
            >
              ☰ List
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p style={styles.resultsCount}>
        Showing {filtered.length} of {doctors.length} doctors
      </p>

      {/* Doctor cards */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p>No doctors found matching your search.</p>
        </div>
      ) : (
        <div style={viewMode === 'grid' ? styles.grid : styles.list}>
          {filtered.map((doc) => (
            <div
              key={doc.id}
              style={viewMode === 'grid' ? styles.card : styles.listCard}
              onClick={() => navigate(`/doctors/${doc._id}`)}
            >
              <img
                src={doc.image}
                alt={doc.name}
                style={viewMode === 'grid' ? styles.cardImage : styles.listImage}
              />
              <div style={styles.cardBody}>
                <div style={styles.cardTop}>
                  <h3 style={styles.cardName}>{doc.name}</h3>
                  <span
                    style={{
                      ...styles.availBadge,
                      backgroundColor: doc.available ? '#D1FAE5' : '#FEE2E2',
                      color: doc.available ? '#065F46' : '#991B1B',
                    }}
                  >
                    {doc.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <p style={styles.specialty}>{doc.specialty}</p>
                <p style={styles.experience}>{doc.experience} years experience</p>
                <div style={styles.cardFooter}>
                  <span style={styles.rating}>⭐ {doc.rating} ({doc.reviews} reviews)</span>
                  <span style={styles.fee}>EGP {doc.fee}</span>
                </div>
                <button
                  style={styles.profileBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/doctors/${doc._id}`);
                  }}
                >
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748B',
  },
  searchRow: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '14px 20px',
    fontSize: '16px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  filtersRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  chip: {
    padding: '7px 16px',
    borderRadius: '20px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#ffffff',
    color: '#64748B',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  chipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
    color: '#ffffff',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  toggleLabel: {
    fontSize: '14px',
    color: '#64748B',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    color: '#1E293B',
    cursor: 'pointer',
  },
  viewToggle: {
    display: 'flex',
    border: '1.5px solid #E2E8F0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  viewBtn: {
    padding: '7px 14px',
    border: 'none',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#64748B',
  },
  viewBtnActive: {
    backgroundColor: '#2563EB',
    color: '#ffffff',
  },
  resultsCount: {
    fontSize: '14px',
    color: '#94A3B8',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  listImage: {
    width: '140px',
    height: '140px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '16px',
    flex: 1,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px',
  },
  cardName: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1E293B',
  },
  availBadge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '20px',
    whiteSpace: 'nowrap',
  },
  specialty: {
    fontSize: '14px',
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: '4px',
  },
  experience: {
    fontSize: '13px',
    color: '#94A3B8',
    marginBottom: '12px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  rating: {
    fontSize: '13px',
    color: '#64748B',
  },
  fee: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1E293B',
  },
  profileBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#94A3B8',
    fontSize: '16px',
  },
};

export default DoctorsList;