// ============================================
// TAXI ZAGREB — Main JavaScript
// ============================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // --- Hero scroll effects ---
  if (hero) {
    const heroContent = hero.querySelector('.hero-content');

    // Fade out hero content on scroll
    if (heroContent) {
      const opacity = Math.max(0, 1 - scrollY / (hero.offsetHeight * 0.5));
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// --- Transparent navbar over hero or page-header ---
const darkSection = hero || document.querySelector('.page-header');
if (darkSection) {
  navbar.classList.add('navbar-hero');
  const darkObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        navbar.classList.add('navbar-hero');
      } else {
        navbar.classList.remove('navbar-hero');
      }
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );
  darkObserver.observe(darkSection);
}

// --- Mobile menu ---
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
  navToggle.classList.add('open');
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  navToggle.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// --- Fade-in on scroll (Intersection Observer) ---
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeElements.forEach((el) => observer.observe(el));
}

// --- Stagger animation for grid children ---
document.querySelectorAll('.features-grid, .services-grid, .pricing-cards').forEach(grid => {
  const cards = grid.querySelectorAll('.fade-in');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

// --- Reservation form: set minimum date to today ---
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
