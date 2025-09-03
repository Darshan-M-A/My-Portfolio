document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');
  const cursorGlow = document.getElementById('cursor-glow');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    if (cursor && cursorGlow) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorGlow.style.left = cursorX + 'px';
      cursorGlow.style.top = cursorY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor hover effects
  document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card, .contact-item, .social-link')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursor && cursorGlow) {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursor && cursorGlow) {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
    });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.9)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  });

  // Active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === ('#' + current)) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Form submission animation
  document.querySelector('.contact-form form').addEventListener('submit', function(e){
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.style.transform = 'scale(0.95)';

    setTimeout(()=>{
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';

      setTimeout(()=>{
        submitBtn.innerHTML = originalText;
        submitBtn.style.transform = 'scale(1)';
        submitBtn.style.background = 'linear-gradient(45deg, #ff6b9d, #c44569)';
        this.reset();
      }, 2000);
    }, 1500);
  });

  // Button ripple effect
  document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  document.querySelectorAll('[class*="animate"]').forEach(el => observer.observe(el));
});

