/**
 * Runic Grapes - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Mobile Navigation Toggle
  // ==========================================================================
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active');
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
      });
    });
  }

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ==========================================================================
  // Scroll-triggered Animations
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================================================
  // Featured Carousel
  // ==========================================================================
  const carousel = document.getElementById('featuredCarousel');

  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel__slide');
    const dots = carousel.querySelectorAll('.carousel__dot');
    let currentSlide = 0;
    let autoPlayInterval;
    const SLIDE_DURATION = 10000; // 10 seconds

    const showSlide = (index) => {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('carousel__slide--active');
      });

      // Deactivate all dots
      dots.forEach(dot => {
        dot.classList.remove('carousel__dot--active');
      });

      // Show current slide and activate dot
      slides[index].classList.add('carousel__slide--active');
      dots[index].classList.add('carousel__dot--active');

      // Trigger animation for elements inside
      const animatedEl = slides[index].querySelector('.animate-on-scroll');
      if (animatedEl) {
        animatedEl.classList.add('is-visible');
      }

      currentSlide = index;
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    };

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, SLIDE_DURATION);
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
      });
    });

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      startAutoPlay();
    });
  }
});
