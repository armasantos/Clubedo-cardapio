/* ============================================
   CLUBE DO CARDÁPIO — MAIN JS
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile menu ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let overlay = null;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'navbar__overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMenu);
  }

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-open');
    if (!overlay) createOverlay();
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      navToggle.focus();
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Update URL without scroll
        history.pushState(null, '', targetId);
      }
    });
  });

  // --- Scroll animations (Intersection Observer) ---
  if ('IntersectionObserver' in window) {
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Add stagger delay for siblings
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll('[data-animate]');
          const index = Array.prototype.indexOf.call(siblings, entry.target);

          entry.target.style.transitionDelay = (index * 0.1) + 's';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.navbar__link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksList.forEach(function (link) {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // Redirect product CTAs to audience section until sale pages are fully set
  // (real purchases happen via Eduzz)
  document.querySelectorAll('[data-product]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // Scroll to audience section for now — actual links will be set when pages are ready
      var target = document.getElementById('cardapios');
      if (target) {
        var navHeight = navbar.offsetHeight;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navHeight - 16,
          behavior: 'smooth'
        });
      }
    });
  });

})();
