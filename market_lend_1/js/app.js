const translations = {
  en: {
    install: 'Install',
    attention: 'Attention',
    description: 'Download a VPN to watch porn videos.',
    footer: 'To view a large amount of hot content, download a VPN!'
  },
  fr: {
    install: 'Installer',
    attention: 'Attention',
    description: 'Téléchargez un VPN pour regarder des vidéos pornographiques.',
    footer: 'Pour accéder à davantage de contenu pour adultes, téléchargez un VPN !'
  },
  'pt-PT': {
    install: 'Instalar',
    attention: 'Atenção',
    description: 'Descarregue uma VPN para ver vídeos pornográficos.',
    footer: 'Para ver mais conteúdo para adultos, descarregue uma VPN!'
  },
  'pt-BR': {
    install: 'Instalar',
    attention: 'Atenção',
    description: 'Baixe uma VPN para assistir a vídeos pornográficos.',
    footer: 'Para ver mais conteúdo adulto, baixe uma VPN!'
  },
  es: {
    install: 'Instalar',
    attention: 'Atención',
    description: 'Descargue una VPN para ver vídeos pornográficos.',
    footer: 'Para ver más contenido para adultos, descargue una VPN.'
  },
  'es-419': {
    install: 'Instalar',
    attention: 'Atención',
    description: 'Descarga una VPN para ver videos pornográficos.',
    footer: 'Para ver más contenido para adultos, descarga una VPN.'
  },
  da: {
    install: 'Installer',
    attention: 'Bemærk',
    description: 'Download en VPN for at se pornografiske videoer.',
    footer: 'Download en VPN for at se mere voksenindhold!'
  },
  ja: {
    install: 'インストール',
    attention: 'ご注意',
    description: 'ポルノ動画を視聴するにはVPNをダウンロードしてください。',
    footer: 'より多くのアダルトコンテンツを見るには、VPNをダウンロードしてください。'
  },
  fil: {
    install: 'I-install',
    attention: 'Paalala',
    description: 'Mag-download ng VPN para makapanood ng mga pornograpikong video.',
    footer: 'Para makapanood ng maraming pang-adultong content, mag-download ng VPN!'
  },
  de: {
    install: 'Installieren',
    attention: 'Achtung',
    description: 'Laden Sie ein VPN herunter, um Pornovideos anzusehen.',
    footer: 'Laden Sie ein VPN herunter, um viele Inhalte für Erwachsene anzusehen!'
  },
  nb: {
    install: 'Installer',
    attention: 'Obs!',
    description: 'Last ned en VPN for å se pornografiske videoer.',
    footer: 'Last ned en VPN for å se mer vokseninnhold!'
  },
  sv: {
    install: 'Installera',
    attention: 'Observera',
    description: 'Ladda ner en VPN för att se pornografiska videor.',
    footer: 'Ladda ner en VPN för att se mer vuxeninnehåll!'
  },
  it: {
    install: 'Installa',
    attention: 'Attenzione',
    description: 'Scarica una VPN per guardare video pornografici.',
    footer: 'Per vedere molti contenuti per adulti, scarica una VPN!'
  },
  nl: {
    install: 'Installeren',
    attention: 'Let op',
    description: "Download een VPN om pornovideo's te bekijken.",
    footer: 'Download een VPN om veel inhoud voor volwassenen te bekijken!'
  },
  ro: {
    install: 'Instalează',
    attention: 'Atenție',
    description: 'Descarcă un VPN pentru a viziona videoclipuri pornografice.',
    footer: 'Pentru a vedea mai mult conținut pentru adulți, descarcă un VPN!'
  }
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
    ? navigator.languages
    : [navigator.language || document.documentElement.lang || 'en'];

  for (const candidate of browserLocales) {
    const match = matchLocale(candidate, supportedLocales);
    if (match) return match;
  }

  return 'en';
}

const landing = document.querySelector('.landing');
const video = document.querySelector('.background-video');
const sourceUrl = video.querySelector('source').src;
const locale = resolveLocale();
const dictionary = translations[locale] || translations.en;
let blobFallbackStarted = false;
let blobUrl;
let fitFrameId = 0;

function applyTranslations() {
  document.documentElement.lang = locale;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = dictionary[node.dataset.i18n] || translations.en[node.dataset.i18n];
  });
  document.querySelector('.screen-offer').setAttribute('aria-label', `${dictionary.install} VPN App`);
}

function fitTranslations() {
  const alert = landing.querySelector('.alert');
  const alertCopy = landing.querySelector('.alert-copy');
  const description = landing.querySelector('#alert-description');
  const header = landing.querySelector('.app-header');
  const note = landing.querySelector('.age-note');

  for (const mode of ['regular', 'compact', 'tight']) {
    landing.dataset.fit = mode;
    const copyBottom = alertCopy.getBoundingClientRect().bottom;
    const descriptionBottom = description.getBoundingClientRect().bottom;
    const headerBottom = header.getBoundingClientRect().bottom;
    const alertBounds = alert.getBoundingClientRect();
    const noteTop = note.getBoundingClientRect().top;
    if (descriptionBottom <= copyBottom - 6 &&
        headerBottom <= alertBounds.top - 8 &&
        alertBounds.bottom <= noteTop - 8) break;
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
  if (!video.paused) return;
  const playAttempt = video.play();
  if (playAttempt?.catch) {
    playAttempt.catch((error) => {
      // Safari blocks autoplay with sound. Keep the video running silently.
      if (error.name !== 'NotAllowedError' || video.muted) return;
      video.muted = true;
      video.play().catch(() => {});
    });
  }
}

async function useBlobFallback() {
  if (blobFallbackStarted) return;
  blobFallbackStarted = true;

  try {
    // Some preview servers ignore Range requests, which prevents iOS Safari
    // from loading an MP4 directly. A Blob URL supplies local byte seeking.
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
    blobUrl = URL.createObjectURL(await response.blob());
    landing.classList.remove('video-ready');
    video.src = blobUrl;
    video.load();
    keepVideoPlaying();
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
window.addEventListener('pageshow', () => {
  syncViewportHeight();
  scheduleFit();
  keepVideoPlaying();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) keepVideoPlaying();
});
document.addEventListener('pointerdown', keepVideoPlaying, { once: true, passive: true });
video.addEventListener('loadeddata', keepVideoPlaying);
video.addEventListener('playing', () => {
  requestAnimationFrame(() => landing.classList.add('video-ready'));
});
video.addEventListener('error', useBlobFallback, { once: true });
if (/AppleWebKit/i.test(navigator.userAgent)) {
  window.setTimeout(() => {
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) useBlobFallback();
  }, 2000);
}
video.addEventListener('ended', () => {
  video.currentTime = 0;
  keepVideoPlaying();
});
window.addEventListener('pagehide', () => {
  if (blobUrl) URL.revokeObjectURL(blobUrl);
});
keepVideoPlaying();
