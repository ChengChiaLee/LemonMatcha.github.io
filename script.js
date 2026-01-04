const btn = document.getElementById('themeBtn');

if (btn) {
  const txt = btn.querySelector('.theme-txt');

  function getSystemTheme(){
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light' : 'dark';
  }

  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    if (txt) {
      txt.textContent = (t === 'light') ? 'Light' : 'Dark';
    }
  }

  const saved = localStorage.getItem('theme');
  applyTheme(saved || getSystemTheme());

  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || getSystemTheme();
    const next = (cur === 'dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}
