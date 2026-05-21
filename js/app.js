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
      pageLabel: "Video chat landing page",
      installAria: "Install the app",
      authAria: "Account actions",
      installTitle: "Install App",
      installSubtitle: "To chat with girls 18+, download the app",
      login: "Log In",
      signUp: "Sign Up",
      cta: "Start Free Video Chat",
      online: "Girls Online"
    },
    fr: {
      pageLabel: "Page de chat video",
      installAria: "Installer l'app",
      authAria: "Actions du compte",
      installTitle: "Installer l'app",
      installSubtitle: "Pour discuter avec des filles 18+, telechargez l'app",
      login: "Connexion",
      signUp: "Inscription",
      cta: "Demarrer le chat video gratuit",
      online: "Filles en ligne"
    },
    "pt-PT": {
      pageLabel: "Pagina de chat de video",
      installAria: "Instalar a app",
      authAria: "Acoes da conta",
      installTitle: "Instalar app",
      installSubtitle: "Para conversar com mulheres 18+, descarrega a app",
      login: "Entrar",
      signUp: "Registar",
      cta: "Iniciar chat de video gratis",
      online: "Mulheres online"
    },
    "pt-BR": {
      pageLabel: "Pagina de videochat",
      installAria: "Instalar o app",
      authAria: "Acoes da conta",
      installTitle: "Instalar app",
      installSubtitle: "Para conversar com garotas 18+, baixe o app",
      login: "Entrar",
      signUp: "Cadastrar",
      cta: "Iniciar videochat gratis",
      online: "Garotas online"
    },
    es: {
      pageLabel: "Pagina de videochat",
      installAria: "Instalar la app",
      authAria: "Acciones de cuenta",
      installTitle: "Instalar app",
      installSubtitle: "Para chatear con chicas 18+, descarga la app",
      login: "Iniciar sesion",
      signUp: "Registrarse",
      cta: "Iniciar videochat gratis",
      online: "Chicas en linea"
    },
    "es-419": {
      pageLabel: "Pagina de videochat",
      installAria: "Instalar la app",
      authAria: "Acciones de cuenta",
      installTitle: "Instalar app",
      installSubtitle: "Para chatear con chicas 18+, descarga la app",
      login: "Iniciar sesion",
      signUp: "Registrarse",
      cta: "Iniciar videochat gratis",
      online: "Chicas en linea"
    },
    da: {
      pageLabel: "Videochat landingside",
      installAria: "Installer appen",
      authAria: "Konto handlinger",
      installTitle: "Installer app",
      installSubtitle: "For at chatte med piger 18+, download appen",
      login: "Log ind",
      signUp: "Tilmeld",
      cta: "Start gratis videochat",
      online: "Piger online"
    },
    ja: {
      pageLabel: "ビデオチャットのランディングページ",
      installAria: "アプリをインストール",
      authAria: "アカウント操作",
      installTitle: "アプリをインストール",
      installSubtitle: "18+の女の子とチャットするにはアプリをダウンロード",
      login: "ログイン",
      signUp: "登録",
      cta: "無料ビデオチャット開始",
      online: "女の子がオンライン"
    },
    fil: {
      pageLabel: "Video chat landing page",
      installAria: "I-install ang app",
      authAria: "Account actions",
      installTitle: "I-install ang app",
      installSubtitle: "Para makipag-chat sa girls 18+, i-download ang app",
      login: "Log In",
      signUp: "Sign Up",
      cta: "Simulan ang free video chat",
      online: "Girls online"
    },
    de: {
      pageLabel: "Videochat Landingpage",
      installAria: "App installieren",
      authAria: "Kontoaktionen",
      installTitle: "App installieren",
      installSubtitle: "Zum Chatten mit Frauen 18+, App herunterladen",
      login: "Einloggen",
      signUp: "Registrieren",
      cta: "Gratis Videochat starten",
      online: "Frauen online"
    },
    nb: {
      pageLabel: "Videochat landingsside",
      installAria: "Installer appen",
      authAria: "Kontohandlinger",
      installTitle: "Installer app",
      installSubtitle: "For a chatte med jenter 18+, last ned appen",
      login: "Logg inn",
      signUp: "Registrer",
      cta: "Start gratis videochat",
      online: "Jenter online"
    },
    sv: {
      pageLabel: "Videochatt landningssida",
      installAria: "Installera appen",
      authAria: "Kontoatgarder",
      installTitle: "Installera appen",
      installSubtitle: "For att chatta med tjejer 18+, ladda ner appen",
      login: "Logga in",
      signUp: "Registrera",
      cta: "Starta gratis videochatt",
      online: "Tjejer online"
    },
    it: {
      pageLabel: "Pagina videochat",
      installAria: "Installa l'app",
      authAria: "Azioni account",
      installTitle: "Installa app",
      installSubtitle: "Per chattare con ragazze 18+, scarica l'app",
      login: "Accedi",
      signUp: "Registrati",
      cta: "Avvia videochat gratis",
      online: "Ragazze online"
    },
    nl: {
      pageLabel: "Videochat landingspagina",
      installAria: "App installeren",
      authAria: "Accountacties",
      installTitle: "App installeren",
      installSubtitle: "Om te chatten met meiden 18+, download de app",
      login: "Inloggen",
      signUp: "Aanmelden",
      cta: "Start gratis videochat",
      online: "Meiden online"
    },
    ro: {
      pageLabel: "Pagina de videochat",
      installAria: "Instaleaza aplicatia",
      authAria: "Actiuni cont",
      installTitle: "Instaleaza aplicatia",
      installSubtitle: "Ca sa discuti cu fete 18+, descarca aplicatia",
      login: "Autentificare",
      signUp: "Inscriere",
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
    const copy = { ...translations.en, ...(translations[locale] || {}) };

    document.documentElement.lang = locale;
    document.title = copy.installTitle;

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
  }

  function fitSingleLineText() {
    const elements = document.querySelectorAll(
      ".app-copy strong, .app-copy span, .auth-link, .online, .cta"
    );

    elements.forEach((element) => {
      element.style.fontSize = "";

      const minSize = element.matches(".app-copy span")
        ? 11
        : element.matches(".auth-link")
          ? 12
          : 14;
      let size = Number.parseFloat(window.getComputedStyle(element).fontSize);

      while (element.scrollWidth > element.clientWidth + 1 && size > minSize) {
        size -= 0.5;
        element.style.fontSize = `${size}px`;
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
    const landing = document.querySelector(".landing");

    if (!landing) {
      return;
    }

    landing.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (link) {
        return;
      }

      window.location.href = "{offer}";
    });
  }

  function init() {
    localizePage();
    fitSingleLineText();
    animateOnlineCount();
    initBackgroundVideo();
    initOfferRedirect();
    window.addEventListener("resize", fitSingleLineText);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
