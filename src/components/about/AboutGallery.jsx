import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/AboutGallery.css';

gsap.registerPlugin(ScrollTrigger);

const AboutGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [decodedImages, setDecodedImages] = useState({});
  const galleryRef = useRef(null);

  const images = [
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/PXL_20260304_175021346.MP.jpg?v=1772708442", caption: "Community Convergence", size: "v-large", depth: 0.1 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/sewing_class_pic2.jpg?v=1768777136", caption: "The Craft of Resilience", size: "v-small", depth: 0.2 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_8020.jpg?v=1769304338", caption: "Empowered Voices", size: "v-medium", depth: 0.05 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7943.jpg?v=1767798002", caption: "Visionary Workshops", size: "v-small", depth: 0.15 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/sewing_class_pic.jpg?v=1768777148", caption: "Skillful Horizons", size: "v-medium", depth: 0.08 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/french_class_pic.jpg?v=1768777914", caption: "Language of Hope", size: "v-small", depth: 0.25 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7659.jpg?v=1763398402", caption: "Architects of Change", size: "v-large", depth: 0.12 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7655.jpg?v=1763399192", caption: "Shared Ambitions", size: "v-small", depth: 0.18 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7504.jpg?v=1762228985", caption: "Strength in Unity", size: "v-medium", depth: 0.06 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7236.jpg?v=1759327484", caption: "Cycles of Growth", size: "v-small", depth: 0.22 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7514.jpg?v=1762228977", caption: "Mentorship Threads", size: "v-medium", depth: 0.1 },
    { url: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/sewing_class.jpg?v=1755708914", caption: "Generational Promise", size: "v-small", depth: 0.15 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const items = gsap.utils.toArray('.v2-gallery-item');
      
      if (isMobile) {
        const grid = document.querySelector('.v2-gallery-asymmetric-grid');
        const totalWidth = grid.scrollWidth - grid.offsetWidth;
        
        gsap.to(grid, {
          scrollLeft: totalWidth,
          duration: 30, // Slow, cinematic scroll
          ease: 'none',
          repeat: -1,
          yoyo: true, // Go back and forth for an infinite feel without cloning
        });
      }

      items.forEach((item, i) => {
        const img = item.querySelector('img');
        const depth = images[i].depth || 0.1;
        const isMobileItem = window.innerWidth <= 768;

        // Optimization: Wait for image to decode before triggering reveal
        const startReveal = () => {
          if (isMobileItem) {
            gsap.set(item, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 });
            return;
          }

          gsap.to(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power4.inOut',
            delay: (i % 3) * 0.1,
            onStart: () => setDecodedImages(prev => ({ ...prev, [i]: true }))
          });
        };

        // Async decoding to prevent main thread lag
        if (img.decode) {
          img.decode()
            .then(startReveal)
            .catch(() => startReveal()); // fallback if decode fails
        } else {
          img.onload = startReveal;
        }

        // Floating Parallax
        gsap.to(img, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: (depth * 150),
          ease: 'none'
        });
      });

      // Magnetic Title Reveal
      gsap.from('.v2-gallery-header > *', {
        scrollTrigger: {
          trigger: '.v2-gallery-header',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out'
      });

    }, galleryRef);

    return () => ctx.revert();
  }, []);

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

        <div className="v2-gallery-asymmetric-grid">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`v2-gallery-item ${img.size} ${decodedImages[index] ? 'is-decoded' : ''}`}
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
                  <div className="v2-card-accent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
