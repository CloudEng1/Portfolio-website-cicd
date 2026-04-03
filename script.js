/* =============================================
   PORTFOLIO WEBSITE — script.js
   Features:
   - Sticky navbar with scroll detection
   - Hamburger menu toggle
   - Active nav link on scroll
   - Typed text animation (hero section)
   - Fade-in on scroll (IntersectionObserver)
   - Skill bar animation on scroll
   - Contact form handling (demo)
   - Scroll-to-top button
   - Smooth scroll for all anchor links
============================================= */

/* ── DOM READY ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     1. NAVBAR — Scroll detection
  ============================================= */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* =============================================
     2. HAMBURGER MENU — Mobile toggle
  ============================================= */
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* =============================================
     3. ACTIVE NAV LINK — Highlight on scroll
  ============================================= */
  const sections = document.querySelectorAll('section[id]');

  const setActiveLink = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinkItems.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // run on load


  /* =============================================
     4. TYPED TEXT ANIMATION — Hero role
     ✏️ Edit the `words` array to change roles
  ============================================= */
  const typedEl = document.getElementById('typed');

  // ✏️ Add or change roles here
  const words    = ['AWS Engineer', 'Cloud Architect', 'DevOps', 'Git'];
  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let typingDelay = 110;

  function type() {
    const current = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      // Pause at end of word
      isDeleting = true;
      setTimeout(type, 1600);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 60 : typingDelay);
  }

  if (typedEl) setTimeout(type, 600);


  /* =============================================
     5. FADE-IN ON SCROLL — IntersectionObserver
  ============================================= */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* =============================================
     6. SKILL BAR ANIMATION
     Bars animate to their target width when the
     About section scrolls into view.
  ============================================= */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => {
          // The width is already set inline on the element
          const target = fill.style.width;
          fill.style.width = '0';
          // Slight delay so the animation is visible
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              fill.style.width = target;
            });
          });
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) skillObserver.observe(aboutSection);


  /* =============================================
     7. CONTACT FORM — Demo handler
     ✏️ Replace this with EmailJS, Formspree, or
        your own backend endpoint.
  ============================================= */
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // ── Simulate sending (replace with real API call) ──
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        showStatus('✅ Message sent! I\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa fa-paper-plane"></i>';
      }, 1500);

      /* ── EmailJS example (uncomment + configure) ──
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name:    name,
        from_email:   email,
        message:      message,
      }).then(() => {
        showStatus('✅ Message sent!', 'success');
        form.reset();
      }).catch(() => {
        showStatus('❌ Something went wrong. Please try again.', 'error');
      }).finally(() => {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = 'Send Message <i class="fa fa-paper-plane"></i>';
      });
      */
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.style.color = type === 'error' ? '#ff6b6b' : 'var(--accent)';
    setTimeout(() => { formStatus.textContent = ''; }, 5000);
  }


  /* =============================================
     8. SCROLL-TO-TOP BUTTON
  ============================================= */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* =============================================
     9. SMOOTH SCROLL — for all anchor links
     (supplements CSS scroll-behavior for
      better cross-browser support)
  ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar').offsetHeight;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

}); // end DOMContentLoaded
