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
    let autoPlayInterval = null;
    let isPaused = false;
    const SLIDE_DURATION = 5000; // 5 seconds

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('carousel__slide--active'));
      dots.forEach(dot => dot.classList.remove('carousel__dot--active'));

      slides[index].classList.add('carousel__slide--active');
      dots[index].classList.add('carousel__dot--active');

      const animatedEl = slides[index].querySelector('.animate-on-scroll');
      if (animatedEl) animatedEl.classList.add('is-visible');

      currentSlide = index;
    };

    const nextSlide = () => {
      if (!isPaused) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
    };

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });

    // Start auto-play with setInterval
    autoPlayInterval = setInterval(nextSlide, SLIDE_DURATION);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
    });
  }

  // ==========================================================================
  // Product Gallery
  // ==========================================================================
  const galleryMain = document.getElementById('galleryMain');
  const galleryThumbs = document.querySelectorAll('.gallery__thumb');

  if (galleryMain && galleryThumbs.length > 0) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.src;

        // Update main image
        galleryMain.style.opacity = '0';
        setTimeout(() => {
          galleryMain.src = newSrc;
          galleryMain.style.opacity = '1';
        }, 150);

        // Update active state
        galleryThumbs.forEach(t => t.classList.remove('gallery__thumb--active'));
        thumb.classList.add('gallery__thumb--active');
      });
    });
  }
});
