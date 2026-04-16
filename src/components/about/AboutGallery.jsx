import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/AboutGallery.css';

gsap.registerPlugin(ScrollTrigger);

const AboutGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef(null);

  const images = [
    { url: "/PXL_20260304_175021346.MP.webp", caption: "Community Convergence" },
    { url: "/sewing_class_pic2.webp", caption: "The Craft of Resilience" },
    { url: "/IMG_8020.webp", caption: "Empowered Voices" },
    { url: "/IMG_7943.webp", caption: "Visionary Workshops" },
    { url: "/skillful_horizen.png", caption: "Skillful Horizons" },
    { url: "/french_class_pic.webp", caption: "Language of Hope" },
    { url: "/IMG_7659.webp", caption: "Architects of Change" },
    { url: "/IMG_7655.webp", caption: "Shared Ambitions" },
    { url: "/IMG_7504.webp", caption: "Strength in Unity" },
    { url: "/IMG_7236.webp", caption: "Cycles of Growth" },
    { url: "/IMG_7514.webp", caption: "Mentorship Threads" },
    { url: "/sewing_class.webp", caption: "Generational Promise" }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLightboxOpen = (url) => {
    setSelectedImg(url);
    document.body.style.overflow = 'hidden';
  };

  const handleLightboxClose = () => {
    setSelectedImg(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="v2-about-gallery" ref={galleryRef}>
      <div className="v2-container">
        
        <header className="v2-gallery-header">
          <span className="v2-editorial-label">Cinematic Archive</span>
          <h2 className="v2-premium-title">Moments of <em>Triumph</em>.</h2>
          <p className="v2-premium-intro">
            A curated visual narrative of resilience, community, and the persistent pursuit of dignity. 
            Each frame tells a story of a life redefined.
          </p>
        </header>

        {!isMobile ? (
          /* Desktop Carousel */
          <div className="v2-carousel-wrapper">
            <div className="v2-carousel-container">
              <div className="v2-carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {images.map((img, index) => (
                  <div key={index} className="v2-carousel-slide">
                    <div className="v2-carousel-image" onClick={() => handleLightboxOpen(img.url)}>
                      <img src={img.url} alt={img.caption} loading="lazy" />
                      <div className="v2-carousel-caption">
                        <h4>{img.caption}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="v2-carousel-btn v2-carousel-prev" onClick={prevSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="v2-carousel-btn v2-carousel-next" onClick={nextSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            <div className="v2-carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`v2-carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Mobile Grid - Keep existing design */
          <div className="v2-gallery-scroll-wrapper is-mobile-scroll">
            <div className="v2-gallery-asymmetric-grid">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className="v2-gallery-item"
                  onClick={() => handleLightboxOpen(img.url)}
                >
                  <div className="v2-item-inner">
                    <div className="v2-img-container">
                      <img src={img.url} alt={img.caption} loading="lazy" />
                    </div>
                    <div className="v2-item-card-info">
                      <div className="v2-info-mask">
                        <span className="v2-item-number">{(index + 1).toString().padStart(2, '0')}</span>
                        <h4 className="v2-item-caption">{img.caption}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedImg && (
        <div className="v2-gallery-lightbox" onClick={handleLightboxClose}>
          <div className="v2-lightbox-backdrop"></div>
          <div className="v2-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImg} alt="Enlarged curated view" />
            <button className="v2-close-lightbox" onClick={handleLightboxClose}>
              <span className="v2-close-text">Close</span>
              <span className="v2-close-icon">✕</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutGallery;
