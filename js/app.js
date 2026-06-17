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
  modal_title_key: "Your <span class=\"fake-modal__accent\">activity</span> might be visible by your IP address",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Step 1:</span> Install from App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Step 2:</span> Click Connect",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Step 3:</span> Browse Privately",
  modal_text_key: "Watch video privately using a VPN app",
  scan_now_option: "Install",
},

fr: {
  modal_title_key: "Votre <span class=\"fake-modal__accent\">activité</span> peut être visible via votre adresse IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Étape 1 :</span> Installez depuis l’App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Étape 2 :</span> Cliquez sur Connecter",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Étape 3 :</span> Naviguez en privé",
  modal_text_key: "Regardez des vidéos en privé à l’aide d’une application VPN",
  scan_now_option: "Installer",
},

"pt-PT": {
  modal_title_key: "A sua <span class=\"fake-modal__accent\">atividade</span> pode estar visível através do seu endereço IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Passo 1:</span> Instale a partir da App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Passo 2:</span> Clique em Ligar",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Passo 3:</span> Navegue em privado",
  modal_text_key: "Veja vídeos em privado utilizando uma aplicação VPN",
  scan_now_option: "Instalar",
},

"pt-BR": {
  modal_title_key: "Sua <span class=\"fake-modal__accent\">atividade</span> pode estar visível pelo seu endereço IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Passo 1:</span> Instale pela App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Passo 2:</span> Clique em Conectar",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Passo 3:</span> Navegue de forma privada",
  modal_text_key: "Assista a vídeos de forma privada usando um aplicativo VPN",
  scan_now_option: "Instalar",
},

es: {
  modal_title_key: "Su <span class=\"fake-modal__accent\">actividad</span> podría ser visible a través de su dirección IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Paso 1:</span> Instale desde App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Paso 2:</span> Haga clic en Conectar",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Paso 3:</span> Navegue de forma privada",
  modal_text_key: "Vea vídeos de forma privada utilizando una aplicación VPN",
  scan_now_option: "Instalar",
},

"es-419": {
  modal_title_key: "Tu <span class=\"fake-modal__accent\">actividad</span> podría ser visible a través de tu dirección IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Paso 1:</span> Instala desde App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Paso 2:</span> Haz clic en Conectar",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Paso 3:</span> Navega de forma privada",
  modal_text_key: "Mira videos de forma privada usando una aplicación VPN",
  scan_now_option: "Instalar",
},

da: {
  modal_title_key: "Din <span class=\"fake-modal__accent\">aktivitet</span> kan være synlig via din IP-adresse",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Trin 1:</span> Installer fra App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Trin 2:</span> Klik på Forbind",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Trin 3:</span> Surf privat",
  modal_text_key: "Se videoer privat ved hjælp af en VPN-app",
  scan_now_option: "Installer",
},

ja: {
  modal_title_key: "あなたの<span class=\"fake-modal__accent\">アクティビティ</span>はIPアドレスを通じて表示される可能性があります",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">ステップ1:</span> App Storeからインストール",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">ステップ2:</span> 接続をタップ",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">ステップ3:</span> プライベートに閲覧",
  modal_text_key: "VPNアプリを使用して動画をプライベートに視聴しましょう",
  scan_now_option: "インストール",
},

fil: {
  modal_title_key: "Maaaring makita ang iyong <span class=\"fake-modal__accent\">aktibidad</span> sa pamamagitan ng iyong IP address",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Hakbang 1:</span> I-install mula sa App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Hakbang 2:</span> I-click ang Connect",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Hakbang 3:</span> Mag-browse nang pribado",
  modal_text_key: "Manood ng mga video nang pribado gamit ang VPN app",
  scan_now_option: "I-install",
},

de: {
  modal_title_key: "Ihre <span class=\"fake-modal__accent\">Aktivität</span> könnte über Ihre IP-Adresse sichtbar sein",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Schritt 1:</span> Aus dem App Store installieren",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Schritt 2:</span> Auf Verbinden klicken",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Schritt 3:</span> Privat surfen",
  modal_text_key: "Sehen Sie Videos privat mit einer VPN-App an",
  scan_now_option: "Installieren",
},

nb: {
  modal_title_key: "Din <span class=\"fake-modal__accent\">aktivitet</span> kan være synlig via IP-adressen din",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Trinn 1:</span> Installer fra App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Trinn 2:</span> Klikk på Koble til",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Trinn 3:</span> Surf privat",
  modal_text_key: "Se videoer privat ved hjelp av en VPN-app",
  scan_now_option: "Installer",
},

sv: {
  modal_title_key: "Din <span class=\"fake-modal__accent\">aktivitet</span> kan vara synlig via din IP-adress",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Steg 1:</span> Installera från App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Steg 2:</span> Klicka på Anslut",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Steg 3:</span> Surfa privat",
  modal_text_key: "Titta på videor privat med hjälp av en VPN-app",
  scan_now_option: "Installera",
},

it: {
  modal_title_key: "La tua <span class=\"fake-modal__accent\">attività</span> potrebbe essere visibile tramite il tuo indirizzo IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Passaggio 1:</span> Installa da App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Passaggio 2:</span> Fai clic su Connetti",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Passaggio 3:</span> Naviga in privato",
  modal_text_key: "Guarda video in privato utilizzando un'app VPN",
  scan_now_option: "Installa",
},

nl: {
  modal_title_key: "Uw <span class=\"fake-modal__accent\">activiteit</span> kan zichtbaar zijn via uw IP-adres",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Stap 1:</span> Installeer vanuit de App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Stap 2:</span> Klik op Verbinden",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Stap 3:</span> Surf privé",
  modal_text_key: "Bekijk video's privé met behulp van een VPN-app",
  scan_now_option: "Installeren",
},

ro: {
  modal_title_key: "<span class=\"fake-modal__accent\">Activitatea</span> ta poate fi vizibilă prin adresa ta IP",
  modal_step_1_key: "<span class=\"fake-modal__step-accent\">Pasul 1:</span> Instalează din App Store",
  modal_step_2_key: "<span class=\"fake-modal__step-accent\">Pasul 2:</span> Apasă pe Conectare",
  modal_step_3_key: "<span class=\"fake-modal__step-accent\">Pasul 3:</span> Navighează privat",
  modal_text_key: "Urmărește videoclipuri în mod privat folosind o aplicație VPN",
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

  document.getElementById("modal_title_key").innerHTML = t.modal_title_key;
  document.getElementById("modal_step_1_key").innerHTML = t.modal_step_1_key || translations.en.modal_step_1_key;
  document.getElementById("modal_step_2_key").innerHTML = t.modal_step_2_key || translations.en.modal_step_2_key;
  document.getElementById("modal_step_3_key").innerHTML = t.modal_step_3_key || translations.en.modal_step_3_key;
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
