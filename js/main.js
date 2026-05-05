/* ============================================================
   DR. SAROJDHARA HOSPITAL — main.js
   ============================================================ */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link, .nav-cta').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── HERO SLIDESHOW ──
const slides  = document.querySelectorAll('.hero-slideshow .slide');
const dots    = document.querySelectorAll('.slide-dots .dot');
let current   = 0, slideTimer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function startSlide() { slideTimer = setInterval(() => goToSlide(current + 1), 5000); }

dots.forEach(d => d.addEventListener('click', () => {
  clearInterval(slideTimer); goToSlide(+d.dataset.index); startSlide();
}));
document.getElementById('prevSlide').addEventListener('click', () => {
  clearInterval(slideTimer); goToSlide(current - 1); startSlide();
});
document.getElementById('nextSlide').addEventListener('click', () => {
  clearInterval(slideTimer); goToSlide(current + 1); startSlide();
});
startSlide();

// ── STATS COUNTER ──
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const isText  = el.dataset.text;
    if (isText) { el.textContent = isText; return; }
    if (!target) return;
    const isDecimal = target % 1 !== 0;
    const duration  = 1800;
    const steps     = 60;
    const increment = target / steps;
    let count = 0, step = 0;
    const timer = setInterval(() => {
      step++;
      count = Math.min(increment * step, target);
      el.textContent = isDecimal
        ? count.toFixed(1) + suffix
        : Math.floor(count).toLocaleString() + suffix;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  });
}
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
}, { threshold: 0.4 });
const statsRibbon = document.querySelector('.stats-ribbon');
if (statsRibbon) statsObserver.observe(statsRibbon);

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ? entry.target.dataset.delay * 80 : i * 80;
      setTimeout(() => entry.target.classList.add('reveal-in'), delay);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .why-card, .gallery-item, .testi-card, .blog-card'
).forEach(el => revealObserver.observe(el));

// ── TESTIMONIALS SCROLL ──
const track = document.getElementById('testimonialsTrack');
let testiPage = 0;
function updateTestiScroll() {
  const cards = track.querySelectorAll('.testi-card');
  const perPage = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const maxPage = Math.ceil(cards.length / perPage) - 1;
  testiPage = Math.max(0, Math.min(testiPage, maxPage));
  const cardW = cards[0] ? cards[0].offsetWidth + 24 : 0;
  track.style.transform = `translateX(-${testiPage * perPage * cardW}px)`;
}
document.getElementById('testiPrev').addEventListener('click', () => { testiPage--; updateTestiScroll(); });
document.getElementById('testiNext').addEventListener('click', () => { testiPage++; updateTestiScroll(); });

// ── APPOINTMENT → WHATSAPP ──
document.getElementById('bookWhatsappBtn').addEventListener('click', () => {
  const name     = document.getElementById('apptName').value.trim();
  const age      = document.getElementById('apptAge').value.trim();
  const gender   = document.getElementById('apptGender').value;
  const phone    = document.getElementById('apptPhone').value.trim();
  const dept     = document.getElementById('apptDept').value;
  const date     = document.getElementById('apptDate').value;
  const time     = document.getElementById('apptTime').value;
  const symptoms = document.getElementById('apptSymptoms').value.trim();

  if (!name || !phone || !dept) {
    alert('Please fill Name, Phone and Department before proceeding.');
    return;
  }

  const msg =
`🏥 *Appointment Request — Dr. Sarojdhara Hospital*

👤 *Patient Name:* ${name}
🎂 *Age:* ${age || 'Not provided'} | *Gender:* ${gender || 'Not provided'}
📞 *Phone:* ${phone}
🩺 *Concern / Department:* ${dept}
📅 *Preferred Date:* ${date || 'Flexible'}
⏰ *Preferred Time:* ${time || 'Any available slot'}
📝 *Symptoms / Description:* ${symptoms || 'Not provided'}

_Please confirm my appointment at the earliest. Thank you!_`;

  window.open(`https://wa.me/919829888702?text=${encodeURIComponent(msg)}`, '_blank');
});

// ── BACK TO TOP ──
document.getElementById('backTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
