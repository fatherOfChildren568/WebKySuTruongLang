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