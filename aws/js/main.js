/* ============================================================
   main.js — navbar, typewriter, scroll reveal, stat counters
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Navbar: scrolled state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu');
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  });

  menu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Active link on scroll (scroll-spy) ---------- */
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav__link')];

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((l) =>
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + id)
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Typewriter effect ---------- */
  const twEl = document.getElementById('typewriter');
  if (twEl) {
    const words = [
      'Full Stack AI Engineer',
      'Frontend Developer',
      'Backend Engineer',
      'Cloud & AI Builder',
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = words[wordIndex];
      twEl.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 85);
      } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 45);
      } else {
        if (!deleting) {
          deleting = true;
          setTimeout(type, 1600);
        } else {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 350);
        }
      }
    };
    type();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-card__num');
  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => countObs.observe(c));

  /* ---------- Skill progress bars ---------- */
  const skillFills = document.querySelectorAll('.skill__fill');
  const skillObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const level = Math.max(0, Math.min(100, parseInt(el.dataset.level, 10) || 0));
        el.style.width = level + '%';
        obs.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  skillFills.forEach((f) => skillObs.observe(f));

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const toggleBtt = () => backToTop.classList.toggle('is-visible', window.scrollY > 500);
    window.addEventListener('scroll', toggleBtt, { passive: true });
    toggleBtt();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const statusEl = document.getElementById('form-status');

    const validators = {
      name: (v) => v.trim().length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: (v) => v.trim().length >= 10,
    };

    const setFieldState = (input, valid) => {
      input.closest('.field').classList.toggle('is-invalid', !valid);
    };

    const validateField = (input) => {
      const fn = validators[input.name];
      if (!fn) return true;
      const valid = fn(input.value);
      setFieldState(input, valid);
      return valid;
    };

    // live validation after first blur
    form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    const showStatus = (type, msg) => {
      statusEl.textContent = msg;
      statusEl.className = 'form-status is-visible form-status--' + type;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = [...form.querySelectorAll('input, textarea')];
      const allValid = inputs.map((i) => validateField(i)).every(Boolean);

      if (!allValid) {
        showStatus('error', 'Mohon periksa kembali isian form Anda.');
        const firstInvalid = form.querySelector('.field.is-invalid input, .field.is-invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulated successful submission (no backend)
      showStatus('success', 'Terima kasih! Pesan Anda telah terkirim. Saya akan segera membalas.');
      form.reset();
      inputs.forEach((i) => i.closest('.field').classList.remove('is-invalid'));
    });
  }
})();
