const translations = {
  en: ['Tap to watch', 'Attention', 'Please install VPN App to continue watching in a safe mode', 'Install'],
  fr: ['Touchez pour regarder', 'Attention', 'Veuillez installer VPN App pour continuer à regarder en toute sécurité', 'Installer'],
  'pt-PT': ['Toque para ver', 'Atenção', 'Instale a VPN App para continuar a ver em segurança', 'Instalar'],
  'pt-BR': ['Toque para assistir', 'Atenção', 'Instale o VPN App para continuar assistindo com segurança', 'Instalar'],
  es: ['Toca para ver', 'Atención', 'Instala VPN App para seguir viendo de forma segura', 'Instalar'],
  'es-419': ['Toca para ver', 'Atención', 'Instala VPN App para seguir viendo de forma segura', 'Instalar'],
  da: ['Tryk for at se', 'Bemærk', 'Installer VPN App for at fortsætte med at se sikkert', 'Installer'],
  ja: ['タップして視聴', 'ご注意', '安全に視聴を続けるには VPN App をインストールしてください', 'インストール'],
  fil: ['I-tap para manood', 'Paalala', 'I-install ang VPN App upang magpatuloy sa ligtas na panonood', 'I-install'],
  de: ['Tippen zum Ansehen', 'Achtung', 'Installiere VPN App, um sicher weiterzuschauen', 'Installieren'],
  nb: ['Trykk for å se', 'Obs!', 'Installer VPN App for å fortsette å se på en trygg måte', 'Installer'],
  sv: ['Tryck för att titta', 'Observera', 'Installera VPN App för att fortsätta titta säkert', 'Installera'],
  it: ['Tocca per guardare', 'Attenzione', 'Installa VPN App per continuare a guardare in sicurezza', 'Installa'],
  nl: ['Tik om te kijken', 'Let op', 'Installeer VPN App om veilig verder te kijken', 'Installeren'],
  ro: ['Atinge pentru a viziona', 'Atenție', 'Instalează VPN App pentru a continua vizionarea în siguranță', 'Instalează']
};

function matchLocale(value) {
  const normalized = String(value).toLowerCase().replace('_', '-');
  return Object.keys(translations).find((key) => key.toLowerCase() === normalized) ||
    Object.keys(translations).find((key) => key.toLowerCase() === normalized.split('-')[0]) || null;
}

function resolveLocale() {
  const params = new URLSearchParams(window.location.search);
  const requested = matchLocale(params.get('lang') || params.get('locale') || '');
  if (requested) return requested;
  for (const candidate of navigator.languages || [navigator.language]) {
    const match = matchLocale(candidate);
    if (match) return match;
  }
  return 'en';
}

const landing = document.querySelector('.landing');
const intro = document.querySelector('.step-intro');
const install = document.querySelector('.step-install');
const play = document.querySelector('.play-button');
const locale = resolveLocale();
const copy = translations[locale];
let idleTimer;

document.documentElement.lang = locale;
for (const [key, index] of Object.entries({tap: 0, attention: 1, description: 2, install: 3})) {
  document.querySelector(`[data-i18n="${key}"]`).textContent = copy[index];
}
play.setAttribute('aria-label', copy[0]);
install.setAttribute('aria-label', copy[3] + ' VPN App');

function syncViewportHeight() {
  landing.style.setProperty('--viewport-height', `${window.visualViewport?.height || window.innerHeight}px`);
}

function showInstall() {
  if (landing.dataset.step === '2') return;
  clearTimeout(idleTimer);
  intro.inert = true;
  intro.setAttribute('aria-hidden', 'true');
  install.inert = false;
  install.removeAttribute('aria-hidden');
  landing.dataset.step = '2';
}

function resetIdleTimer() {
  if (landing.dataset.step !== '1' || document.hidden) return;
  clearTimeout(idleTimer);
  idleTimer = window.setTimeout(showInstall, 5000);
}

play.addEventListener('click', showInstall);
for (const eventName of ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart']) {
  document.addEventListener(eventName, resetIdleTimer, { passive: true });
}
document.addEventListener('visibilitychange', () => {
  clearTimeout(idleTimer);
  resetIdleTimer();
});
window.addEventListener('pagehide', () => clearTimeout(idleTimer));
window.addEventListener('pageshow', resetIdleTimer);
window.addEventListener('resize', syncViewportHeight, { passive: true });
window.visualViewport?.addEventListener('resize', syncViewportHeight, { passive: true });
syncViewportHeight();
resetIdleTimer();
