import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPost, fetchBlogCategories } from '../api/blog';
import { Calendar, User, ArrowLeft, Clock, Share2, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import '../styles/ArchitectHero.css';
import '../styles/BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef(null);
  const articleRef = useRef(null);
  const animatedPostIdRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPost();

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  // Hero Entrance & Content Animation
  // Premium Entrance Animation
  useGSAP(() => {
    if (loading || !post || !heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

    // 1. Initial State
    gsap.set('.brand-hero-title', { y: 60, opacity: 0 });
    gsap.set('.back-link-brand', { x: -30, opacity: 0 });
    gsap.set('.brand-meta-item', { y: 20, opacity: 0 });
    gsap.set('.blog-post-content p, .blog-post-content h2, .blog-post-content img', { y: 40, opacity: 0 });

    // 2. Reveal Sequence
    tl.to('.brand-hero-title', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'expo.out'
    })
      .to('.back-link-brand', {
        x: 0,
        opacity: 1,
        duration: 1
      }, 0.6)
      .to('.brand-meta-item', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8
      }, 0.8);

    // 3. Scroll Reveals for Body Content
    const contentItems = gsap.utils.toArray('.blog-post-content p, .blog-post-content h2, .blog-post-content img, .blog-post-content blockquote');
    contentItems.forEach((item) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

  }, { scope: heroRef, dependencies: [loading, post] });

  const loadPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postData, categoriesData] = await Promise.all([
        fetchBlogPost(id),
        fetchBlogCategories()
      ]);
      setPost(postData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  };

  const getAuthorName = (post) => {
    return post._embedded?.author?.[0]?.name || 'NewLife Project';
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-loading">
          <div className="loading-spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-error">
          <p>{error || 'Post not found'}</p>
          <Link to="/blog" state={{ fromPost: true }} className="back-to-blog">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post);

  return (
    <div className="blog-post-page brand-sync-theme" ref={heroRef}>

      {/* 1. Brand Architectural Hero */}
      <header className="brand-post-hero">
        <div className="brand-hero-content">
          <Link to="/blog" state={{ fromPost: true }} className="back-link-brand">
            <ArrowLeft size={16} /> BACK TO INSIGHTS
          </Link>

          <div className="brand-title-wrap">
            <span className="brand-pre-title">OUR STORIES</span>
            <h1 className="brand-hero-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>

          <div className="brand-hero-footer">
            <div className="brand-meta-item">
              <Calendar size={18} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="brand-meta-item">
              <User size={18} />
              <span>{getAuthorName(post)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-post-container brand-container">
        <article className="brand-article-wrapper">
          <aside className="article-aside">
            <div className="sticky-actions">
              <div className="action-circle"><Share2 size={18} /></div>
              <div className="action-circle"><BookOpen size={18} /></div>
              <div className="action-circle"><Clock size={18} /></div>
            </div>
          </aside>

          <div className="article-main-content">
            {featuredImage && (
              <div className="brand-visual-frame">
                <img src={featuredImage} alt={post.title.rendered} className="brand-main-img" />
                <div className="brand-frame-accent"></div>
              </div>
            )}

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            <footer className="post-footer">
              <hr className="footer-line" />
              <div className="footer-actions">
                <h3 className="footer-end-text">End of Story</h3>
                <Link to="/blog" state={{ fromPost: true }} className="btn-architect-outline">
                  Return to Blog <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
