document.addEventListener('DOMContentLoaded', () => {
  initBackBtn();
  initConnectForm();
});

function initBackBtn() {
  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function initConnectForm() {
  document.getElementById('connectForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('connectName').value.trim();
    const mobile = document.getElementById('connectMobile').value.trim();
    const query = document.getElementById('connectQuery').value.trim();

    if (!name) { alert('Naam daalo bhai'); return; }
    if (!/^\d{10}$/.test(mobile)) { alert('Sahi 10-digit mobile number daalo'); return; }
    if (!query) { alert('Apna sawaal likho'); return; }

    const whatsappNumber = '919258166958'; // 91 India code + number

    const message =
      `*New Query - GoHill*\n\n` +
      `*Name:* ${name}\n` +
      `*Mobile:* ${mobile}\n` +
      `*Query:* ${query}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  });
}