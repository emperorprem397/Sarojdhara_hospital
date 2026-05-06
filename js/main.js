/* ================================================================
   DR. SAROJDHARA HOSPITAL — main.js v2
   Upgraded for new creative design
   ================================================================ */

// ── CURSOR GLOW ──
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backTop.classList.toggle('show', window.scrollY > 500);
});

// ── HAMBURGER ──
const navBurger = document.getElementById('navBurger');
const navMenu   = document.getElementById('navMenu');
navBurger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navBurger.querySelectorAll('span');
  navMenu.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px,5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity = '',
       spans[2].style.transform = '');
});
document.querySelectorAll('.nm-link, .nav-book').forEach(l =>
  l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navBurger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  })
);

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 75, behavior: 'smooth' });
    }
  });
});

// ── SCROLL REVEAL (IntersectionObserver) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseFloat(el.dataset.delay || 0) * 80;
      setTimeout(() => el.classList.add('reveal-in'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Observe all reveal-able elements
document.querySelectorAll(
  '.stat-item, .sb-card, .wg-item, .gm-item, .tc, .bc'
).forEach((el, i) => {
  el.dataset.delay = el.dataset.delay || i;
  revealObserver.observe(el);
});

// ── STATS COUNTER ──
function runCounters() {
  document.querySelectorAll('.stat-item').forEach(item => {
    const numEl  = item.querySelector('.si-num');
    const target = parseFloat(item.dataset.target);
    const suffix = item.dataset.suffix || '';
    const text   = item.dataset.text;

    if (text) { numEl.textContent = text; return; }
    if (!target) return;

    const isDecimal = target % 1 !== 0;
    const duration  = 2000;
    const steps     = 80;
    let   count     = 0;

    const timer = setInterval(() => {
      count++;
      const val = (count / steps) * target;
      numEl.textContent = isDecimal
        ? val.toFixed(1) + suffix
        : Math.floor(val).toLocaleString() + suffix;
      if (count >= steps) {
        numEl.textContent = isDecimal
          ? target.toFixed(1) + suffix
          : target.toLocaleString() + suffix;
        clearInterval(timer);
      }
    }, duration / steps);
  });
}

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    runCounters();
    statsObserver.disconnect();
  }
}, { threshold: 0.3 });
const statsSec = document.querySelector('.stats-sec');
if (statsSec) statsObserver.observe(statsSec);

// ── TESTIMONIALS SCROLL ──
const testiScroll = document.getElementById('testiScroll');
const tPrev       = document.getElementById('tPrev');
const tNext       = document.getElementById('tNext');
let testiIndex    = 0;

function getTestiCols() {
  return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
}

function updateTesti() {
  const cards  = testiScroll.querySelectorAll('.tc');
  const cols   = getTestiCols();
  const maxIdx = Math.max(0, Math.ceil(cards.length / cols) - 1);
  testiIndex   = Math.max(0, Math.min(testiIndex, maxIdx));

  // Change grid visibility
  cards.forEach((c, i) => {
    const page = Math.floor(i / cols);
    c.style.display = page === testiIndex ? '' : 'none';
  });
}

updateTesti();
tPrev.addEventListener('click', () => { testiIndex--; updateTesti(); });
tNext.addEventListener('click', () => { testiIndex++; updateTesti(); });
window.addEventListener('resize', updateTesti);

// ── APPOINTMENT → WHATSAPP ──
const bookBtn = document.getElementById('bookBtn');
if (bookBtn) {
  bookBtn.addEventListener('click', () => {
    const name     = document.getElementById('apptName').value.trim();
    const age      = document.getElementById('apptAge').value.trim();
    const gender   = document.getElementById('apptGender').value;
    const phone    = document.getElementById('apptPhone').value.trim();
    const dept     = document.getElementById('apptDept').value;
    const date     = document.getElementById('apptDate').value;
    const time     = document.getElementById('apptTime').value;
    const symptoms = document.getElementById('apptSymptoms').value.trim();

    if (!name || !phone || !dept) {
      // Shake the empty fields
      ['apptName','apptPhone','apptDept'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
          el.style.borderColor = '#dc2626';
          el.style.boxShadow   = '0 0 0 3px rgba(220,38,38,0.15)';
          setTimeout(() => {
            el.style.borderColor = '';
            el.style.boxShadow   = '';
          }, 2000);
        }
      });
      return;
    }

    const msg =
`🏥 *Appointment Request — Dr. Sarojdhara Hospital*

👤 *Patient Name:* ${name}
🎂 *Age:* ${age || 'Not mentioned'} | *Gender:* ${gender || 'Not mentioned'}
📞 *WhatsApp:* ${phone}
🩺 *Concern / Department:* ${dept}
📅 *Preferred Date:* ${date || 'Flexible'}
⏰ *Time Slot:* ${time || 'Any available'}
📝 *Symptoms / Notes:* ${symptoms || 'Not provided'}

_Please confirm my appointment at the earliest. Thank you!_
_Dr. Sarojdhara Hospital, Shikargah, Jodhpur_`;

    window.open(`https://wa.me/919829888702?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// ── BACK TO TOP ──
backTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── ACTIVE NAV LINK on SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nm-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── ADD ACTIVE NAV STYLE ──
const navStyle = document.createElement('style');
navStyle.textContent = `.nm-link.active { color: #fff !important; background: rgba(255,255,255,0.12) !important; }`;
document.head.appendChild(navStyle);
