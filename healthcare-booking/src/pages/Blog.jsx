import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const categories = ['All', 'Cardiology', 'Mental Health', 'Dermatology', 'Nutrition', 'Pediatrics', 'Neurology'];

function Blog() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const [blogPosts, setBlogPosts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('http://localhost:5000/api/blog')
    .then((res) => res.json())
    .then((data) => {
      setBlogPosts(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}, []);


  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  if (loading) {
  return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748B' }}>
      Loading articles...
    </div>
  );
}

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Health & Wellness Blog</h1>
        <p style={styles.subtitle}>
          Expert advice from our doctors on living a healthier life
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search articles by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Category tabs */}
      <div style={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              ...styles.tab,
              ...(selectedCategory === cat ? styles.tabActive : {}),
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={styles.resultsCount}>
        {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Blog grid */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p>No articles found. Try a different search or category.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((post) => (
            <div
              key={post.id}
              style={styles.card}
              onClick={() => navigate(`/blog/${post._id}`)}
            >
              <img
                src={post.image}
                alt={post.title}
                style={styles.cardImage}
              />
              <div style={styles.cardBody}>

                {/* Category + read time */}
                <div style={styles.cardMeta}>
                  <span style={styles.categoryBadge}>{post.category}</span>
                  <span style={styles.readTime}>⏱ {post.readTime} min read</span>
                </div>

                <h3 style={styles.cardTitle}>{post.title}</h3>
                <p style={styles.cardExcerpt}>{post.excerpt}</p>

                <div style={styles.cardFooter}>
                  <div style={styles.authorRow}>
                    <div style={styles.authorAvatar}>
                      {post.author.split(' ').pop().charAt(0)}
                    </div>
                    <div>
                      <p style={styles.authorName}>{post.author}</p>
                      <p style={styles.postDate}>{post.date}</p>
                    </div>
                  </div>
                  <button style={styles.readBtn}>Read →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Newsletter signup */}
      <div style={styles.newsletter}>
        <h2 style={styles.newsletterTitle}>Stay up to date</h2>
        <p style={styles.newsletterSubtitle}>
          Get the latest health tips delivered straight to your inbox. No spam, ever.
        </p>
        {subscribed ? (
          <div style={styles.successMsg}>
            ✅ You're subscribed! Welcome to our health community.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.emailInput}
              required
            />
            <button type="submit" style={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        )}
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
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '17px',
    color: '#64748B',
    marginBottom: '28px',
  },
  searchInput: {
    width: '100%',
    maxWidth: '560px',
    padding: '14px 20px',
    fontSize: '15px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  tab: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#ffffff',
    color: '#64748B',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  tabActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
    color: '#ffffff',
  },
  resultsCount: {
    fontSize: '14px',
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '28px',
    marginBottom: '64px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  cardImage: {
    width: '100%',
    height: '210px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '20px',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  categoryBadge: {
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  readTime: {
    fontSize: '12px',
    color: '#94A3B8',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '10px',
    lineHeight: '1.4',
  },
  cardExcerpt: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: '1.6',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '14px',
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  authorAvatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
    flexShrink: 0,
  },
  authorName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1E293B',
    margin: 0,
  },
  postDate: {
    fontSize: '12px',
    color: '#94A3B8',
    margin: 0,
  },
  readBtn: {
    padding: '7px 16px',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#94A3B8',
    fontSize: '16px',
  },
  newsletter: {
    backgroundColor: '#2563EB',
    borderRadius: '20px',
    padding: '48px 40px',
    textAlign: 'center',
  },
  newsletterTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '10px',
  },
  newsletterSubtitle: {
    fontSize: '16px',
    color: '#BFDBFE',
    marginBottom: '28px',
  },
  newsletterForm: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  emailInput: {
    padding: '13px 20px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    width: '320px',
    backgroundColor: '#ffffff',
  },
  subscribeBtn: {
    padding: '13px 28px',
    backgroundColor: '#10B981',
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
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '500',
    display: 'inline-block',
  },
};

export default Blog;