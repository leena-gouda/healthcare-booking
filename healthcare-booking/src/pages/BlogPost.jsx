import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPost(data);
        fetch(`http://localhost:5000/api/blog`)
          .then((res) => res.json())
          .then((all) => {
            const related = all
              .filter((p) => p._id !== id && p.category === data.category)
              .slice(0, 3);
            setRelatedPosts(related);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading || !post) {
  return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748B' }}>
      Loading article...
    </div>
  );
}

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Article not found</h2>
        <button onClick={() => navigate('/blog')} style={styles.backBtn}>
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* Back button */}
      <button onClick={() => navigate('/blog')} style={styles.backBtn}>
        ← Back to Blog
      </button>

      {/* Hero image */}
      <div style={styles.heroWrapper}>
        <img src={post.image} alt={post.title} style={styles.heroImage} />
        <div style={styles.heroOverlay}>
          <span style={styles.categoryBadge}>{post.category}</span>
        </div>
      </div>

      <div style={styles.twoCol}>

        {/* Main content */}
        <div style={styles.mainCol}>

          {/* Article header */}
          <div style={styles.articleHeader}>
            <h1 style={styles.title}>{post.title}</h1>
            <div style={styles.metaRow}>
              <div style={styles.authorRow}>
                <div style={styles.authorAvatar}>
                  {post.author?.split(' ').pop().charAt(0)}
                </div>
                <div>
                  <p style={styles.authorName}>{post.author}</p>
                  <p style={styles.postDate}>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <span style={styles.readTime}>⏱ {post.readTime} min read</span>
            </div>
          </div>

          {/* Excerpt */}
          <div style={styles.excerpt}>
            <p style={styles.excerptText}>{post.excerpt}</p>
          </div>

          {/* Full content */}
          <div style={styles.content}>
            {(post.content || '').split('. ').map((sentence, index) => (
              sentence.trim() && (
                <p key={index} style={styles.paragraph}>
                  {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                </p>
              )
            ))}
          </div>

          {/* Share row */}
          <div style={styles.shareRow}>
            <span style={styles.shareLabel}>Share this article:</span>
            <button
              style={styles.shareBtn}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
            >
              🔗 Copy Link
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>

          {/* About the author */}
          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>About the author</h3>
            <div style={styles.sideAuthorRow}>
              <div style={styles.sideAvatar}>
                {post.author?.split(' ').pop().charAt(0)}
              </div>
              <div>
                <p style={styles.sideAuthorName}>{post.author}</p>
                <p style={styles.sideAuthorSpec}>{post.category} specialist</p>
              </div>
            </div>
            <p style={styles.sideAuthorBio}>
                A specialist in {post.category?.toLowerCase()} with years of clinical experience            </p>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div style={styles.sideCard}>
              <h3 style={styles.sideTitle}>Related articles</h3>
              {relatedPosts.map((related) => (
                <div
                  key={related._id}
                  style={styles.relatedCard}
                  onClick={() => navigate(`/blog/${related._id}`)}
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    style={styles.relatedImage}
                  />
                  <div style={styles.relatedInfo}>
                    <p style={styles.relatedTitle}>{related.title}</p>
                    <p style={styles.relatedMeta}>⏱ {related.readTime} min read</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to blog */}
          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>Explore more</h3>
            <p style={styles.sideText}>
              Discover more health tips and expert advice from our doctors.
            </p>
            <button
              style={styles.explorBtn}
              onClick={() => navigate('/blog')}
            >
              View all articles →
            </button>
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
  heroWrapper: {
    position: 'relative',
    marginBottom: '40px',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
  },
  categoryBadge: {
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '20px',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
    alignItems: 'start',
  },
  mainCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  articleHeader: {
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: '1.3',
    marginBottom: '20px',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  authorAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px',
    flexShrink: 0,
  },
  authorName: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#1E293B',
    margin: 0,
  },
  postDate: {
    fontSize: '13px',
    color: '#94A3B8',
    margin: 0,
  },
  readTime: {
    fontSize: '14px',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  excerpt: {
    backgroundColor: '#EFF6FF',
    borderLeft: '4px solid #2563EB',
    borderRadius: '0 12px 12px 0',
    padding: '20px 24px',
  },
  excerptText: {
    fontSize: '16px',
    color: '#1E40AF',
    lineHeight: '1.7',
    margin: 0,
    fontStyle: 'italic',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  paragraph: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.8',
    margin: 0,
  },
  shareRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid #E2E8F0',
    paddingTop: '24px',
  },
  shareLabel: {
    fontSize: '14px',
    color: '#64748B',
    fontWeight: '500',
  },
  shareBtn: {
    padding: '8px 18px',
    backgroundColor: '#F1F5F9',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1E293B',
    cursor: 'pointer',
    fontWeight: '500',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sideCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '20px',
  },
  sideTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '16px',
  },
  sideAuthorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  sideAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px',
    flexShrink: 0,
  },
  sideAuthorName: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1E293B',
    margin: 0,
  },
  sideAuthorSpec: {
    fontSize: '12px',
    color: '#64748B',
    margin: 0,
  },
  sideAuthorBio: {
    fontSize: '13px',
    color: '#64748B',
    lineHeight: '1.6',
    margin: 0,
  },
  relatedCard: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #F1F5F9',
  },
  relatedImage: {
    width: '70px',
    height: '70px',
    borderRadius: '8px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  relatedInfo: {
    flex: 1,
  },
  relatedTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1E293B',
    margin: '0 0 4px 0',
    lineHeight: '1.4',
  },
  relatedMeta: {
    fontSize: '12px',
    color: '#94A3B8',
    margin: 0,
  },
  sideText: {
    fontSize: '13px',
    color: '#64748B',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  explorBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default BlogPost;