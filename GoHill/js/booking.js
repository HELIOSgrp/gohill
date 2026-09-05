let selectedMode = null;
let currentDistrictId = null;
let currentDays = 1;

document.addEventListener('DOMContentLoaded', () => {
  initModeSelection();
  initWfhToggle();
  initContinueBtn();
  initBackBtn();
  populateDestinationDropdown();
  initDestinationChange();
  initStepper();
  initFormSubmit();

  // agar circle card se district=xxx aaya hai
  const params = new URLSearchParams(window.location.search);
  const preDistrict = params.get('district');
  if (preDistrict) {
    currentDistrictId = preDistrict;
  }
});

/* ---------- STAGE 1: Mode Selection ---------- */
function initModeSelection() {
  const cards = document.querySelectorAll('.mode-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedMode = card.dataset.mode;
      document.getElementById('continueBtn').disabled = false;
    });
  });
}

function initWfhToggle() {
  // abhi ke liye sirf state store karna hai, submit ke waqt use hoga
}

function initContinueBtn() {
  document.getElementById('continueBtn').addEventListener('click', () => {
    goToStage2();
  });
}

function initBackBtn() {
  document.getElementById('backBtn').addEventListener('click', () => {
    const stage2 = document.getElementById('stage2');
    if (!stage2.classList.contains('stage-hidden')) {
      goToStage1();
    } else {
      window.location.href = 'index.html';
    }
  });
}

function goToStage2() {
  document.getElementById('stage1').classList.add('stage-hidden');
  document.getElementById('stage2').classList.remove('stage-hidden');

  const chip = document.getElementById('selectedModeChip');
  chip.textContent = selectedMode === 'raw' ? 'RAW Mode Selected' : 'Classic Mode Selected';
  chip.className = 'selected-mode-chip ' + (selectedMode === 'raw' ? 'chip-raw' : 'chip-classic');

  if (currentDistrictId) {
    document.getElementById('destinationSelect').value = currentDistrictId;
    renderActivities(currentDistrictId);
  }
}

function goToStage1() {
  document.getElementById('stage2').classList.add('stage-hidden');
  document.getElementById('stage1').classList.remove('stage-hidden');
}

/* ---------- STAGE 2: Destination Dropdown ---------- */
function populateDestinationDropdown() {
  const select = document.getElementById('destinationSelect');
  DISTRICTS.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.name;
    select.appendChild(opt);
  });
}

function initDestinationChange() {
  document.getElementById('destinationSelect').addEventListener('change', (e) => {
    currentDistrictId = e.target.value;
    renderActivities(currentDistrictId);
  });
}

/* ---------- STAGE 2: Activities ---------- */
function renderActivities(districtId) {
  const list = document.getElementById('activitiesList');
  const activities = ACTIVITIES[districtId] || [];

  if (activities.length === 0) {
    list.innerHTML = `<p class="no-activities">Is jagah ke liye abhi activities available nahi hai.</p>`;
    return;
  }

  list.innerHTML = activities.map((a, i) => `
    <label class="activity-item">
      <input type="checkbox" name="activity" value="${a.name}">
      <span class="activity-check"></span>
      <span class="activity-info">
        <span class="activity-name">${a.name}</span>
        <span class="activity-meta">${a.price} · ${a.time}</span>
      </span>
    </label>
  `).join('');
}

/* ---------- STAGE 2: Days Stepper ---------- */
function initStepper() {
  document.getElementById('daysMinus').addEventListener('click', () => {
    if (currentDays > 1) {
      currentDays--;
      document.getElementById('daysValue').textContent = currentDays;
    }
  });
  document.getElementById('daysPlus').addEventListener('click', () => {
    currentDays++;
    document.getElementById('daysValue').textContent = currentDays;
  });
}

/* ---------- STAGE 2: Form Submit ---------- */
function initFormSubmit() {
  document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const mobile = document.getElementById('mobileInput').value.trim();
    const destination = document.getElementById('destinationSelect').value;

    if (!name) { alert('Naam daalo bhai'); return; }
    if (!/^\d{10}$/.test(mobile)) { alert('Sahi 10-digit mobile number daalo'); return; }
    if (!destination) { alert('Destination select karo'); return; }

    const selectedActivities = Array.from(document.querySelectorAll('input[name="activity"]:checked'))
      .map(cb => cb.value);

    const wfh = document.getElementById('wfhCheckbox').checked;

    const bookingData = {
      mode: selectedMode,
      workFromHill: wfh,
      destination,
      name,
      mobile,
      days: currentDays,
      activities: selectedActivities
    };

       console.log('Booking Data:', bookingData);

    const whatsappNumber = '919258166958'; // 91 India code + number

    const destinationName = DISTRICTS.find(d => d.id === destination)?.name || destination;

    const message =
      `*New Booking - GoHill*\n\n` +
      `*Mode:* ${bookingData.mode.toUpperCase()}\n` +
      `*Work From Hill:* ${wfh ? 'Yes' : 'No'}\n` +
      `*Destination:* ${destinationName}\n` +
      `*Name:* ${name}\n` +
      `*Mobile:* ${mobile}\n` +
      `*Days:* ${currentDays}\n` +
      `*Activities:* ${selectedActivities.length ? selectedActivities.join(', ') : 'None'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  });
}