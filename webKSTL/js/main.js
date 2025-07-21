// main.js - Dùng cho các hiệu ứng hoặc xử lý JS sau này
console.log('Landing page loaded!');

// Dropdown confession
const confessionToggle = document.getElementById('confessionToggle');
const confessionMenu = document.getElementById('confessionMenu');
const confessionDropdown = confessionToggle?.parentElement;

function closeConfessionMenu(e) {
  if (!confessionDropdown.contains(e.target)) {
    confessionDropdown.classList.remove('open');
    document.removeEventListener('mousedown', closeConfessionMenu);
    document.removeEventListener('touchstart', closeConfessionMenu);
  }
}

if (confessionToggle && confessionDropdown) {
  confessionToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    confessionDropdown.classList.toggle('open');
    if (confessionDropdown.classList.contains('open')) {
      setTimeout(() => {
        document.addEventListener('mousedown', closeConfessionMenu);
        document.addEventListener('touchstart', closeConfessionMenu);
      }, 0);
    } else {
      document.removeEventListener('mousedown', closeConfessionMenu);
      document.removeEventListener('touchstart', closeConfessionMenu);
    }
  });
}

// Custom cursor effect
(function() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-dot';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  function animate() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX - 12}px, ${cursorY - 12}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover effect
  const hoverTargets = ['.confession-card', '.confession-link', '.confession-btn'];
  hoverTargets.forEach(sel => {
    document.body.addEventListener('mouseover', e => {
      if (e.target.closest(sel)) cursor.classList.add('cursor-hover');
    });
    document.body.addEventListener('mouseout', e => {
      if (e.target.closest(sel)) cursor.classList.remove('cursor-hover');
    });
  });

  // Ripple effect on click
  document.addEventListener('mousedown', e => {
    cursor.classList.add('cursor-click');
    setTimeout(() => cursor.classList.remove('cursor-click'), 250);
  });
})();

// Ripple effect for mobile buttons
(function() {
  if (window.innerWidth > 900) return;
  function createRipple(e) {
    const btn = e.currentTarget;
    let ripple = btn.querySelector('.ripple');
    if (ripple) ripple.remove();
    ripple = document.createElement('span');
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left - size/2 + 'px';
    ripple.style.top = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top - size/2 + 'px';
    ripple.classList.add('ripple-animate');
    setTimeout(() => ripple && ripple.remove(), 500);
  }
  document.querySelectorAll('.confession-btn, .confession-link, .featured-story-link').forEach(btn => {
    btn.addEventListener('touchstart', createRipple, {passive: true});
  });

  // Card touch scale effect
  function addTouchScale(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('touchstart', () => card.classList.add('touch-scale'), {passive: true});
      card.addEventListener('touchend', () => card.classList.remove('touch-scale'));
      card.addEventListener('touchcancel', () => card.classList.remove('touch-scale'));
    });
  }
  addTouchScale('.confession-card');
  addTouchScale('.featured-story-card');
})(); 