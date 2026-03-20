// Design2 Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  
  // Navbar scroll effect
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Donation form interactivity
  const giftButtons = document.querySelectorAll('.ga-btn');
  const giftInput = document.getElementById('giftInput');
  const giftSubmit = document.getElementById('giftSubmit');

  giftButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      giftButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      // Clear custom input
      if (giftInput) giftInput.value = '';
      // Update submit button
      const amount = btn.textContent.replace('$', '');
      if (giftSubmit) giftSubmit.textContent = `Donate $${amount} Securely →`;
    });
  });

  if (giftInput) {
    giftInput.addEventListener('input', (e) => {
      // Remove active class from all preset buttons
      giftButtons.forEach(b => b.classList.remove('active'));
      // Update submit button
      const amount = e.target.value || '50';
      if (giftSubmit) giftSubmit.textContent = `Donate $${amount} Securely →`;
    });
  }

  // Gift type toggle
  const giftToggleBtns = document.querySelectorAll('.gt-btn');
  giftToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      giftToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  console.log('NewLife Project - Design2 loaded successfully!');
});