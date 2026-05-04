// ===== MAIN.JS – Shared across all pages =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== MUSIC PLAYER (Local file: backsound.mp3) =====
  const musicToggle = document.getElementById('musicToggle');
  const musicWave   = document.querySelector('.music-wave');

  // Create HTML5 Audio element pointing to local file
  const audio = new Audio('backsound.mp3');
  audio.loop   = true;
  audio.volume = 0.55;

  let isPlaying = false;

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        audio.play().catch(() => {
          isPlaying = false;
          musicToggle.innerHTML = '<i class="fas fa-music"></i>';
          musicToggle.classList.remove('playing');
          if (musicWave) musicWave.classList.remove('active');
        });
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.classList.add('playing');
        if (musicWave) musicWave.classList.add('active');
      } else {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.classList.remove('playing');
        if (musicWave) musicWave.classList.remove('active');
      }
    });
  }

  // ===== PARTICLES (Landing page only) =====
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    createParticles(particlesContainer);
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar:not(.navbar-edu)');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('.smooth-scroll').forEach(el => {
    el.addEventListener('click', e => {
      const target = el.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll(
    '.section-header, .about-card, .feature-card, .video-card, ' +
    '.team-card, .edu-card, .impact-card, .step-card, .sig-card, .fact-item'
  );

  if (revealEls.length > 0) {
    revealEls.forEach(el => el.classList.add('fade-in-up'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ===== COUNTER ANIMATION (Stats bar) =====
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length > 0) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.textContent);
          if (!isNaN(target)) animateCount(el, 0, target, 1200);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statsObserver.observe(el));
  }

});

// ===== PARTICLES =====
function createParticles(container) {
  const symbols = ['🌿', '🍃', '♻️', '🌱', '💚', '🌍'];
  const count   = 18;

  for (let i = 0; i < count; i++) {
    const p    = document.createElement('div');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size  = Math.random() * 20 + 12;
    const left  = Math.random() * 100;
    const delay = Math.random() * 12;
    const dur   = Math.random() * 10 + 12;

    Object.assign(p.style, {
      position:      'absolute',
      left:          left + 'vw',
      bottom:        '-80px',
      fontSize:      size + 'px',
      opacity:       String(Math.random() * 0.25 + 0.05),
      animation:     `particleFloat ${dur}s ${delay}s linear infinite`,
      pointerEvents: 'none',
      userSelect:    'none',
    });
    container.appendChild(p);
  }

  if (!document.getElementById('particle-anim-style')) {
    const style  = document.createElement('style');
    style.id     = 'particle-anim-style';
    style.textContent = `
      @keyframes particleFloat {
        0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
        10%  { opacity: 0.15; }
        90%  { opacity: 0.1; }
        100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== COUNT ANIMATION =====
function animateCount(el, start, end, duration) {
  const startTime = performance.now();
  const suffix    = el.textContent.replace(/[0-9]/g, '');
  function update(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
