const root = document.documentElement;
const btn = document.getElementById('themeBtn');

function getSystemTheme(){
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function setBtnLabel(t){
  const label = (t === 'light') ? 'Light' : 'Dark';
  const txt = btn ? btn.querySelector('.theme-txt') : null;

  if (txt) txt.textContent = label;
  else if (btn) btn.textContent = label; // fallback: updates button directly
}

function applyTheme(t){
  root.setAttribute('data-theme', t);
  setBtnLabel(t);
}

if (btn) {
  const saved = localStorage.getItem('theme');
  applyTheme(saved || getSystemTheme());

  btn.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') || getSystemTheme();
    const next = (cur === 'dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

// --- tag filtering ---
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clearFilters');
const postCards = document.querySelectorAll('.post-card');

let activeTags = new Set(); // selected tags except ALL

function norm(t){
  return (t || '').trim().toUpperCase();
}

function getTags(card){
  const raw = card.getAttribute('data-tags') || '';
  return raw.split(',').map(norm).filter(Boolean);
}

function updateFiltersUI(){
  // button states
  filterBtns.forEach(b => {
    const t = norm(b.dataset.tag);
    if (t === 'ALL') b.classList.toggle('is-active', activeTags.size === 0);
    else b.classList.toggle('is-active', activeTags.has(t));
  });

  // posts visibility
  postCards.forEach(card => {
    const tags = getTags(card);
    const show = (activeTags.size === 0)
      ? true
      : [...activeTags].every(t => tags.includes(t)); // AND logic
    card.classList.toggle('is-hidden', !show);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const t = norm(btn.dataset.tag);

    if (t === 'ALL') {
      activeTags.clear();
      updateFiltersUI();
      return;
    }

    if (activeTags.has(t)) activeTags.delete(t);
    else activeTags.add(t);

    updateFiltersUI();
  });
});

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    activeTags.clear();
    updateFiltersUI();
  });
}

updateFiltersUI();
