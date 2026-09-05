document.addEventListener('DOMContentLoaded', () => {
  initBackBtn();
  renderNotifications();
});

function initBackBtn() {
  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// Abhi dummy data hai - backend aane ke baad yahan API se real data aayega
const NOTIFICATIONS = [
  // Test karne ke liye example (chaho to comment/uncomment karo):
  // { icon: '✅', title: 'Booking Confirmed', desc: 'Aapki Nainital trip confirm ho gayi hai', time: '2 hours ago' },
  // { icon: '📍', title: 'Guide Assigned', desc: 'Rahul aapke RAW trip ke guide honge', time: '1 day ago' },
];

function renderNotifications() {
  const list = document.getElementById('notifList');
  const emptyState = document.getElementById('emptyState');

  if (!NOTIFICATIONS || NOTIFICATIONS.length === 0) {
    list.style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';
  list.style.display = 'flex';

  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-card">
      <span class="notif-icon">${n.icon}</span>
      <div class="notif-content">
        <span class="notif-title">${n.title}</span>
        <span class="notif-desc">${n.desc}</span>
        <span class="notif-time">${n.time}</span>
      </div>
    </div>
  `).join('');
}