// ═══════════════════════════════════
// FULLSCREEN HERO SLIDESHOW
// ═══════════════════════════════════
const heroSlides   = document.querySelectorAll('.hero-slide');
const frameDots    = document.querySelectorAll('.fdot');
const frameLabel   = document.getElementById('frameLabel');
const progressBar  = document.getElementById('frameProgress');

const slideLabels = ['🌍 Global Logistics', '🏭 Warehousing', '✈ Air Freight', '📦 Cargo Handling', '🚢 Sea Freight', '🔗 Supply Chain'];
const SLIDE_DURATION = 5000;

let curSlide = 0;
let progressStart = null;
let progressRaf = null;
let slideTimer = null;

function goToSlide(n) {
  heroSlides[curSlide].classList.remove('active');
  frameDots[curSlide].classList.remove('active');
  curSlide = n;
  heroSlides[curSlide].classList.add('active');
  frameDots[curSlide].classList.add('active');
  if (frameLabel) frameLabel.textContent = slideLabels[curSlide];
  startProgress();
}

function startProgress() {
  if (progressRaf) cancelAnimationFrame(progressRaf);
  if (progressBar) progressBar.style.width = '0%';
  progressStart = performance.now();
  function tick(now) {
    const elapsed = now - progressStart;
    const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (pct < 100) progressRaf = requestAnimationFrame(tick);
  }
  progressRaf = requestAnimationFrame(tick);
}

function nextSlide() {
  goToSlide((curSlide + 1) % heroSlides.length);
}

function startTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, SLIDE_DURATION);
}

frameDots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goToSlide(parseInt(dot.dataset.fs));
    startTimer();
  });
});

// Init
goToSlide(0);
startTimer();

// ═══════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ═══════════════════════════════════
// NAV + BACK TO TOP ON SCROLL
// ═══════════════════════════════════
const nav = document.getElementById('nav');
const backTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});
if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ═══════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ═══════════════════════════════════
// FORM SUBMIT
// ═══════════════════════════════════
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}
