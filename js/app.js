(function () {
  const supportedLocales = [
    "en",
    "fr",
    "pt-PT",
    "pt-BR",
    "es",
    "es-419",
    "da",
    "ja",
    "fil",
    "de",
    "nb",
    "sv",
    "it",
    "nl",
    "ro"
  ];

  const latinAmericaRegions = new Set([
    "AR",
    "BO",
    "BR",
    "BZ",
    "CL",
    "CO",
    "CR",
    "CU",
    "DO",
    "EC",
    "GT",
    "HN",
    "MX",
    "NI",
    "PA",
    "PE",
    "PR",
    "PY",
    "SV",
    "UY",
    "VE"
  ]);

  const translations = {
    en: {
      title: "Real women. Real attention. Right now.",
      subtitle: "Select your favorite:",
      live: "Live",
      select: "Select",
      cta: "Match With Someone Else",
      installAria: "Install the app",
      installTitle: "Install App",
      installSubtitle: "To chat with girls 18+, download the app",
      incomingCallAria: "Incoming call",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Calling you...",
      declineCallAria: "Decline call",
      acceptCallAria: "Accept call"
    },
    fr: {
      title: "De vraies femmes. Une vraie attention. Maintenant.",
      subtitle: "Choisissez votre favorite :",
      live: "En direct",
      select: "Choisir",
      cta: "Rencontrer quelqu'un d'autre",
      installAria: "Installer l'app",
      installTitle: "Installer l'app",
      installSubtitle: "Pour discuter avec des filles 18+, telechargez l'app",
      incomingCallAria: "Appel entrant",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Vous appelle...",
      declineCallAria: "Refuser l'appel",
      acceptCallAria: "Accepter l'appel"
    },
    "pt-PT": {
      title: "Mulheres reais. Atenção real. Agora mesmo.",
      subtitle: "Escolhe a tua favorita:",
      live: "Ao vivo",
      select: "Escolher",
      cta: "Combinar com outra pessoa",
      installAria: "Instalar a app",
      installTitle: "Instalar app",
      installSubtitle: "Para conversar com mulheres 18+, transfere a app",
      incomingCallAria: "Chamada recebida",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "A ligar-te...",
      declineCallAria: "Recusar chamada",
      acceptCallAria: "Atender chamada"
    },
    "pt-BR": {
      title: "Mulheres reais. Atenção real. Agora mesmo.",
      subtitle: "Escolha sua favorita:",
      live: "Ao vivo",
      select: "Escolher",
      cta: "Dar match com outra pessoa",
      installAria: "Instalar o app",
      installTitle: "Instalar app",
      installSubtitle: "Para conversar com mulheres 18+, baixe o app",
      incomingCallAria: "Chamada recebida",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Ligando para voce...",
      declineCallAria: "Recusar chamada",
      acceptCallAria: "Atender chamada"
    },
    es: {
      title: "Mujeres reales. Atención real. Ahora mismo.",
      subtitle: "Elige tu favorita:",
      live: "En vivo",
      select: "Elegir",
      cta: "Conectar con otra persona",
      installAria: "Instalar la app",
      installTitle: "Instalar app",
      installSubtitle: "Para chatear con chicas 18+, descarga la app",
      incomingCallAria: "Llamada entrante",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Te esta llamando...",
      declineCallAria: "Rechazar llamada",
      acceptCallAria: "Aceptar llamada"
    },
    "es-419": {
      title: "Mujeres reales. Atención real. Ahora mismo.",
      subtitle: "Elige tu favorita:",
      live: "En vivo",
      select: "Elegir",
      cta: "Hacer match con otra persona",
      installAria: "Instalar la app",
      installTitle: "Instalar app",
      installSubtitle: "Para chatear con chicas 18+, descarga la app",
      incomingCallAria: "Llamada entrante",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Te esta llamando...",
      declineCallAria: "Rechazar llamada",
      acceptCallAria: "Aceptar llamada"
    },
    da: {
      title: "Ægte kvinder. Ægte opmærksomhed. Lige nu.",
      subtitle: "Vælg din favorit:",
      live: "Live",
      select: "Vælg",
      cta: "Match med en anden",
      installAria: "Installer appen",
      installTitle: "Installer app",
      installSubtitle: "Chat med piger 18+, download appen",
      incomingCallAria: "Indkommende opkald",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Ringer til dig...",
      declineCallAria: "Afvis opkald",
      acceptCallAria: "Besvar opkald"
    },
    ja: {
      title: "リアルな女性。リアルな注目。今すぐ。",
      subtitle: "お気に入りを選択:",
      live: "ライブ",
      select: "選択",
      cta: "別の相手とマッチ",
      installAria: "アプリをインストール",
      installTitle: "アプリをインストール",
      installSubtitle: "18+の女性とチャットするにはアプリをダウンロード",
      incomingCallAria: "着信",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "通話中...",
      declineCallAria: "通話を拒否",
      acceptCallAria: "通話に応答"
    },
    fil: {
      title: "Tunay na babae. Tunay na atensyon. Ngayon na.",
      subtitle: "Piliin ang paborito mo:",
      live: "Live",
      select: "Piliin",
      cta: "Makipag-match sa iba",
      installAria: "I-install ang app",
      installTitle: "Install App",
      installSubtitle: "Para makipag-chat sa girls 18+, i-download ang app",
      incomingCallAria: "Papasok na tawag",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Tumatawag sa iyo...",
      declineCallAria: "Tanggihan ang tawag",
      acceptCallAria: "Sagutin ang tawag"
    },
    de: {
      title: "Echte Frauen. Echte Aufmerksamkeit. Genau jetzt.",
      subtitle: "Wähle deinen Favoriten:",
      live: "Live",
      select: "Auswählen",
      cta: "Mit jemand anderem matchen",
      installAria: "App installieren",
      installTitle: "App installieren",
      installSubtitle: "Um mit Frauen 18+ zu chatten, lade die App herunter",
      incomingCallAria: "Eingehender Anruf",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Ruft dich an...",
      declineCallAria: "Anruf ablehnen",
      acceptCallAria: "Anruf annehmen"
    },
    nb: {
      title: "Ekte kvinner. Ekte oppmerksomhet. Akkurat nå.",
      subtitle: "Velg din favoritt:",
      live: "Direkte",
      select: "Velg",
      cta: "Match med noen andre",
      installAria: "Installer appen",
      installTitle: "Installer app",
      installSubtitle: "For å chatte med jenter 18+, last ned appen",
      incomingCallAria: "Innkommende anrop",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Ringer deg...",
      declineCallAria: "Avvis anrop",
      acceptCallAria: "Svar på anrop"
    },
    sv: {
      title: "Riktiga kvinnor. Riktig uppmärksamhet. Just nu.",
      subtitle: "Välj din favorit:",
      live: "Live",
      select: "Välj",
      cta: "Matcha med någon annan",
      installAria: "Installera appen",
      installTitle: "Installera app",
      installSubtitle: "For att chatta med tjejer 18+, ladda ner appen",
      incomingCallAria: "Inkommande samtal",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Ringer dig...",
      declineCallAria: "Avvisa samtal",
      acceptCallAria: "Svara på samtal"
    },
    it: {
      title: "Donne reali. Attenzione reale. Proprio ora.",
      subtitle: "Scegli la tua preferita:",
      live: "Live",
      select: "Scegli",
      cta: "Abbina con qualcun altro",
      installAria: "Installa l'app",
      installTitle: "Installa app",
      installSubtitle: "Per chattare con ragazze 18+, scarica l'app",
      incomingCallAria: "Chiamata in arrivo",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Ti sta chiamando...",
      declineCallAria: "Rifiuta chiamata",
      acceptCallAria: "Accetta chiamata"
    },
    nl: {
      title: "Echte vrouwen. Echte aandacht. Op dit moment.",
      subtitle: "Kies je favoriet:",
      live: "Live",
      select: "Kies",
      cta: "Match met iemand anders",
      installAria: "Installeer de app",
      installTitle: "App installeren",
      installSubtitle: "Om te chatten met vrouwen 18+, download de app",
      incomingCallAria: "Inkomende oproep",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Belt jou...",
      declineCallAria: "Oproep weigeren",
      acceptCallAria: "Oproep aannemen"
    },
    ro: {
      title: "Femei reale. Atenție reală. Chiar acum.",
      subtitle: "Alege-ți favorita:",
      live: "Live",
      select: "Alege",
      cta: "Potrivește-te cu altcineva",
      installAria: "Instalează aplicația",
      installTitle: "Instalează aplicația",
      installSubtitle: "Pentru chat cu femei 18+, descarcă aplicația",
      incomingCallAria: "Apel primit",
      callerTitle: "Kristi 🍑, 32",
      callerStatus: "Te sună...",
      declineCallAria: "Respinge apelul",
      acceptCallAria: "Acceptă apelul"
    }
  };

  const defaultProfiles = [
    { name: "Melina" },
    { name: "KristiM" },
    { name: "KissGirl" },
    { name: "NakedKate" }
  ];

  const callConfig = {
    delay: 1000,
    videoStartTime: 0
  };
  let callTimer = null;
  let callVideoPlay = null;
  let callVideoFallback = null;

  function normalizeLocale(locale) {
    if (!locale) {
      return "en";
    }

    const cleanLocale = locale.replace("_", "-");
    const parts = cleanLocale.split("-");
    const language = (parts[0] || "").toLowerCase();
    const region = (parts[1] || "").toUpperCase();

    if (language === "pt") {
      return region === "BR" ? "pt-BR" : "pt-PT";
    }

    if (language === "es") {
      return region === "419" || latinAmericaRegions.has(region) ? "es-419" : "es";
    }

    if (language === "no") {
      return "nb";
    }

    if (language === "tl") {
      return "fil";
    }

    return supportedLocales.includes(language) ? language : "en";
  }

  function getLocale() {
    const params = new URLSearchParams(window.location.search);
    const requestedLocale = params.get("lang");

    if (requestedLocale) {
      return normalizeLocale(requestedLocale);
    }

    const browserLocales = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

    for (const locale of browserLocales) {
      const normalized = normalizeLocale(locale);

      if (translations[normalized]) {
        return normalized;
      }
    }

    return "en";
  }

  function localizePage() {
    const locale = getLocale();
    const copy = translations[locale] || translations.en;

    document.documentElement.lang = locale;
    document.title = copy.title;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (copy[key]) {
        element.textContent = copy[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.dataset.i18nAria;

      if (copy[key]) {
        element.setAttribute("aria-label", copy[key]);
      }
    });

    document.querySelectorAll(".profile-card").forEach((card, index) => {
      const profile = defaultProfiles[index] || defaultProfiles[defaultProfiles.length - 1];

      const badge = card.querySelector(".live-badge");
      const name = card.querySelector(".profile-name");
      const image = card.querySelector(".profile-image");

      card.setAttribute("aria-label", `${copy.select} ${profile.name}`);

      if (badge) {
        badge.textContent = copy.live;
      }

      if (name) {
        name.textContent = profile.name;
      }

      if (image) {
        image.alt = profile.name;
      }
    });
  }

  function showCallWindow() {
    const overlay = document.querySelector("[data-call-overlay]");

    if (!overlay || overlay.classList.contains("is-visible")) {
      return;
    }

    overlay.classList.add("is-visible");
    overlay.setAttribute("aria-hidden", "false");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (callVideoPlay) {
          callVideoPlay();
        }

        window.setTimeout(() => {
          if (callVideoFallback) {
            callVideoFallback();
          }
        }, 1200);
      });
    });
  }

  function initCallVideo() {
    const video = document.querySelector(".call-video");

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const startTime = callConfig.videoStartTime;

      if (startTime > 0 && Number.isFinite(video.duration)) {
        video.currentTime = Math.min(startTime, Math.max(video.duration - 0.1, 0));
      }

      const promise = video.play();

      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
      }
    };

    const tryBlobFallback = () => {
      if (video.dataset.blobFallback === "1" || video.readyState >= 2) {
        return;
      }

      video.dataset.blobFallback = "1";

      fetch("./video/reel-background.mp4")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Video fallback failed");
          }

          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          video.src = url;
          video.load();
          tryPlay();
        })
        .catch(() => {});
    };

    callVideoPlay = tryPlay;
    callVideoFallback = tryBlobFallback;

    tryPlay();
    window.setTimeout(tryBlobFallback, 1200);
    video.addEventListener("error", tryBlobFallback, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });
  }

  function scheduleCallWindow() {
    const startTimer = () => {
      if (callTimer) {
        return;
      }

      callTimer = window.setTimeout(showCallWindow, callConfig.delay);
    };

    if (document.readyState === "complete") {
      startTimer();
      return;
    }

    window.addEventListener("load", startTimer, { once: true });
    window.setTimeout(() => {
      if (document.readyState === "complete") {
        startTimer();
      }
    }, 0);
  }

  function init() {
    localizePage();
    initCallVideo();
    scheduleCallWindow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
