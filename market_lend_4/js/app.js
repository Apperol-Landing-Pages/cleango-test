const translations = {
  en: ['Attention', 'Your country is blocking collections of the juiciest porn videos. Please |install a VPN to continue|.', 'Install VPN'],
  fr: ['Attention', 'Votre pays bloque les collections des vidéos porno les plus torrides. Veuillez |installer un VPN pour continuer|.', 'Installer le VPN'],
  'pt-PT': ['Atenção', 'O seu país bloqueia coleções dos vídeos pornográficos mais excitantes. |Instale uma VPN para continuar|.', 'Instalar VPN'],
  'pt-BR': ['Atenção', 'Seu país bloqueia coleções dos vídeos pornôs mais quentes. |Instale uma VPN para continuar|.', 'Instalar VPN'],
  es: ['Atención', 'Tu país bloquea las colecciones de los vídeos porno más excitantes. |Instala una VPN para continuar|.', 'Instalar VPN'],
  'es-419': ['Atención', 'Tu país bloquea las colecciones de los videos porno más excitantes. |Instala una VPN para continuar|.', 'Instalar VPN'],
  da: ['Bemærk', 'Dit land blokerer samlinger af de mest spændende pornovideoer. |Installer en VPN for at fortsætte|.', 'Installer VPN'],
  ja: ['ご注意', 'お住まいの国では人気のアダルト動画集がブロックされています。続けるには|VPNをインストール|してください。', 'VPNをインストール'],
  fil: ['Paalala', 'Hinaharangan ng iyong bansa ang mga koleksiyon ng pinakakapana-panabik na porn video. |Mag-install ng VPN para magpatuloy|.', 'I-install ang VPN'],
  de: ['Achtung', 'Dein Land blockiert Sammlungen der heißesten Pornovideos. Bitte |installiere ein VPN, um fortzufahren|.', 'VPN installieren'],
  nb: ['Obs!', 'Landet ditt blokkerer samlinger av de mest spennende pornovideoene. |Installer en VPN for å fortsette|.', 'Installer VPN'],
  sv: ['Observera', 'Ditt land blockerar samlingar av de hetaste porrfilmerna. |Installera ett VPN för att fortsätta|.', 'Installera VPN'],
  it: ['Attenzione', 'Il tuo Paese blocca le raccolte dei video porno più eccitanti. |Installa una VPN per continuare|.', 'Installa VPN'],
  nl: ['Let op', 'Jouw land blokkeert verzamelingen van de spannendste pornovideo’s. |Installeer een VPN om door te gaan|.', 'VPN installeren'],
  ro: ['Atenție', 'Țara ta blochează colecțiile celor mai incitante videoclipuri porno. |Instalează un VPN pentru a continua|.', 'Instalează VPN']
};

function matchLocale(value) {
  const normalized = String(value).toLowerCase().replace('_', '-');
  const exact = Object.keys(translations).find((key) => key.toLowerCase() === normalized);
  if (exact) return exact;
  const base = normalized.split('-')[0];
  return Object.keys(translations).find((key) => key.toLowerCase() === base) || null;
}

function resolveLocale() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang') || params.get('locale');
  if (requested) {
    const matched = matchLocale(requested);
    if (matched) return matched;
  }
  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const value of browserLocales) {
    const matched = matchLocale(value);
    if (matched) return matched;
  }
  return 'en';
}

const landing = document.querySelector('.landing');
const dialog = document.querySelector('.dialog');
const description = document.querySelector('#dialog-description');
const button = document.querySelector('.install-button');
const locale = resolveLocale();
const [attention, message, installVpn] = translations[locale];

function applyTranslations() {
  document.documentElement.lang = locale;
  document.querySelector('#dialog-title').textContent = attention;
  const [before, strong, after] = message.split('|');
  description.replaceChildren(
    document.createTextNode(before),
    Object.assign(document.createElement('strong'), { textContent: strong }),
    document.createTextNode(after)
  );
  button.textContent = installVpn;
  document.querySelector('.screen-offer').setAttribute('aria-label', installVpn);
}

function fitCopy() {
  const available = button.getBoundingClientRect().top - description.getBoundingClientRect().top - 10;
  for (let size = 20; size >= 13; size--) {
    dialog.style.setProperty('--copy-size', `${size}px`);
    dialog.style.setProperty('--copy-line', `${Math.round(size * 1.2)}px`);
    if (description.getBoundingClientRect().height <= available) break;
  }
  for (let size = 22; size >= 14; size--) {
    dialog.style.setProperty('--button-size', `${size}px`);
    if (button.scrollWidth <= button.clientWidth && button.scrollHeight <= button.clientHeight) break;
  }
}

function syncViewport() {
  const height = window.visualViewport?.height || window.innerHeight;
  landing.style.setProperty('--viewport-height', `${height}px`);
  landing.style.setProperty('--design-scale', Math.max(landing.clientWidth / 402, height / 874));
  fitCopy();
}

applyTranslations();
syncViewport();
window.addEventListener('resize', syncViewport, { passive: true });
window.visualViewport?.addEventListener('resize', syncViewport, { passive: true });
document.fonts?.ready.then(syncViewport);
window.addEventListener('pageshow', syncViewport);
