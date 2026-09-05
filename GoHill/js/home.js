document.addEventListener('DOMContentLoaded', () => {
  renderCircleCards();
  renderDistrictCards();
});

function renderCircleCards() {
  const wrap = document.getElementById('circleCards');
  if (!wrap) return;

  wrap.innerHTML = DISTRICTS.map(d => `
    <a class="circle-card" href="booking.html?district=${d.id}">
      <span class="circle-img-wrap">
        <img src="${d.circleImg}" alt="${d.name}" loading="lazy">
      </span>
      <span class="circle-label">${d.name}</span>s
    </a>
  `).join('');
}

function renderDistrictCards() {
  const wrap = document.getElementById('districtInfoSection');
  if (!wrap) return;

  wrap.innerHTML = DISTRICTS.map(d => `
    <article class="district-card" id="card-${d.id}">
      <div class="district-card-head">
        <span class="dot"></span>
        <h3>${d.name}</h3>
      </div>
      <p class="district-tagline">${d.tagline}</p>
      <div class="district-places">
        ${d.places.map(p => `<span class="place-chip">${p}</span>`).join('')}
      </div>
      <p class="district-desc"
         data-short="${encodeURIComponent(d.shortDesc)}"
         data-full="${encodeURIComponent(d.fullDesc)}">
        <span class="desc-text">${d.shortDesc}</span>
        <button class="read-more-btn" data-expanded="false">Read more</button>
      </p>
      <img class="district-img" src="${d.cardImg}" alt="${d.name}" loading="lazy">
    </article>
  `).join('');

  wrap.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', toggleReadMore);
  });
}

function toggleReadMore(e) {
  const btn = e.currentTarget;
  const descEl = btn.closest('.district-desc');
  const textEl = descEl.querySelector('.desc-text');
  const isExpanded = btn.dataset.expanded === 'true';

  if (isExpanded) {
    textEl.textContent = decodeURIComponent(descEl.dataset.short);
    btn.textContent = 'Read more';
    btn.dataset.expanded = 'false';
  } else {
    textEl.textContent = decodeURIComponent(descEl.dataset.full);
    btn.textContent = 'Read less';
    btn.dataset.expanded = 'true';
  }
}