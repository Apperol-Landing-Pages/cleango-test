const translations = {
  en: ['Install','Unavailable in your country','Download VPN to watch','To watch videos, you need to |install a VPN| for your security.','Install VPN'],
  fr: ['Installer','Indisponible dans votre pays','Téléchargez un VPN pour regarder','Pour regarder des vidéos en toute sécurité, vous devez |installer un VPN|.','Installer le VPN'],
  'pt-PT': ['Instalar','Indisponível no seu país','Descarregue uma VPN para ver','Para ver vídeos em segurança, precisa de |instalar uma VPN|.','Instalar VPN'],
  'pt-BR': ['Instalar','Indisponível no seu país','Baixe uma VPN para assistir','Para assistir a vídeos com segurança, você precisa |instalar uma VPN|.','Instalar VPN'],
  es: ['Instalar','No disponible en tu país','Descarga una VPN para ver vídeos','Para ver vídeos de forma segura, necesitas |instalar una VPN|.','Instalar VPN'],
  'es-419': ['Instalar','No disponible en tu país','Descarga una VPN para ver videos','Para ver videos de forma segura, necesitas |instalar una VPN|.','Instalar VPN'],
  da: ['Installer','Ikke tilgængelig i dit land','Download en VPN for at se videoer','For at se videoer sikkert skal du |installere en VPN|.','Installer VPN'],
  ja: ['インストール','お住まいの国では利用できません','視聴するにはVPNをダウンロード','動画を安全に視聴するには、|VPNをインストール|してください。','VPNをインストール'],
  fil: ['I-install','Hindi available sa iyong bansa','Mag-download ng VPN para manood','Para makapanood ng mga video nang ligtas, kailangan mong |mag-install ng VPN|.','I-install ang VPN'],
  de: ['Installieren','In deinem Land nicht verfügbar','VPN zum Ansehen herunterladen','Um Videos sicher anzusehen, musst du ein |VPN installieren|.','VPN installieren'],
  nb: ['Installer','Ikke tilgjengelig i ditt land','Last ned VPN for å se videoer','For å se videoer på en trygg måte må du |installere et VPN|.','Installer VPN'],
  sv: ['Installera','Inte tillgängligt i ditt land','Ladda ner VPN för att titta','För att titta på videor säkert behöver du |installera ett VPN|.','Installera VPN'],
  it: ['Installa','Non disponibile nel tuo Paese','Scarica una VPN per guardare','Per guardare i video in sicurezza, devi |installare una VPN|.','Installa VPN'],
  nl: ['Installeren','Niet beschikbaar in jouw land','Download VPN om te kijken',"Om video's veilig te bekijken, moet je een |VPN installeren|.",'Installeer VPN'],
  ro: ['Instalează','Indisponibil în țara ta','Descarcă un VPN pentru vizionare','Pentru a viziona videoclipuri în siguranță, trebuie să |instalezi un VPN|.','Instalează VPN']
};

const appIdentity = {
  appName: 'VPN App',
  publisher: 'VPN App, Inc.'
};

const soundLabels = {
  en: ['Turn sound on', 'Turn sound off'],
  fr: ['Activer le son', 'Désactiver le son'],
  'pt-PT': ['Ativar o som', 'Desativar o som'],
  'pt-BR': ['Ativar o som', 'Desativar o som'],
  es: ['Activar sonido', 'Desactivar sonido'],
  'es-419': ['Activar sonido', 'Desactivar sonido'],
  da: ['Slå lyden til', 'Slå lyden fra'],
  ja: ['音声をオンにする', '音声をオフにする'],
  fil: ['Buksan ang tunog', 'I-mute ang tunog'],
  de: ['Ton einschalten', 'Ton ausschalten'],
  nb: ['Slå på lyd', 'Slå av lyd'],
  sv: ['Slå på ljud', 'Stäng av ljud'],
  it: ['Attiva audio', 'Disattiva audio'],
  nl: ['Geluid aanzetten', 'Geluid uitzetten'],
  ro: ['Activează sunetul', 'Dezactivează sunetul']
};

function matchLocale(value, supportedLocales) {
  const normalized = String(value).toLowerCase().replace('_', '-');
  const exactLocale = supportedLocales.find((key) => key.toLowerCase() === normalized);
  if (exactLocale) return exactLocale;
  const baseLocale = normalized.split('-')[0];
  return supportedLocales.find((key) => key.toLowerCase() === baseLocale) || null;
}

function resolveLocale() {
  const supportedLocales = Object.keys(translations);
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = params.get('lang') || params.get('locale');
  if (requestedLocale) {
    const match = matchLocale(requestedLocale, supportedLocales);
    if (match) return match;
  }
  const browserLocales = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages : [navigator.language || document.documentElement.lang || 'en'];
  for (const candidate of browserLocales) {
    const match = matchLocale(candidate, supportedLocales);
    if (match) return match;
  }
  return 'en';
}

const landing = document.querySelector('.landing');
const video = document.querySelector('.background-video');
const soundToggle = document.querySelector('.sound-toggle');
const sourceUrl = video.querySelector('source').src;
const locale = resolveLocale();
const dictionary = translations[locale] || translations.en;
video.muted = true;
let fitFrameId = 0;
let blobFallbackStarted = false;
let blobUrl;
let videoPhase = 'priming';
let revealTimer = 0;
let userRequestedSound = false;

function updateSoundButton() {
  const label = soundLabels[locale][video.muted ? 0 : 1];
  soundToggle.setAttribute('aria-pressed', String(!video.muted));
  soundToggle.setAttribute('aria-label', label);
  soundToggle.title = label;
}

function applyTranslations() {
  document.documentElement.lang = locale;
  const copy = {
    ...appIdentity,
    install: dictionary[0],
    unavailable: dictionary[1],
    headline: dictionary[2],
    installVpn: dictionary[4]
  };
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = copy[node.dataset.i18n];
  });
  const [before, strong, after] = dictionary[3].split('|');
  document.querySelector('#dialog-description').replaceChildren(
    document.createTextNode(before),
    Object.assign(document.createElement('strong'), { textContent: strong }),
    document.createTextNode(after)
  );
  document.title = appIdentity.appName;
  landing.setAttribute('aria-label', `${appIdentity.appName} — ${dictionary[4]}`);
  document.querySelector('.screen-offer').setAttribute('aria-label', dictionary[4]);
  document.querySelector('.app-panel').setAttribute('aria-label', `${dictionary[0]} ${appIdentity.appName}`);
  updateSoundButton();
}

function fitTranslations() {
  const panel = document.querySelector('.app-panel');
  const dialog = document.querySelector('.dialog');
  const copy = document.querySelector('.dialog-copy');
  const button = document.querySelector('.install-button');
  for (const mode of ['regular', 'compact', 'tight']) {
    landing.dataset.fit = mode;
    const panelBounds = panel.getBoundingClientRect();
    const dialogBounds = dialog.getBoundingClientRect();
    const copyBounds = copy.getBoundingClientRect();
    const buttonBounds = button.getBoundingClientRect();
    if (panelBounds.bottom + 10 <= dialogBounds.top &&
        copyBounds.bottom + 10 <= buttonBounds.top &&
        dialogBounds.bottom <= landing.getBoundingClientRect().bottom - 16 &&
        dialogBounds.top >= 0) break;
  }
}

function scheduleFit() {
  cancelAnimationFrame(fitFrameId);
  fitFrameId = requestAnimationFrame(fitTranslations);
}

function syncViewportHeight() {
  const height = window.visualViewport?.height || window.innerHeight;
  landing.style.setProperty('--viewport-height', `${height}px`);
}

function keepVideoPlaying() {
  if (videoPhase !== 'playing' || !video.paused) return;
  const attempt = video.play();
  if (attempt?.catch) attempt.catch(() => {
    if (video.muted) return;
    video.muted = true;
    userRequestedSound = false;
    updateSoundButton();
    const mutedAttempt = video.play();
    if (mutedAttempt?.catch) mutedAttempt.catch(() => {});
  });
}

function primeVideo() {
  if (videoPhase !== 'priming' || !video.paused) return;
  const attempt = video.play();
  if (attempt?.catch) attempt.catch(() => {});
}

function revealFirstFrame() {
  if (videoPhase !== 'seeking' || video.seeking || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
  video.pause();
  videoPhase = 'fading';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    landing.classList.add('video-ready');
    revealTimer = window.setTimeout(() => {
      videoPhase = 'playing';
      video.muted = false;
      soundToggle.disabled = false;
      updateSoundButton();
      keepVideoPlaying();
    }, 470);
  }));
}

function prepareFirstFrame() {
  if (videoPhase === 'seeking') {
    revealFirstFrame();
    return;
  }
  if (videoPhase !== 'priming' || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
  videoPhase = 'seeking';
  video.pause();
  if (video.currentTime > 0.001) {
    video.currentTime = 0;
  }
  revealFirstFrame();
}

function ensureVideo() {
  if (videoPhase === 'playing') keepVideoPlaying();
  else if (videoPhase === 'priming') primeVideo();
}

async function useBlobFallback() {
  if (blobFallbackStarted) return;
  blobFallbackStarted = true;
  landing.classList.remove('video-ready');
  window.clearTimeout(revealTimer);
  videoPhase = 'priming';
  video.muted = true;
  userRequestedSound = false;
  soundToggle.disabled = true;
  updateSoundButton();
  try {
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
    blobUrl = URL.createObjectURL(await response.blob());
    video.src = blobUrl;
    video.load();
    primeVideo();
  } catch (error) {
    console.warn('Could not load the video fallback', error);
  }
}

applyTranslations();
syncViewportHeight();
fitTranslations();
window.addEventListener('resize', () => { syncViewportHeight(); scheduleFit(); }, { passive: true });
window.visualViewport?.addEventListener('resize', () => { syncViewportHeight(); scheduleFit(); }, { passive: true });
document.fonts?.ready.then(scheduleFit);
window.addEventListener('pageshow', () => { syncViewportHeight(); scheduleFit(); ensureVideo(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden) ensureVideo(); });
document.addEventListener('pointerdown', ensureVideo, { passive: true });
soundToggle.addEventListener('click', () => {
  if (soundToggle.disabled) return;
  if (video.muted) {
    userRequestedSound = true;
    video.muted = false;
    updateSoundButton();
    const attempt = video.play();
    if (attempt?.catch) attempt.catch(() => {
      video.muted = true;
      userRequestedSound = false;
      updateSoundButton();
      keepVideoPlaying();
    });
  } else {
    userRequestedSound = false;
    video.muted = true;
    updateSoundButton();
  }
});
video.addEventListener('loadeddata', prepareFirstFrame);
video.addEventListener('canplay', revealFirstFrame);
video.addEventListener('seeked', revealFirstFrame);
video.addEventListener('playing', () => {
  if (videoPhase === 'priming') prepareFirstFrame();
  else if (videoPhase !== 'playing') video.pause();
});
video.addEventListener('error', useBlobFallback, { once: true });
video.addEventListener('pause', () => {
  if (videoPhase === 'playing' && !document.hidden && !video.muted && !userRequestedSound) {
    video.muted = true;
    updateSoundButton();
    keepVideoPlaying();
  }
});
if (/AppleWebKit/i.test(navigator.userAgent) && !/(Chrome|CriOS|Edg|OPR|Firefox|FxiOS)/i.test(navigator.userAgent)) {
  window.setTimeout(() => { if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) useBlobFallback(); }, 2000);
}
video.addEventListener('ended', () => { video.currentTime = 0; keepVideoPlaying(); });
window.addEventListener('pagehide', () => { if (blobUrl) URL.revokeObjectURL(blobUrl); });
if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) prepareFirstFrame();
else primeVideo();
