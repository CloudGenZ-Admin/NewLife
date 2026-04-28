import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { fetchBlogPosts, fetchBlogCategories } from '../api/blog';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight, Globe, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ArchitectHero.css';
import '../styles/Blog.css';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize state from URL params
  const initialCategory = searchParams.get('category') || '';
  const initialPage = parseInt(searchParams.get('page')) || 1;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const isFirstLoad = useRef(true);
  const heroRef = useRef(null);
  const blogContentRef = useRef(null);
  const heroAnimatedRef = useRef(false);
  const cardsAnimatedRef = useRef(null);

  useEffect(() => {
    // Sync URL -> State on navigation
    const cat = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    if (cat !== selectedCategory) setSelectedCategory(cat);
    if (page !== currentPage) setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    // Sync State -> URL and load data
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (currentPage > 1) params.page = currentPage;
    
    // Only update if searchParams actually differ to avoid infinite loops
    const currentCat = searchParams.get('category') || '';
    const currentPageVal = parseInt(searchParams.get('page')) || 1;
    
    if (currentCat !== (selectedCategory || '') || currentPageVal !== currentPage) {
        setSearchParams(params, { replace: true });
    }
    
    loadBlogData();
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    const isReturning = location.state?.fromPost;
    
    // Scroll to grid when category or page changes, or on return from individual post
    if (!loading && (selectedCategory || currentPage > 1 || isReturning)) {
        // Use behavior: 'auto' for instant feel on first load/return
        blogContentRef.current?.scrollIntoView({ 
            behavior: isFirstLoad.current ? 'auto' : 'smooth', 
            block: 'start' 
        });
        isFirstLoad.current = false;
        
        // Clear state so it doesn't scroll again on re-renders
        if (isReturning) {
            window.history.replaceState({}, document.title);
        }
    }
  }, [selectedCategory, currentPage, loading, location.state]);

  // Hero Entrance Animation
  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

    // 1. Grid Construction
    tl.set('.architect-grid', { opacity: 1 })
      .fromTo('.grid-line.v', 
        { height: 0 },
        { height: '100%', stagger: 0.02, duration: 0.8, ease: 'power3.inOut' }
      )
      .fromTo('.grid-line.h', 
        { width: 0 },
        { width: '100%', stagger: 0.02, duration: 0.8, ease: 'power3.inOut' }, 
        0.2
      );

    // 2. Content Entry
    tl.from('.architect-detail, .architect-hero-title', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.2);

    tl.from('.architect-meta, .footer-info-item', {
      y: 30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');
  }, { scope: heroRef, dependencies: [] });

  // Blog Cards Entrance - Runs when data arrives or changes
  useGSAP(() => {
    const loadKey = `${selectedCategory}-${currentPage}`;
    if (loading || posts.length === 0 || cardsAnimatedRef.current === loadKey) return;

    // Reset properties to a known state before starting fresh animation
    gsap.set('.blog-card', { opacity: 0, y: 30 });

    gsap.to('.blog-card', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform',
      immediateRender: false
    });

    cardsAnimatedRef.current = loadKey;
  }, { dependencies: [loading, posts, selectedCategory, currentPage], scope: blogContentRef });

  const loadBlogData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, categoriesData] = await Promise.all([
        fetchBlogPosts({ page: currentPage, perPage: 9, categories: selectedCategory }),
        fetchBlogCategories()
      ]);
      setPosts(data.posts || []);
      setTotalPages(Math.max(1, parseInt(data.totalPages) || 1));
      setCategories(categoriesData.filter(cat => cat.count > 0));
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

  const getExcerpt = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    return text.substring(0, 150) + '...';
  };

  const getFeaturedImage = (post) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    
    // If there's a featured image, use it
    if (featuredImage) {
      return featuredImage;
    }
    
    // Otherwise, use a default blog placeholder image
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNTzHGlWJqlA-xTAXmameKY25C-acNzU0HZg&s';
  };

  const getAuthorName = (post) => {
    return post._embedded?.author?.[0]?.name || 'NewLife Project';
  };

  return (
    <div className="blog-page">
      {/* Architect Hero */}
      <header className="architect-hero blog-hero-theme" ref={heroRef}>
        <div className="architect-grid">
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line v" style={{ '--i': i }}></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line h" style={{ '--i': i }}></div>
          ))}
        </div>



        <div className="architect-wrapper">
          <div className="architect-title-group">
            <span className="architect-detail">INSIGHTS & UPDATES</span>
            <h1 className="architect-hero-title">Voices of <br /> <em>NewLife Project.</em></h1>
          </div>

          <div className="architect-meta">
            <p>Explore the latest stories, community updates, and leadership insights from the NewLife Project. We share our journey of empowerment, diversity, and social impact across Canada and beyond.</p>
          </div>
        </div>

        <div className="architect-footer-info">
          <div className="footer-info-item">
            <div className="info-dot"></div>
            <div>
              <h4>Community</h4>
              <p>Localized Impact Stories</p>
            </div>
          </div>
          <div className="footer-info-item">
            <div className="info-dot"></div>
            <div>
              <h4>Empowerment</h4>
              <p>Program Highlights</p>
            </div>
          </div>
          <div className="footer-info-item">
            <div className="info-dot"></div>
            <div>
              <h4>Events</h4>
              <p>Upcoming Engagements</p>
            </div>
          </div>
          <div className="footer-info-item">
            <div className="info-dot"></div>
            <div>
              <h4>Resources</h4>
              <p>Educational Content</p>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-container" ref={blogContentRef}>
        <aside className="blog-sidebar">
          <div className="sidebar-group">
            <h3>Refine by Topic</h3>
            <ul className="category-list">
              <li>
                <button
                  className={selectedCategory === '' ? 'active' : ''}
                  onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
                >
                  All Insights
                </button>
              </li>
              {categories.map(cat => {
                // Decode HTML entities in category name
                const div = document.createElement('div');
                div.innerHTML = cat.name;
                const decodedName = div.textContent || div.innerText || cat.name;
                
                return (
                  <li key={cat.id}>
                    <button
                      className={selectedCategory === String(cat.id) ? 'active' : ''}
                      onClick={() => { setSelectedCategory(String(cat.id)); setCurrentPage(1); }}
                    >
                      {decodedName}
                      <span className="cat-count">{cat.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="blog-main">
          {loading ? (
            <div className="blog-loading">
              <div className="loading-spinner"></div>
              <p>Retrieving stories...</p>
            </div>
          ) : error ? (
            <div className="blog-error">
              <Globe className="error-icon" size={48} />
              <p>{error}</p>
              <button onClick={() => loadBlogData()} className="retry-btn">Retry Loading</button>
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <div className="empty-icon-wrapper">
                <MessageSquare size={48} />
              </div>
              <p>No posts found in this category yet.</p>
              <button onClick={() => setSelectedCategory('')} className="btn-outline">View All Posts</button>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {posts.map(post => (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card-image">
                      <Link to={`/blog/${post.id}`}>
                        <img src={getFeaturedImage(post)} alt={post.title.rendered} />
                      </Link>
                      <div className="blog-date-badge">
                        <span className="day">{new Date(post.date).getDate()}</span>
                        <span className="month">{new Date(post.date).toLocaleString('default', { month: 'short' })}</span>
                      </div>
                    </div>
                    <div className="blog-card-content">
                      <Link to={`/blog/${post.id}`}>
                        <h2 className="blog-card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </Link>
                      <p className="blog-card-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered || getExcerpt(post.content.rendered) }} />
                      <Link to={`/blog/${post.id}`} className="read-more">
                        Explore Story <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="blog-pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="pagination-btn pagination-prev"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="pagination-numbers">
                    {(() => {
                      const pages = [];
                      const showEllipsis = totalPages > 7;
                      
                      if (!showEllipsis) {
                        // Show all pages if 7 or fewer
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i)}
                              className={`page-number ${currentPage === i ? 'active' : ''}`}
                            >
                              {i}
                            </button>
                          );
                        }
                      } else {
                        // Show smart pagination with ellipsis
                        pages.push(
                          <button
                            key={1}
                            onClick={() => setCurrentPage(1)}
                            className={`page-number ${currentPage === 1 ? 'active' : ''}`}
                          >
                            1
                          </button>
                        );

                        if (currentPage > 3) {
                          pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
                        }

                        const start = Math.max(2, currentPage - 1);
                        const end = Math.min(totalPages - 1, currentPage + 1);

                        for (let i = start; i <= end; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i)}
                              className={`page-number ${currentPage === i ? 'active' : ''}`}
                            >
                              {i}
                            </button>
                          );
                        }

                        if (currentPage < totalPages - 2) {
                          pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
                        }

                        pages.push(
                          <button
                            key={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                            className={`page-number ${currentPage === totalPages ? 'active' : ''}`}
                          >
                            {totalPages}
                          </button>
                        );
                      }
                      
                      return pages;
                    })()}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="pagination-btn pagination-next"
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
