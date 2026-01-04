// footer year
document.getElementById('y').textContent = new Date().getFullYear();

const root = document.documentElement;
const btn = document.getElementById('themeBtn');
const ico = btn.querySelector('.theme-ico');
const txt = btn.querySelector('.theme-txt');

function getSystemTheme(){
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function applyTheme(t){
  root.setAttribute('data-theme', t);
  if(t === 'light'){
    ico.textContent = '☀';
    txt.textContent = 'Light';
  }else{
    ico.textContent = '☾';
    txt.textContent = 'Dark';
  }
}

const saved = localStorage.getItem('theme');
applyTheme(saved || getSystemTheme());

btn.addEventListener('click', () => {
  const cur = root.getAttribute('data-theme') || getSystemTheme();
  const next = (cur === 'dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// If user never chose manually, follow system changes live
const mq = window.matchMedia('(prefers-color-scheme: light)');
if(mq.addEventListener){
  mq.addEventListener('change', () => {
    if(!localStorage.getItem('theme')) applyTheme(getSystemTheme());
  });
}
