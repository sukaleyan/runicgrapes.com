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
  // Product Gallery (supports multiple galleries)
  // ==========================================================================
  const allGalleryThumbs = document.querySelectorAll('.gallery__thumb');

  allGalleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.dataset.src;

      // Find the parent gallery container and its main image
      const gallery = thumb.closest('.shop-featured__gallery');
      if (!gallery) return;

      const mainImg = gallery.querySelector('.gallery__main img');
      if (!mainImg) return;

      // Update main image with fade
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.style.opacity = '1';
      }, 150);

      // Update active state only within this gallery
      const siblingThumbs = gallery.querySelectorAll('.gallery__thumb');
      siblingThumbs.forEach(t => t.classList.remove('gallery__thumb--active'));
      thumb.classList.add('gallery__thumb--active');
    });
  });

  // ==========================================================================
  // Product Detail Toggle
  // ==========================================================================
  const productCards = document.querySelectorAll('.product-card__link');
  const productDetails = document.querySelectorAll('.product-detail');
  const closeButtons = document.querySelectorAll('.product-detail__close');

  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = card.getAttribute('href');
      const targetDetail = document.querySelector(targetId);

      if (targetDetail) {
        targetDetail.classList.add('product-detail--open');
        setTimeout(() => {
          targetDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const detail = btn.closest('.product-detail');
      if (detail) {
        detail.classList.remove('product-detail--open');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
});
