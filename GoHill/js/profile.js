document.addEventListener('DOMContentLoaded', () => {
  initBackBtn();
  loadSavedData();
  initNameSave();
  initMobileSave();
  initPrefChips();
  initPwaInstall();
});

function initBackBtn() {
  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

/* ---------- Load saved data from localStorage ---------- */
function loadSavedData() {
  const name = localStorage.getItem('gohill_name');
  const mobile = localStorage.getItem('gohill_mobile');
  const prefs = JSON.parse(localStorage.getItem('gohill_prefs') || '[]');

  if (name) {
    document.getElementById('profileName').value = name;
    showStatus('nameStatus', 'Saved');
  }
  if (mobile) {
    document.getElementById('profileMobile').value = mobile;
    showStatus('mobileStatus', 'Saved');
  }
  if (prefs.length) {
    document.querySelectorAll('.pref-chip').forEach(chip => {
      if (prefs.includes(chip.dataset.pref)) chip.classList.add('selected');
    });
    showStatus('prefStatus', 'Saved');
  }
}

/* ---------- Name ---------- */
function initNameSave() {
  document.getElementById('saveName').addEventListener('click', () => {
    const val = document.getElementById('profileName').value.trim();
    if (!val) { showStatus('nameStatus', 'Naam likho pehle', true); return; }
    localStorage.setItem('gohill_name', val);
    showStatus('nameStatus', 'Saved');
  });
}

/* ---------- Mobile ---------- */
function initMobileSave() {
  document.getElementById('saveMobile').addEventListener('click', () => {
    const val = document.getElementById('profileMobile').value.trim();
    if (!/^\d{10}$/.test(val)) { showStatus('mobileStatus', 'Sahi 10-digit number daalo', true); return; }
    localStorage.setItem('gohill_mobile', val);
    showStatus('mobileStatus', 'Saved');
  });
}

/* ---------- Preferred Type (multi-select chips) ---------- */
function initPrefChips() {
  document.querySelectorAll('.pref-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  document.getElementById('savePref').addEventListener('click', () => {
    const selected = Array.from(document.querySelectorAll('.pref-chip.selected'))
      .map(c => c.dataset.pref);
    localStorage.setItem('gohill_prefs', JSON.stringify(selected));
    showStatus('prefStatus', selected.length ? 'Saved' : 'Kuch bhi select nahi hai', !selected.length);
  });
}

/* ---------- Small helper ---------- */
function showStatus(id, msg, isError = false) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.className = 'save-status ' + (isError ? 'status-error' : 'status-ok');
  setTimeout(() => { el.textContent = ''; }, 2000);
}

/* ---------- PWA Install ---------- */
function initPwaInstall() {
  const btn = document.getElementById('pwaInstallBtn');

  btn.addEventListener('click', async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const choice = await window.deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        showStatus('pwaStatus', 'App install ho rahi hai');
      } else {
        showStatus('pwaStatus', 'Install cancel kar diya');
      }
      window.deferredPrompt = null;
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
      showStatus('pwaStatus', 'App already installed hai');
    } else {
      showStatus('pwaStatus', 'Browser menu se "Add to Home Screen" try karo');
    }
  });
}