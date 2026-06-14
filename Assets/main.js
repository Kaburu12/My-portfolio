/* ============================================================
   THEME TOGGLE
   ============================================================ */
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

const applyTheme = (theme) => {
  html.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
};

const saved = localStorage.getItem('mk-theme') || 'light';
applyTheme(saved);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('mk-theme', next);
});

/* ============================================================
   ROTATING HERO WORDS
   Words that cycle after "I architect…"
   ============================================================ */
const roles = [
  'AI-driven finance systems',
  'RAG-based tax assistants',
  'GenAI platforms at scale',
  'real-time forecasting pipelines',
  'financial automation workflows',
  'full-stack web applications',
  'tax reconciliation engines',
  'enterprise data pipelines',
  'intelligent reporting structures',
];

const rotatorEl = document.getElementById('rotator');

/* Typewriter effect — echoes the readme-typing-svg banner from the GitHub profile.
   Types a phrase, holds, deletes, then advances to the next. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  /* Respect reduced-motion: just cycle text with a gentle fade */
  let roleIdx = 0;
  setInterval(() => {
    rotatorEl.style.opacity = '0';
    setTimeout(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      rotatorEl.textContent = roles[roleIdx];
      rotatorEl.style.opacity = '1';
    }, 300);
  }, 2800);
} else {
  rotatorEl.classList.add('typing');
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const TYPE_SPEED   = 55;   // ms per character typed
  const DELETE_SPEED = 28;   // ms per character deleted
  const HOLD_FULL    = 1500; // pause once fully typed
  const HOLD_EMPTY   = 350;  // pause before next word

  function tick() {
    const word = roles[roleIdx];
    rotatorEl.textContent = word.slice(0, charIdx);

    if (!deleting) {
      if (charIdx < word.length) {
        charIdx++;
        setTimeout(tick, TYPE_SPEED);
      } else {
        deleting = true;
        setTimeout(tick, HOLD_FULL);
      }
    } else {
      if (charIdx > 0) {
        charIdx--;
        setTimeout(tick, DELETE_SPEED);
      } else {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, HOLD_EMPTY);
      }
    }
  }
  tick();
}

/* ============================================================
   SCROLL REVEAL (Intersection Observer)
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ============================================================
   NAV — scroll border intensity
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 48) {
    nav.style.borderBottomColor = 'var(--border-2)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
}, { passive: true });

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          const active = a.getAttribute('href') === `#${id}`;
          a.style.color      = active ? 'var(--text)'   : '';
          a.style.background = active ? 'var(--bg-3)'   : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ============================================================
   SHARE BUTTONS
   ============================================================ */
const siteUrl  = 'https://kaburu12.github.io/My-portfolio/';
const shareMsg = "Check out Michael Kaburu's portfolio — Tax & Finance Transformation Expert and AI Solutions Developer:";

document.getElementById('shareWhatsApp').addEventListener('click', () => {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(shareMsg + ' ' + siteUrl)}`,
    '_blank', 'noopener'
  );
});

document.getElementById('shareLinkedIn').addEventListener('click', () => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
    '_blank', 'noopener'
  );
});

document.getElementById('shareEmail').addEventListener('click', () => {
  window.location.href =
    `mailto:?subject=${encodeURIComponent('Michael Kaburu — Portfolio')}&body=${encodeURIComponent(shareMsg + '\n\n' + siteUrl)}`;
});

document.getElementById('copyLink').addEventListener('click', () => {
  navigator.clipboard.writeText(siteUrl).then(() => {
    const confirm = document.getElementById('copyConfirm');
    confirm.classList.add('visible');
    setTimeout(() => confirm.classList.remove('visible'), 2200);
  }).catch(() => {
    /* fallback for browsers without clipboard API */
    const ta = document.createElement('textarea');
    ta.value = siteUrl;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const confirm = document.getElementById('copyConfirm');
    confirm.classList.add('visible');
    setTimeout(() => confirm.classList.remove('visible'), 2200);
  });
});

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById('footerYear').textContent = `© ${new Date().getFullYear()}`;
