// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top = ry - 18 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-card, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    ring.style.transform = 'scale(1.5)';
    ring.style.borderColor = 'var(--green)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
    ring.style.borderColor = 'var(--cyan)';
  });
});

// ── Matrix Rain ──
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
const fontSize = 13;
let drops = Array(Math.floor(canvas.width / fontSize)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(3,5,8,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f5ff';
  ctx.font = fontSize + 'px Share Tech Mono, monospace';
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 50);

// ── Counter Animation ──
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (target >= 10 ? '+' : '');
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}
setTimeout(animateCounters, 800);

// ── Scroll Reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        const level = entry.target.getAttribute('data-level');
        setTimeout(() => { fill.style.width = level + '%'; }, 200);
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .timeline-item').forEach(el => observer.observe(el));

// ── Timeline Stagger ──
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

// ── Typing Effect ──
const tag = document.querySelector('.hero-tag');
const tagText = '// CYBERSECURITY ENGINEER';
tag.textContent = '';
let ti = 0;
setTimeout(() => {
  const typeInterval = setInterval(() => {
    tag.textContent += tagText[ti++];
    if (ti >= tagText.length) clearInterval(typeInterval);
  }, 50);
}, 300);
