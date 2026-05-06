/* DR. SAROJDHARA HOSPITAL — main.js v3 */

// ── NAVBAR ──
const navbar = document.getElementById('navbar');
const topFab  = document.getElementById('topFab');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  topFab.classList.toggle('show', window.scrollY > 400);
});

// ── BURGER ──
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const s = burger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    s[1].style.opacity   = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    s.forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
  }
});
document.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.querySelectorAll('span').forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
}));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 68, behavior: 'smooth' }); }
  });
});

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('show'), i * 70);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

// ── STATS COUNTER ──
const so = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  document.querySelectorAll('.s-item').forEach(item => {
    const el  = item.querySelector('.s-num');
    const tgt = parseFloat(item.dataset.target);
    const sfx = item.dataset.suffix || '';
    const txt = item.dataset.text;
    if (txt) { el.textContent = txt; return; }
    if (!tgt) return;
    let count = 0, steps = 70;
    const timer = setInterval(() => {
      count++;
      const v = (count / steps) * tgt;
      el.textContent = tgt % 1 !== 0 ? v.toFixed(1) + sfx : Math.floor(v).toLocaleString() + sfx;
      if (count >= steps) { el.textContent = tgt % 1 !== 0 ? tgt.toFixed(1) + sfx : tgt.toLocaleString() + sfx; clearInterval(timer); }
    }, 1800 / steps);
  });
  so.disconnect();
}, { threshold: 0.3 });
const statsBand = document.querySelector('.stats-band');
if (statsBand) so.observe(statsBand);

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.nl').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
});

// ── APPOINTMENT WHATSAPP ──
document.getElementById('bookBtn').addEventListener('click', () => {
  const name  = document.getElementById('apptName').value.trim();
  const phone = document.getElementById('apptPhone').value.trim();
  const dept  = document.getElementById('apptDept').value;
  if (!name || !phone || !dept) {
    ['apptName','apptPhone','apptDept'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) { el.style.borderColor = '#dc2626'; setTimeout(() => { el.style.borderColor = ''; }, 2000); }
    });
    return;
  }
  const age      = document.getElementById('apptAge').value.trim();
  const gender   = document.getElementById('apptGender').value;
  const date     = document.getElementById('apptDate').value;
  const time     = document.getElementById('apptTime').value;
  const symptoms = document.getElementById('apptSymptoms').value.trim();
  const msg =
`🏥 *Appointment Request — Dr. Sarojdhara Hospital*

👤 *Name:* ${name}
🎂 *Age:* ${age || 'N/A'} | *Gender:* ${gender || 'N/A'}
📞 *WhatsApp:* ${phone}
🩺 *Concern:* ${dept}
📅 *Date:* ${date || 'Flexible'}
⏰ *Slot:* ${time || 'Any'}
📝 *Notes:* ${symptoms || 'None'}

_Please confirm my appointment. Thank you!_
_Dr. Sarojdhara Hospital, Shikargah, Jodhpur_`;
  window.open(`https://wa.me/919829888702?text=${encodeURIComponent(msg)}`, '_blank');
});

// ── BACK TO TOP ──
topFab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
