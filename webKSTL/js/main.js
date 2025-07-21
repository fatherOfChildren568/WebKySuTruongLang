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