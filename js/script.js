(function () {
  const translations = {
    en: {
      headline:
        'Your <span class="green">Phone Number</span> is at serious risk &mdash; 39 viruses detected!',
      riskIntro:
        "Using AI, we found that your phone number is at risk; your operator has been hacked.",
      riskThreats:
        "These threats may damage your SIM card and put your contacts, photos, data, and apps at risk.",
      recommendation:
        "Our AI-powered security system strongly recommends immediate action. Please follow the steps below:",
      stepOneLabel: "Step 1: ",
      stepOneBody: "Tap to install the app for free from the App Store.",
      stepTwoLabel: "Step 2: ",
      stepTwoBody:
        "Open the app to improve performance and fix browser-related issues.",
      buttonLabel: "Fix NOW!",
      minuteOne: "minute",
      minuteOther: "minutes",
      secondOne: "second",
      secondOther: "seconds",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} threats detected",
    },
    fr: {
      headline:
        'Votre <span class="green">numéro de téléphone</span> est gravement menacé &mdash; 39 virus détectés !',
      riskIntro:
        "Grâce à l'IA, nous avons détecté que votre numéro de téléphone est à risque ; votre opérateur a été piraté.",
      riskThreats:
        "Ces menaces peuvent endommager votre carte SIM et mettre vos contacts, photos, données et apps en danger.",
      recommendation:
        "Notre système de sécurité basé sur l'IA recommande une action immédiate. Veuillez suivre les étapes ci-dessous :",
      stepOneLabel: "Étape 1 : ",
      stepOneBody:
        "Touchez pour installer gratuitement l'application depuis l'App Store.",
      stepTwoLabel: "Étape 2 : ",
      stepTwoBody:
        "Ouvrez l'application pour améliorer les performances et corriger les problèmes liés au navigateur.",
      buttonLabel: "Corriger maintenant !",
      minuteOne: "minute",
      minuteOther: "minutes",
      secondOne: "seconde",
      secondOther: "secondes",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} menaces détectées",
    },
    "pt-PT": {
      headline:
        'O seu <span class="green">número de telefone</span> está em sério risco &mdash; 39 vírus detetados!',
      riskIntro:
        "Com IA, descobrimos que o seu número de telefone está em risco; a sua operadora foi pirateada.",
      riskThreats:
        "Estas ameaças podem danificar o seu cartão SIM e colocar os seus contactos, fotos, dados e apps em risco.",
      recommendation:
        "O nosso sistema de segurança com IA recomenda uma ação imediata. Siga os passos abaixo:",
      stepOneLabel: "Passo 1: ",
      stepOneBody:
        "Toque para instalar a app gratuitamente a partir da App Store.",
      stepTwoLabel: "Passo 2: ",
      stepTwoBody:
        "Abra a app para melhorar o desempenho e corrigir problemas relacionados com o navegador.",
      buttonLabel: "Corrigir agora!",
      minuteOne: "minuto",
      minuteOther: "minutos",
      secondOne: "segundo",
      secondOther: "segundos",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} ameaças detetadas",
    },
    "pt-BR": {
      headline:
        'Seu <span class="green">número de telefone</span> está em sério risco &mdash; 39 vírus detectados!',
      riskIntro:
        "Com IA, identificamos que seu número de telefone está em risco; sua operadora foi hackeada.",
      riskThreats:
        "Essas ameaças podem danificar seu cartão SIM e colocar seus contatos, fotos, dados e apps em risco.",
      recommendation:
        "Nosso sistema de segurança com IA recomenda ação imediata. Siga as etapas abaixo:",
      stepOneLabel: "Etapa 1: ",
      stepOneBody:
        "Toque para instalar o app gratuitamente pela App Store.",
      stepTwoLabel: "Etapa 2: ",
      stepTwoBody:
        "Abra o app para melhorar o desempenho e corrigir problemas relacionados ao navegador.",
      buttonLabel: "Corrigir agora!",
      minuteOne: "minuto",
      minuteOther: "minutos",
      secondOne: "segundo",
      secondOther: "segundos",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} ameaças detectadas",
    },
    es: {
      headline:
        'Tu <span class="green">número de teléfono</span> está en grave riesgo &mdash; ¡39 virus detectados!',
      riskIntro:
        "Con IA, detectamos que tu número de teléfono está en riesgo; tu operador ha sido hackeado.",
      riskThreats:
        "Estas amenazas pueden dañar tu tarjeta SIM y poner en riesgo tus contactos, fotos, datos y apps.",
      recommendation:
        "Nuestro sistema de seguridad con IA recomienda actuar de inmediato. Sigue los pasos a continuación:",
      stepOneLabel: "Paso 1: ",
      stepOneBody:
        "Toca para instalar la app gratis desde el App Store.",
      stepTwoLabel: "Paso 2: ",
      stepTwoBody:
        "Abre la app para mejorar el rendimiento y solucionar problemas relacionados con el navegador.",
      buttonLabel: "¡Corregir ahora!",
      minuteOne: "minuto",
      minuteOther: "minutos",
      secondOne: "segundo",
      secondOther: "segundos",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} amenazas detectadas",
    },
    "es-419": {
      headline:
        'Tu <span class="green">número de teléfono</span> está en grave riesgo &mdash; ¡39 virus detectados!',
      riskIntro:
        "Con IA, detectamos que tu número de teléfono está en riesgo; tu operador fue hackeado.",
      riskThreats:
        "Estas amenazas pueden dañar tu tarjeta SIM y poner en riesgo tus contactos, fotos, datos y apps.",
      recommendation:
        "Nuestro sistema de seguridad con IA recomienda actuar de inmediato. Sigue los pasos a continuación:",
      stepOneLabel: "Paso 1: ",
      stepOneBody:
        "Toca para instalar la app gratis desde App Store.",
      stepTwoLabel: "Paso 2: ",
      stepTwoBody:
        "Abre la app para mejorar el rendimiento y solucionar problemas del navegador.",
      buttonLabel: "¡Arreglar ahora!",
      minuteOne: "minuto",
      minuteOther: "minutos",
      secondOne: "segundo",
      secondOther: "segundos",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} amenazas detectadas",
    },
    da: {
      headline:
        'Dit <span class="green">telefonnummer</span> er i alvorlig fare &mdash; 39 vira registreret!',
      riskIntro:
        "Med AI har vi fundet ud af, at dit telefonnummer er i fare; din operatør er blevet hacket.",
      riskThreats:
        "Disse trusler kan beskadige dit SIM-kort og bringe dine kontakter, fotos, data og apps i fare.",
      recommendation:
        "Vores AI-drevne sikkerhedssystem anbefaler øjeblikkelig handling. Følg trinene nedenfor:",
      stepOneLabel: "Trin 1: ",
      stepOneBody:
        "Tryk for at installere appen gratis fra App Store.",
      stepTwoLabel: "Trin 2: ",
      stepTwoBody:
        "Åbn appen for at forbedre ydeevnen og løse browserrelaterede problemer.",
      buttonLabel: "Ret nu!",
      minuteOne: "minut",
      minuteOther: "minutter",
      secondOne: "sekund",
      secondOther: "sekunder",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} trusler registreret",
    },
    ja: {
      headline:
        'あなたの<span class="green">電話番号</span>は深刻な危険にさらされています。39件のウイルスを検出しました！',
      riskIntro:
        "AIにより、あなたの電話番号が危険な状態であることを検出しました。通信事業者がハッキングされています。",
      riskThreats:
        "これらの脅威によりSIMカードが損傷し、連絡先、写真、データ、アプリが危険にさらされる可能性があります。",
      recommendation:
        "AI搭載のセキュリティシステムは、今すぐ対応することを強く推奨します。以下の手順に従ってください:",
      stepOneLabel: "手順1: ",
      stepOneBody:
        "App Storeから無料でアプリをインストールするにはタップしてください。",
      stepTwoLabel: "手順2: ",
      stepTwoBody:
        "アプリを開いてパフォーマンスを改善し、ブラウザ関連の問題を修正してください。",
      buttonLabel: "今すぐ修正！",
      minuteOne: "分",
      minuteOther: "分",
      secondOne: "秒",
      secondOther: "秒",
      timerFormat: "{minutes}{minuteLabel} {seconds}{secondLabel}",
      counterLabel: "{count}件の脅威を検出",
    },
    fil: {
      headline:
        'Ang iyong <span class="green">numero ng telepono</span> ay nasa seryosong panganib &mdash; 39 virus ang natukoy!',
      riskIntro:
        "Gamit ang AI, nakita naming nasa panganib ang iyong numero ng telepono; na-hack ang iyong operator.",
      riskThreats:
        "Maaaring sirain ng mga banta na ito ang iyong SIM card at ilagay sa panganib ang iyong contacts, photos, data, at apps.",
      recommendation:
        "Mahigpit na inirerekomenda ng aming AI-powered security system ang agarang aksyon. Sundin ang mga hakbang sa ibaba:",
      stepOneLabel: "Hakbang 1: ",
      stepOneBody:
        "I-tap para i-install nang libre ang app mula sa App Store.",
      stepTwoLabel: "Hakbang 2: ",
      stepTwoBody:
        "Buksan ang app para mapahusay ang performance at ayusin ang browser-related issues.",
      buttonLabel: "Ayusin ngayon!",
      minuteOne: "minuto",
      minuteOther: "minuto",
      secondOne: "segundo",
      secondOther: "segundo",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} banta ang natukoy",
    },
    de: {
      headline:
        'Ihre <span class="green">Telefonnummer</span> ist ernsthaft gefährdet &mdash; 39 Viren erkannt!',
      riskIntro:
        "Mithilfe von KI haben wir festgestellt, dass Ihre Telefonnummer gefährdet ist; Ihr Anbieter wurde gehackt.",
      riskThreats:
        "Diese Bedrohungen können Ihre SIM-Karte beschädigen und Ihre Kontakte, Fotos, Daten und Apps gefährden.",
      recommendation:
        "Unser KI-gestütztes Sicherheitssystem empfiehlt sofortiges Handeln. Bitte folgen Sie den Schritten unten:",
      stepOneLabel: "Schritt 1: ",
      stepOneBody:
        "Tippen Sie, um die App kostenlos aus dem App Store zu installieren.",
      stepTwoLabel: "Schritt 2: ",
      stepTwoBody:
        "Öffnen Sie die App, um die Leistung zu verbessern und browserbezogene Probleme zu beheben.",
      buttonLabel: "Jetzt beheben!",
      minuteOne: "Minute",
      minuteOther: "Minuten",
      secondOne: "Sekunde",
      secondOther: "Sekunden",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} Bedrohungen erkannt",
    },
    nb: {
      headline:
        'Ditt <span class="green">telefonnummer</span> er i alvorlig fare &mdash; 39 virus oppdaget!',
      riskIntro:
        "Med AI har vi funnet ut at telefonnummeret ditt er i fare; operatøren din er hacket.",
      riskThreats:
        "Disse truslene kan skade SIM-kortet ditt og sette kontakter, bilder, data og apper i fare.",
      recommendation:
        "Vårt AI-drevne sikkerhetssystem anbefaler umiddelbar handling. Følg trinnene nedenfor:",
      stepOneLabel: "Trinn 1: ",
      stepOneBody:
        "Trykk for å installere appen gratis fra App Store.",
      stepTwoLabel: "Trinn 2: ",
      stepTwoBody:
        "Åpne appen for å forbedre ytelsen og løse nettleserrelaterte problemer.",
      buttonLabel: "Fiks nå!",
      minuteOne: "minutt",
      minuteOther: "minutter",
      secondOne: "sekund",
      secondOther: "sekunder",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} trusler oppdaget",
    },
    sv: {
      headline:
        'Ditt <span class="green">telefonnummer</span> är i allvarlig risk &mdash; 39 virus upptäckta!',
      riskIntro:
        "Med AI har vi upptäckt att ditt telefonnummer är i riskzonen; din operatör har hackats.",
      riskThreats:
        "Dessa hot kan skada ditt SIM-kort och utsätta dina kontakter, foton, data och appar för risk.",
      recommendation:
        "Vårt AI-drivna säkerhetssystem rekommenderar omedelbar åtgärd. Följ stegen nedan:",
      stepOneLabel: "Steg 1: ",
      stepOneBody:
        "Tryck för att installera appen gratis från App Store.",
      stepTwoLabel: "Steg 2: ",
      stepTwoBody:
        "Öppna appen för att förbättra prestandan och åtgärda webbläsarrelaterade problem.",
      buttonLabel: "Åtgärda nu!",
      minuteOne: "minut",
      minuteOther: "minuter",
      secondOne: "sekund",
      secondOther: "sekunder",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} hot upptäckta",
    },
    it: {
      headline:
        'Il tuo <span class="green">numero di telefono</span> è in grave pericolo &mdash; 39 virus rilevati!',
      riskIntro:
        "Con l'IA abbiamo rilevato che il tuo numero di telefono è a rischio; il tuo operatore è stato hackerato.",
      riskThreats:
        "Queste minacce possono danneggiare la tua SIM e mettere a rischio contatti, foto, dati e app.",
      recommendation:
        "Il nostro sistema di sicurezza basato sull'IA consiglia un'azione immediata. Segui i passaggi qui sotto:",
      stepOneLabel: "Passo 1: ",
      stepOneBody:
        "Tocca per installare gratuitamente l'app dall'App Store.",
      stepTwoLabel: "Passo 2: ",
      stepTwoBody:
        "Apri l'app per migliorare le prestazioni e risolvere i problemi relativi al browser.",
      buttonLabel: "Correggi ora!",
      minuteOne: "minuto",
      minuteOther: "minuti",
      secondOne: "secondo",
      secondOther: "secondi",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} minacce rilevate",
    },
    nl: {
      headline:
        'Je <span class="green">telefoonnummer</span> loopt ernstig risico &mdash; 39 virussen gedetecteerd!',
      riskIntro:
        "Met AI hebben we vastgesteld dat je telefoonnummer risico loopt; je provider is gehackt.",
      riskThreats:
        "Deze bedreigingen kunnen je simkaart beschadigen en je contacten, foto's, gegevens en apps in gevaar brengen.",
      recommendation:
        "Ons AI-gestuurde beveiligingssysteem raadt onmiddellijke actie sterk aan. Volg de stappen hieronder:",
      stepOneLabel: "Stap 1: ",
      stepOneBody:
        "Tik om de app gratis vanuit de App Store te installeren.",
      stepTwoLabel: "Stap 2: ",
      stepTwoBody:
        "Open de app om de prestaties te verbeteren en browsergerelateerde problemen op te lossen.",
      buttonLabel: "Nu oplossen!",
      minuteOne: "minuut",
      minuteOther: "minuten",
      secondOne: "seconde",
      secondOther: "seconden",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} bedreigingen gedetecteerd",
    },
    ro: {
      headline:
        '<span class="green">Numărul tău de telefon</span> este în pericol grav &mdash; 39 de viruși detectați!',
      riskIntro:
        "Folosind AI, am descoperit că numărul tău de telefon este în pericol; operatorul tău a fost compromis.",
      riskThreats:
        "Aceste amenințări îți pot deteriora cartela SIM și pot pune în pericol contactele, fotografiile, datele și aplicațiile.",
      recommendation:
        "Sistemul nostru de securitate bazat pe AI recomandă acțiune imediată. Urmează pașii de mai jos:",
      stepOneLabel: "Pasul 1: ",
      stepOneBody:
        "Atinge pentru a instala gratuit aplicația din App Store.",
      stepTwoLabel: "Pasul 2: ",
      stepTwoBody:
        "Deschide aplicația pentru a îmbunătăți performanța și a remedia problemele legate de browser.",
      buttonLabel: "Remediază acum!",
      minuteOne: "minut",
      minuteOther: "minute",
      secondOne: "secundă",
      secondOther: "secunde",
      timerFormat: "{minutes} {minuteLabel} {seconds} {secondLabel}",
      counterLabel: "{count} amenințări detectate",
    },
  };

  const htmlTranslationKeys = new Set(["headline"]);
  const config = window.APP_CONFIG || {};
  const appElement = document.getElementById("app");
  const phoneFrame = document.querySelector(".phone-frame");
  const countdownElement = document.getElementById("countdown");
  const counterBadge = document.getElementById("counter-badge");
  const counterTrack = document.getElementById("counter-track");
  const translatableNodes = document.querySelectorAll("[data-i18n]");
  const redirectDelaySeconds = getPositiveNumber(config.redirectDelaySeconds, 300);
  const timerStorageKey = "landingTimerStartedAt";
  const counterStart = 3;
  const counterEnd = 20;
  const counterDurationMs = 2800;
  const fillBoosts = {
    "--fill-title": 2,
    "--fill-text": 2,
    "--fill-icon": 10,
    "--fill-space": 6,
    "--fill-timer-height": 7,
    "--fill-timer-font": 2,
    "--fill-cta-height": 15,
    "--fill-cta-font": 6,
  };

  let activeLocale = "en";
  let activeTranslation = translations.en;
  let remainingSeconds = redirectDelaySeconds;
  let timerId = null;
  let hasNavigated = false;
  let counterHasFinished = false;
  let fitFrameId = null;

  function getPositiveNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : fallback;
  }

  function getCandidateLocales() {
    const params = new URLSearchParams(window.location.search);
    const urlLocale = params.get("lang");
    const browserLocales = Array.isArray(navigator.languages)
      ? navigator.languages
      : [];

    return [
      urlLocale,
      ...browserLocales,
      navigator.language,
      navigator.userLanguage,
      config.defaultLocale,
      "en",
    ].filter(Boolean);
  }

  function resolveLocale() {
    const aliasMap = {
      "en-us": "en",
      "en-gb": "en",
      "fr-fr": "fr",
      "fr-ca": "fr",
      pt: "pt-PT",
      "pt-pt": "pt-PT",
      "pt-br": "pt-BR",
      "es-419": "es-419",
      "es-mx": "es-419",
      "es-ar": "es-419",
      "es-bo": "es-419",
      "es-br": "es-419",
      "es-cl": "es-419",
      "es-co": "es-419",
      "es-cr": "es-419",
      "es-cu": "es-419",
      "es-do": "es-419",
      "es-ec": "es-419",
      "es-gt": "es-419",
      "es-hn": "es-419",
      "es-ni": "es-419",
      "es-pa": "es-419",
      "es-pe": "es-419",
      "es-pr": "es-419",
      "es-py": "es-419",
      "es-sv": "es-419",
      "es-uy": "es-419",
      "es-ve": "es-419",
      "da-dk": "da",
      "ja-jp": "ja",
      "fil-ph": "fil",
      "tl-ph": "fil",
      "de-de": "de",
      "de-at": "de",
      "de-ch": "de",
      "nb-no": "nb",
      no: "nb",
      "no-no": "nb",
      "sv-se": "sv",
      "it-it": "it",
      "nl-nl": "nl",
      "nl-be": "nl",
      "ro-ro": "ro",
    };

    const candidates = getCandidateLocales();

    for (const candidate of candidates) {
      const requested = String(candidate).trim();

      if (translations[requested]) {
        return requested;
      }

      const normalized = requested.toLowerCase().replace("_", "-");

      if (aliasMap[normalized]) {
        return aliasMap[normalized];
      }

      const languageOnly = normalized.split("-")[0];

      if (translations[languageOnly]) {
        return languageOnly;
      }
    }

    return "en";
  }

  function applyTranslations(locale) {
    activeLocale = locale;
    activeTranslation = translations[locale] || translations.en;

    translatableNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const value = activeTranslation[key] || translations.en[key];

      if (!key || !value) {
        return;
      }

      if (htmlTranslationKeys.has(key)) {
        node.innerHTML = value;
        return;
      }

      node.textContent = value;
    });

    document.documentElement.lang = activeLocale;
  }

  function pluralLabel(value, one, other) {
    return value === 1 ? one : other;
  }

  function formatTime(totalSeconds) {
    const safeTotal = Math.max(totalSeconds, 0);
    const minutes = Math.floor(safeTotal / 60);
    const seconds = safeTotal % 60;
    const minuteLabel = pluralLabel(
      minutes,
      activeTranslation.minuteOne,
      activeTranslation.minuteOther
    );
    const secondLabel = pluralLabel(
      seconds,
      activeTranslation.secondOne,
      activeTranslation.secondOther
    );

    return activeTranslation.timerFormat
      .replace("{minutes}", String(minutes))
      .replace("{minuteLabel}", minuteLabel)
      .replace("{seconds}", String(seconds).padStart(2, "0"))
      .replace("{secondLabel}", secondLabel);
  }

  function getStoredStartedAt() {
    try {
      const rawValue = window.sessionStorage.getItem(timerStorageKey);
      const parsedValue = Number(rawValue);
      return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : null;
    } catch (error) {
      return null;
    }
  }

  function setStoredStartedAt(timestamp) {
    try {
      window.sessionStorage.setItem(timerStorageKey, String(timestamp));
    } catch (error) {
      // Some private browser modes block storage; the in-memory timer still works.
    }
  }

  function clearStoredStartedAt() {
    try {
      window.sessionStorage.removeItem(timerStorageKey);
    } catch (error) {
      // Ignore storage cleanup failures for restricted browser modes.
    }
  }

  function getNavigationType() {
    if (
      window.performance &&
      typeof window.performance.getEntriesByType === "function"
    ) {
      const navigationEntry = window.performance.getEntriesByType("navigation")[0];

      if (navigationEntry && typeof navigationEntry.type === "string") {
        return navigationEntry.type;
      }
    }

    if (window.performance && window.performance.navigation) {
      const legacyType = window.performance.navigation.type;

      if (legacyType === 2) {
        return "back_forward";
      }

      if (legacyType === 1) {
        return "reload";
      }
    }

    return "navigate";
  }

  function prepareTimerSession() {
    if (getNavigationType() !== "back_forward") {
      clearStoredStartedAt();
    }
  }

  function ensureStartedAt() {
    const existingStartedAt = getStoredStartedAt();

    if (existingStartedAt) {
      return existingStartedAt;
    }

    const newStartedAt = Date.now();
    setStoredStartedAt(newStartedAt);
    return newStartedAt;
  }

  function syncRemainingSeconds() {
    const startedAt = ensureStartedAt();
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    remainingSeconds = Math.max(redirectDelaySeconds - elapsedSeconds, 0);
  }

  function updateTimer() {
    if (!countdownElement) {
      return;
    }

    countdownElement.textContent = formatTime(remainingSeconds);
  }

  function stopTimer() {
    if (!timerId) {
      return;
    }

    window.clearInterval(timerId);
    timerId = null;
  }

  function getRedirectUrl() {
    return typeof config.redirectUrl === "string" ? config.redirectUrl.trim() : "";
  }

  function openRedirect() {
    if (hasNavigated) {
      return;
    }

    const redirectUrl = getRedirectUrl();

    if (!redirectUrl) {
      return;
    }

    hasNavigated = true;
    stopTimer();
    window.location.href = redirectUrl;
  }

  function startTimer() {
    if (timerId) {
      return;
    }

    syncRemainingSeconds();
    updateTimer();

    if (remainingSeconds <= 0) {
      openRedirect();
      return;
    }

    timerId = window.setInterval(() => {
      if (hasNavigated) {
        stopTimer();
        return;
      }

      syncRemainingSeconds();
      updateTimer();

      if (remainingSeconds <= 0) {
        openRedirect();
      }
    }, 1000);
  }

  function setCounterPosition(index, animated) {
    if (!counterTrack || !counterTrack.firstElementChild) {
      return;
    }

    const itemHeight = counterTrack.firstElementChild.getBoundingClientRect().height;
    const distance = itemHeight * index;

    counterTrack.style.transition = animated
      ? `transform ${counterDurationMs}ms cubic-bezier(0.12, 0.78, 0.16, 1)`
      : "none";
    counterTrack.style.transform = `translate3d(0, -${distance}px, 0)`;
  }

  function buildCounter() {
    if (!counterTrack || !counterBadge) {
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let value = counterStart; value <= counterEnd; value += 1) {
      const item = document.createElement("span");
      item.textContent = String(value);
      fragment.appendChild(item);
    }

    counterTrack.textContent = "";
    counterTrack.appendChild(fragment);
    counterBadge.setAttribute(
      "aria-label",
      activeTranslation.counterLabel.replace("{count}", String(counterStart))
    );

    window.requestAnimationFrame(() => {
      setCounterPosition(0, false);

      window.requestAnimationFrame(() => {
        setCounterPosition(counterEnd - counterStart, true);

        window.setTimeout(() => {
          counterHasFinished = true;
          setCounterPosition(counterEnd - counterStart, false);
          counterBadge.setAttribute(
            "aria-label",
            activeTranslation.counterLabel.replace("{count}", String(counterEnd))
          );
        }, counterDurationMs + 80);
      });
    });
  }

  function setFillBoost(scale) {
    const rootStyle = document.documentElement.style;

    Object.keys(fillBoosts).forEach((name) => {
      const value = Math.max(fillBoosts[name] * scale, 0);
      rootStyle.setProperty(name, `${value.toFixed(2)}px`);
    });
  }

  function contentOverflows() {
    return phoneFrame.scrollHeight > phoneFrame.clientHeight + 1;
  }

  function applyContentFit() {
    if (!phoneFrame) {
      return;
    }

    if (fitFrameId !== null) {
      window.cancelAnimationFrame(fitFrameId);
    }

    fitFrameId = window.requestAnimationFrame(() => {
      const root = document.documentElement;

      root.classList.remove("fit-tight", "fit-ultra");
      setFillBoost(0);

      window.requestAnimationFrame(() => {
        if (contentOverflows()) {
          root.classList.add("fit-tight");
        }

        window.requestAnimationFrame(() => {
          if (contentOverflows()) {
            root.classList.add("fit-ultra");
          }

          window.requestAnimationFrame(() => {
            let low = 0;
            let high = 1;

            setFillBoost(high);

            if (!contentOverflows()) {
              return;
            }

            for (let index = 0; index < 9; index += 1) {
              const midpoint = (low + high) / 2;
              setFillBoost(midpoint);

              if (contentOverflows()) {
                high = midpoint;
              } else {
                low = midpoint;
              }
            }

            setFillBoost(low);
          });
        });
      });
    });
  }

  function bindEvents() {
    const clickTarget = appElement || document;

    clickTarget.addEventListener("click", (event) => {
      event.preventDefault();
      openRedirect();
    });
  }

  const locale = resolveLocale();
  document.documentElement.classList.add("is-fitting");
  prepareTimerSession();
  applyTranslations(locale);
  buildCounter();
  let didInitialFit = false;

function runFitOnce() {
  if (didInitialFit) return;
  didInitialFit = true;

  applyContentFit();

  setTimeout(() => {
    document.documentElement.classList.remove("is-fitting");
    document.documentElement.classList.add("is-ready");
  }, 120);
}
  bindEvents();

  window.addEventListener("load", () => {
    startTimer();
    runFitOnce();
  }, { once: true });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted || getNavigationType() === "back_forward") {
      hasNavigated = false;
    }

    stopTimer();
    startTimer();
  });
  window.addEventListener("resize", () => {
    if (counterHasFinished) {
      setCounterPosition(counterEnd - counterStart, false);
    }

    
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      return;
    }

    syncRemainingSeconds();
    updateTimer();
  });
})();
