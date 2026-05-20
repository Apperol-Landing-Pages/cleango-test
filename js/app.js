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
      following: "Following",
      forYou: "For You",
      caption: "Locked in a house together .... TikTok time #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Start Free Video Chat",
      online: "Girls Online"
    },
    fr: {
      following: "Abonnements",
      forYou: "Pour toi",
      caption: "Enfermes ensemble .... moment TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Demarrer le chat video gratuit",
      online: "Filles en ligne"
    },
    "pt-PT": {
      following: "A seguir",
      forYou: "Para ti",
      caption: "Presos em casa juntos .... tempo TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Iniciar chat de video gratis",
      online: "Mulheres online"
    },
    "pt-BR": {
      following: "Seguindo",
      forYou: "Para voce",
      caption: "Trancados em casa juntos .... hora do TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Iniciar videochat gratis",
      online: "Garotas online"
    },
    es: {
      following: "Siguiendo",
      forYou: "Para ti",
      caption: "Encerrados juntos .... tiempo de TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Iniciar videochat gratis",
      online: "Chicas en linea"
    },
    "es-419": {
      following: "Siguiendo",
      forYou: "Para ti",
      caption: "Encerrados juntos .... tiempo de TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Iniciar videochat gratis",
      online: "Chicas en linea"
    },
    da: {
      following: "Folger",
      forYou: "Til dig",
      caption: "Lukket inde sammen .... TikTok tid #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Start gratis videochat",
      online: "Piger online"
    },
    ja: {
      following: "フォロー中",
      forYou: "おすすめ",
      caption: "一緒に家で過ごす .... TikTok time #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "無料ビデオチャット開始",
      online: "Girls Online"
    },
    fil: {
      following: "Following",
      forYou: "Para sa iyo",
      caption: "Magkasama sa bahay .... TikTok time #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Simulan ang free video chat",
      online: "Girls online"
    },
    de: {
      following: "Folge ich",
      forYou: "Fur dich",
      caption: "Zusammen im Haus .... TikTok Zeit #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Gratis Videochat starten",
      online: "Frauen online"
    },
    nb: {
      following: "Folger",
      forYou: "For deg",
      caption: "Stengt inne sammen .... TikTok tid #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Start gratis videochat",
      online: "Jenter online"
    },
    sv: {
      following: "Foljer",
      forYou: "For dig",
      caption: "Instangda tillsammans .... TikTok tid #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Starta gratis videochatt",
      online: "Tjejer online"
    },
    it: {
      following: "Seguiti",
      forYou: "Per te",
      caption: "Chiusi in casa insieme .... tempo TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Avvia videochat gratis",
      online: "Ragazze online"
    },
    nl: {
      following: "Volgend",
      forYou: "Voor jou",
      caption: "Samen opgesloten .... TikTok tijd #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Start gratis videochat",
      online: "Meiden online"
    },
    ro: {
      following: "Urmaresti",
      forYou: "Pentru tine",
      caption: "Blocati impreuna in casa .... timp TikTok #fyp #quarantine",
      track: "Cheryl - @Yung Gravy",
      cta: "Incepe videochat gratuit",
      online: "Fete online"
    }
  };

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
    document.title = copy.cta;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (copy[key]) {
        element.textContent = copy[key];
      }
    });
  }

  function animateOnlineCount() {
    const counter = document.querySelector("[data-online-count]");

    if (!counter) {
      return;
    }

    const base = 17321;
    const next = base + Math.floor(Math.random() * 80);
    counter.textContent = next.toLocaleString("en-US");
  }

  function initBackgroundVideo() {
    const video = document.querySelector(".reel-video");

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
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

    tryPlay();
    window.setTimeout(tryBlobFallback, 1200);
    video.addEventListener("error", tryBlobFallback, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });
  }

  function initOfferRedirect() {
    const reel = document.querySelector(".reel");

    if (!reel) {
      return;
    }

    reel.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (link) {
        return;
      }

      window.location.href = "{offer}";
    });
  }

  function init() {
    localizePage();
    animateOnlineCount();
    initBackgroundVideo();
    initOfferRedirect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
