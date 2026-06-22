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



    let totalSeconds = "60";
    let timerStarted = false;
    let switched = false;
    let intervalId = null;

 const translations = {
  en: {
  top_install_key: "Install VPN",
  video_warning_key: "The video cannot be played!",
  modal_title_key: "The video cannot be played!",
  modal_text_key: 'The video is blocked in your country. To watch the video, click <span class="install-word">"Install"</span> and set up a VPN on your phone.',
  scan_now_option: "Install VPN",
},

fr: {
  top_install_key: "Installer VPN",
  video_warning_key: "La vidéo ne peut pas être lue !",
  modal_title_key: "La vidéo ne peut pas être lue !",
  modal_text_key: 'La vidéo est bloquée dans votre pays. Pour la regarder, cliquez sur <span class="install-word">"Installer"</span> et configurez un VPN sur votre téléphone.',
  scan_now_option: "Installer VPN",
},

"pt-PT": {
  top_install_key: "Instalar VPN",
  video_warning_key: "O vídeo não pode ser reproduzido!",
  modal_title_key: "O vídeo não pode ser reproduzido!",
  modal_text_key: 'O vídeo está bloqueado no seu país. Para assistir, clique em <span class="install-word">"Instalar"</span> e configure uma VPN no seu telefone.',
  scan_now_option: "Instalar VPN",
},

"pt-BR": {
  top_install_key: "Instalar VPN",
  video_warning_key: "O vídeo não pode ser reproduzido!",
  modal_title_key: "O vídeo não pode ser reproduzido!",
  modal_text_key: 'O vídeo está bloqueado no seu país. Para assistir, clique em <span class="install-word">"Instalar"</span> e configure uma VPN no seu telefone.',
  scan_now_option: "Instalar VPN",
},

es: {
  top_install_key: "Instalar VPN",
  video_warning_key: "¡El video no se puede reproducir!",
  modal_title_key: "¡El video no se puede reproducir!",
  modal_text_key: 'El video está bloqueado en tu país. Para verlo, haz clic en <span class="install-word">"Instalar"</span> y configura una VPN en tu teléfono.',
  scan_now_option: "Instalar VPN",
},

"es-419": {
  top_install_key: "Instalar VPN",
  video_warning_key: "¡El video no se puede reproducir!",
  modal_title_key: "¡El video no se puede reproducir!",
  modal_text_key: 'El video está bloqueado en tu país. Para verlo, haz clic en <span class="install-word">"Instalar"</span> y configura una VPN en tu teléfono.',
  scan_now_option: "Instalar VPN",
},

da: {
  top_install_key: "Installer VPN",
  video_warning_key: "Videoen kan ikke afspilles!",
  modal_title_key: "Videoen kan ikke afspilles!",
  modal_text_key: 'Videoen er blokeret i dit land. Klik på <span class="install-word">"Installer"</span>, og opsæt en VPN på din telefon.',
  scan_now_option: "Installer VPN",
},

ja: {
  top_install_key: "VPNをインストール",
  video_warning_key: "動画を再生できません！",
  modal_title_key: "動画を再生できません！",
  modal_text_key: 'この動画はお住まいの国でブロックされています。視聴するには<span class="install-word">「インストール」</span>をクリックし、スマートフォンでVPNを設定してください。',
  scan_now_option: "VPNをインストール",
},

fil: {
  top_install_key: "I-install VPN",
  video_warning_key: "Hindi ma-play ang video!",
  modal_title_key: "Hindi ma-play ang video!",
  modal_text_key: 'Naka-block ang video sa iyong bansa. Para mapanood ito, i-click ang <span class="install-word">"I-install"</span> at mag-set up ng VPN sa iyong phone.',
  scan_now_option: "I-install VPN",
},

de: {
  top_install_key: "VPN installieren",
  video_warning_key: "Das Video kann nicht abgespielt werden!",
  modal_title_key: "Das Video kann nicht abgespielt werden!",
  modal_text_key: 'Das Video ist in Ihrem Land blockiert. Klicken Sie auf <span class="install-word">"Installieren"</span> und richten Sie ein VPN auf Ihrem Telefon ein.',
  scan_now_option: "VPN installieren",
},

nb: {
  top_install_key: "Installer VPN",
  video_warning_key: "Videoen kan ikke spilles av!",
  modal_title_key: "Videoen kan ikke spilles av!",
  modal_text_key: 'Videoen er blokkert i landet ditt. Klikk på <span class="install-word">"Installer"</span> og sett opp en VPN på telefonen.',
  scan_now_option: "Installer VPN",
},

sv: {
  top_install_key: "Installera VPN",
  video_warning_key: "Videon kan inte spelas upp!",
  modal_title_key: "Videon kan inte spelas upp!",
  modal_text_key: 'Videon är blockerad i ditt land. Klicka på <span class="install-word">"Installera"</span> och konfigurera en VPN på din telefon.',
  scan_now_option: "Installera VPN",
},

it: {
  top_install_key: "Installa VPN",
  video_warning_key: "Il video non può essere riprodotto!",
  modal_title_key: "Il video non può essere riprodotto!",
  modal_text_key: 'Il video è bloccato nel tuo Paese. Per guardarlo, fai clic su <span class="install-word">"Installa"</span> e configura una VPN sul telefono.',
  scan_now_option: "Installa VPN",
},

nl: {
  top_install_key: "VPN installeren",
  video_warning_key: "De video kan niet worden afgespeeld!",
  modal_title_key: "De video kan niet worden afgespeeld!",
  modal_text_key: 'De video is geblokkeerd in uw land. Klik op <span class="install-word">"Installeren"</span> en stel een VPN in op uw telefoon.',
  scan_now_option: "VPN installeren",
},

ro: {
  top_install_key: "Instalează VPN",
  video_warning_key: "Videoclipul nu poate fi redat!",
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

  document.getElementById("top_install_key").textContent = t.top_install_key;
  document.getElementById("video_warning_key").textContent = t.video_warning_key;
  document.getElementById("modal_title_key").textContent = t.modal_title_key;
  document.getElementById("modal_text_key").innerHTML = t.modal_text_key;
  document.getElementById("scan_now_option").textContent = t.scan_now_option;




    if (bg) {
        requestAnimationFrame(() => {
            bg.classList.add("active");
        });
    }


(function () {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isChrome = /CriOS/i.test(ua);

  if (isIOS && isChrome) {
    document.body.classList.add('ios-chrome');
  }
})();
});
